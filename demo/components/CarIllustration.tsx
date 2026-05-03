'use client';

// Renders the imported 3/4-view sport coupé SVG and exposes its body
// fills as two CSS variables: --bp (primary) and --bs (shade). All other
// fills (outlines, glass, tires) stay baked. Pattern/gradient defs for
// chrome / carbon / camo live here so the body fills can resolve them.

import { CAR_INNER_SVG } from './_carInner';

type Props = {
  bodyPrimary: string;
  bodyShade: string;
};

const DEFS = `
  <defs>
    <pattern id="carbonPattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
      <rect width="60" height="60" fill="#1A1A1A"/>
      <rect x="0" y="0" width="30" height="30" fill="#2C2C2C"/>
      <rect x="30" y="30" width="30" height="30" fill="#2C2C2C"/>
    </pattern>
    <pattern id="carbonShadePattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="rotate(45)">
      <rect width="60" height="60" fill="#0E0E0E"/>
      <rect x="0" y="0" width="30" height="30" fill="#1C1C1C"/>
      <rect x="30" y="30" width="30" height="30" fill="#1C1C1C"/>
    </pattern>
    <pattern id="camoPattern" patternUnits="userSpaceOnUse" width="320" height="240">
      <rect width="320" height="240" fill="#3A4A2A"/>
      <path d="M 20,60 q 40,-32 88,8 q 32,40 -16,72 q -56,16 -72,-32 z" fill="#5A6038"/>
      <path d="M 160,20 q 56,8 48,64 q -16,48 -64,32 q -40,-32 16,-96 z" fill="#243018"/>
      <path d="M 220,160 q 48,-8 64,40 q -8,48 -64,32 q -32,-24 0,-72 z" fill="#4A3A22"/>
      <path d="M 48,168 q 32,-16 72,16 q 16,40 -32,48 q -64,-8 -40,-64 z" fill="#1C2210"/>
    </pattern>
    <pattern id="camoShadePattern" patternUnits="userSpaceOnUse" width="320" height="240">
      <rect width="320" height="240" fill="#2C3820"/>
      <path d="M 20,60 q 40,-32 88,8 q 32,40 -16,72 q -56,16 -72,-32 z" fill="#444A2C"/>
      <path d="M 160,20 q 56,8 48,64 q -16,48 -64,32 q -40,-32 16,-96 z" fill="#1A2412"/>
      <path d="M 220,160 q 48,-8 64,40 q -8,48 -64,32 q -32,-24 0,-72 z" fill="#382C18"/>
      <path d="M 48,168 q 32,-16 72,16 q 16,40 -32,48 q -64,-8 -40,-64 z" fill="#14180A"/>
    </pattern>
    <linearGradient id="chromeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#C8D4DE"/>
      <stop offset="48%" stop-color="#EEF2F6"/>
      <stop offset="52%" stop-color="#6E7884"/>
      <stop offset="100%" stop-color="#3A3F46"/>
    </linearGradient>
    <linearGradient id="chromeShadeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#8A98A4"/>
      <stop offset="48%" stop-color="#A8B4BE"/>
      <stop offset="52%" stop-color="#3A4048"/>
      <stop offset="100%" stop-color="#1E2228"/>
    </linearGradient>
  </defs>
`;

export function CarIllustration({ bodyPrimary, bodyShade }: Props) {
  const styleVars = {
    ['--bp' as string]: bodyPrimary,
    ['--bs' as string]: bodyShade,
  } as React.CSSProperties;

  // Wrap defs + imported inner. The imported string already includes the
  // outer car groups (no <svg> tag). We render via dangerouslySetInnerHTML
  // because the source is large (~89KB) and re-authoring as JSX would
  // explode the bundle without benefit.
  const html = DEFS + CAR_INNER_SVG;

  return (
    <svg
      viewBox="100 1100 3800 2000"
      preserveAspectRatio="xMidYMid meet"
      className="block w-full h-auto"
      style={styleVars}
      role="img"
      aria-label="Auto sportiva — anteprima wrap"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
