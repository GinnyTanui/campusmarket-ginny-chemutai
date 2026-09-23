// Shared design tokens for every page. Load this AFTER the Tailwind CDN <script> tag.
tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-primary-container": "#dac5ff", "secondary": "#4059aa",
        "on-tertiary-fixed-variant": "#005137", "secondary-fixed-dim": "#b6c4ff",
        "surface-container-lowest": "#ffffff", "on-secondary": "#ffffff", "on-error": "#ffffff",
        "on-background": "#131b2e", "error": "#ba1a1a", "on-surface": "#131b2e",
        "tertiary": "#004b32", "outline": "#7b7486", "inverse-primary": "#d3bbff",
        "surface-container-highest": "#dae2fd", "secondary-container": "#8fa7fe",
        "on-primary-fixed": "#250059", "background": "#faf8ff", "on-tertiary-fixed": "#002114",
        "on-secondary-fixed-variant": "#264191", "primary-container": "#6d28d9",
        "surface": "#faf8ff", "surface-container-high": "#e2e7ff", "on-error-container": "#93000a",
        "primary-fixed-dim": "#d3bbff", "surface-tint": "#7331df", "secondary-fixed": "#dce1ff",
        "on-secondary-fixed": "#00164e", "surface-variant": "#dae2fd", "outline-variant": "#ccc3d7",
        "surface-container-low": "#f2f3ff", "on-secondary-container": "#1d3989",
        "surface-container": "#eaedff", "on-surface-variant": "#4a4455",
        "tertiary-container": "#006545", "on-tertiary-container": "#70e4b1",
        "tertiary-fixed-dim": "#68dba9", "on-tertiary": "#ffffff", "tertiary-fixed": "#85f8c4",
        "inverse-on-surface": "#eef0ff", "primary": "#5300b7", "surface-bright": "#faf8ff",
        "surface-dim": "#d2d9f4", "error-container": "#ffdad6", "on-primary-fixed-variant": "#5b00c5",
        "on-primary": "#ffffff", "primary-fixed": "#ebddff", "inverse-surface": "#283044"
      },
      borderRadius: { DEFAULT: "0.25rem", lg: "0.5rem", xl: "0.75rem", full: "9999px" },
      spacing: {
        "gutter-desktop": "1.5rem", "space-lg": "1.5rem", "space-xl": "2rem",
        "margin-desktop": "2rem", "margin": "1rem", "space-xs": "0.25rem",
        "margin-tablet": "1.5rem", "gutter": "1rem", "space-sm": "0.5rem", "space-md": "1rem"
      },
      fontFamily: {
        "headline-sm": ["Plus Jakarta Sans"], "title-md": ["Inter"], "label-md": ["Inter"],
        "price-display": ["Plus Jakarta Sans"], "headline-lg": ["Plus Jakarta Sans"],
        "headline-md": ["Plus Jakarta Sans"], "display-lg": ["Plus Jakarta Sans"],
        "body-sm": ["Inter"], "label-sm": ["Inter"], "body-md": ["Inter"], "body-lg": ["Inter"],
        "headline-lg-mobile": ["Plus Jakarta Sans"]
      },
      fontSize: {
        "headline-sm": ["18px", { lineHeight: "26px", fontWeight: "600" }],
        "title-md": ["16px", { lineHeight: "24px", fontWeight: "600" }],
        "label-md": ["13px", { lineHeight: "18px", letterSpacing: "0.01em", fontWeight: "600" }],
        "price-display": ["22px", { lineHeight: "28px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-lg": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "body-sm": ["12px", { lineHeight: "18px", fontWeight: "400" }],
        "label-sm": ["11px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "600" }],
        "body-md": ["14px", { lineHeight: "22px", fontWeight: "400" }],
        "body-lg": ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "headline-lg-mobile": ["26px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "700" }]
      }
    }
  }
};
