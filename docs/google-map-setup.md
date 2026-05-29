# Google Map Component Setup

## 1. Google Maps Embed code

Replace `YOUR_GOOGLE_MAPS_API_KEY` and the `q=` address with the final company address.

```html
<section class="map-section" aria-label="RONGWIN location map">
  <div class="map-card">
    <div class="map-copy">
      <p class="eyebrow">Visit RONGWIN</p>
      <h2>Find our machinery team in Nanjing, China.</h2>
      <p>Use the interactive map to zoom, drag, and check surrounding roads before planning a factory visit.</p>
      <div class="map-address">Technology and Innovation Center, Lishui Industry New Town, Lishui Economic Development Zone, Nanjing, Jiangsu, China 211200</div>
      <div class="map-actions">
        <a class="button" href="https://www.google.com/maps/search/?api=1&query=Technology%20and%20Innovation%20Center%2C%20Lishui%20Industry%20New%20Town%2C%20Lishui%20Economic%20Development%20Zone%2C%20Nanjing%2C%20Jiangsu%2C%20China%20211200" target="_blank" rel="noopener">View on Google Maps</a>
      </div>
    </div>
    <div class="map-frame-wrap">
      <div class="map-badge"><img src="../assets/images/rongwin-logo.png" alt="">RONGWIN Location</div>
      <iframe
        title="RONGWIN Google Map"
        loading="lazy"
        allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Technology%20and%20Innovation%20Center%2C%20Lishui%20Industry%20New%20Town%2C%20Lishui%20Economic%20Development%20Zone%2C%20Nanjing%2C%20Jiangsu%2C%20China%20211200&zoom=12">
      </iframe>
    </div>
  </div>
</section>
```

## 2. How to get and configure an API Key

1. Open Google Cloud Console.
2. Create or select a Google Cloud project.
3. Enable **Maps Embed API**.
4. Create an API key.
5. Restrict the key:
   - Application restriction: HTTP referrers.
   - Add production domains such as `https://www.rongwin.com/*`.
   - Add local testing referrers only while developing, such as `http://127.0.0.1:8080/*`.
6. Replace `YOUR_GOOGLE_MAPS_API_KEY` in the iframe URL.

## 3. Replaceable address examples

```text
Technology and Innovation Center, Lishui Industry New Town, Lishui Economic Development Zone, Nanjing, Jiangsu, China 211200
```

```text
No. 123 Industrial Ave, Shanghai, China
```

```text
RONGWIN Machinery, Nanjing, Jiangsu, China
```

URL-encode the address before placing it into the `q=` parameter.

## 4. OpenStreetMap fallback

This version does not require an API key, but the marker and styling are more limited.

```html
<iframe
  title="RONGWIN OpenStreetMap"
  loading="lazy"
  src="https://www.openstreetmap.org/export/embed.html?bbox=118.8%2C31.55%2C119.2%2C31.85&layer=mapnik&marker=31.65%2C119.0">
</iframe>
```

Use this fallback if Google Maps cannot be loaded in a target market or the API key is not ready yet.
