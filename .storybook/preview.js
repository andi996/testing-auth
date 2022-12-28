// .storybook/preview.js

const customViewports = {
  SmallMobile: {
    name: "Small mobile",
    styles: {
      width: "392px",
      height: "640px",
    },
  },
  LargeMobile: {
    name: "Large mobile",
    styles: {
      width: "446px",
      height: "896px",
    },
  },
  Tablet: {
    name: "Tablet",
    styles: {
      width: "800px",
      height: "1024px",
    },
  },
  Reset: {
    name: "Responsive",
    styles: {
      width: "100%",
      height: "100%",
    },
  },
};

export const parameters = {
  viewport: { viewports: customViewports },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
