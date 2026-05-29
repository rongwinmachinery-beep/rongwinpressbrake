import { createWriteStream, existsSync, statSync } from "node:fs";
import { request } from "node:https";

const [url, destination, expectedSizeRaw] = process.argv.slice(2);
const expectedSize = Number(expectedSizeRaw || 0);

if (!url || !destination) {
  console.error("Usage: node scripts/download-file.mjs <url> <destination> [expectedSize]");
  process.exit(1);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function downloadOnce(sourceUrl = url, redirects = 0) {
  const start = existsSync(destination) ? statSync(destination).size : 0;
  const headers = start ? { Range: `bytes=${start}-` } : {};

  return new Promise((resolve, reject) => {
    const req = request(sourceUrl, { headers }, (res) => {
      if ([301, 302, 303, 307, 308].includes(res.statusCode || 0)) {
        const nextUrl = new URL(res.headers.location, sourceUrl).toString();
        res.resume();
        if (redirects > 5) {
          reject(new Error(`Too many redirects: ${nextUrl}`));
          return;
        }
        downloadOnce(nextUrl, redirects + 1).then(resolve, reject);
        return;
      }

      if (![200, 206].includes(res.statusCode || 0)) {
        reject(new Error(`HTTP ${res.statusCode}`));
        res.resume();
        return;
      }

      const stream = createWriteStream(destination, { flags: start && res.statusCode === 206 ? "a" : "w" });
      res.pipe(stream);
      stream.on("finish", () => stream.close(resolve));
      stream.on("error", reject);
    });

    req.setTimeout(45000, () => req.destroy(new Error("request timeout")));
    req.on("error", reject);
    req.end();
  });
}

for (let attempt = 1; attempt <= 30; attempt += 1) {
  const current = existsSync(destination) ? statSync(destination).size : 0;
  if (expectedSize && current >= expectedSize) break;

  console.log(`download attempt ${attempt}, current ${current}/${expectedSize || "unknown"}`);
  try {
    await downloadOnce();
  } catch (error) {
    console.log(`attempt ${attempt} failed: ${error.message}`);
    await delay(Math.min(10000, attempt * 1000));
  }
}

const finalSize = existsSync(destination) ? statSync(destination).size : 0;
console.log(`download complete size=${finalSize}`);

if (expectedSize && finalSize < expectedSize) {
  process.exit(2);
}
