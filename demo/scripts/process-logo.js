// One-shot script — process brand_asset/logo.png to remove the white
// background so the gold + purple + pink wordmark sits cleanly on the
// warm-dark UI. Output → demo/public/logo-transparent.png.
//
// Run from demo/: `node scripts/process-logo.js`

const sharp = require('sharp');
const path = require('path');

const INPUT = path.resolve(__dirname, '../../brand_asset/logo.png');
const OUTPUT = path.resolve(__dirname, '../public/logo-transparent.png');

const FULL_TRANSPARENT_THRESHOLD = 238;
const SOFT_EDGE_LOW = 200;

sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;

    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const max = Math.max(r, g, b);

      if (r >= FULL_TRANSPARENT_THRESHOLD && g >= FULL_TRANSPARENT_THRESHOLD && b >= FULL_TRANSPARENT_THRESHOLD) {
        data[i + 3] = 0;
      } else if (max > SOFT_EDGE_LOW) {
        // Linear soft-edge falloff between SOFT_EDGE_LOW and the full
        // transparent threshold. Avoids a hard, jagged cutout edge.
        const factor = (max - SOFT_EDGE_LOW) / (FULL_TRANSPARENT_THRESHOLD - SOFT_EDGE_LOW);
        data[i + 3] = Math.round(255 * (1 - Math.min(factor, 1)));
      }
    }

    return sharp(data, { raw: { width, height, channels } })
      .png({ compressionLevel: 9 })
      .toFile(OUTPUT);
  })
  .then((info) => {
    console.log(`✓ wrote ${OUTPUT} (${info.size} bytes, ${info.width}×${info.height})`);
  })
  .catch((err) => {
    console.error('✗ logo processing failed:', err);
    process.exit(1);
  });
