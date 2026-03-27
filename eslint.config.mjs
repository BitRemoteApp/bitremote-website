import coreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...coreWebVitals,
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      ".home/",
      ".npm-cache/",
      ".planning/",
    ],
  },
];

export default eslintConfig;
