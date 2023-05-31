interface WidgetLocation {
  javascript: string[];
  css: string[];
}

interface WidgetMap {
  [name: string]: WidgetLocation;
}

export const Widgets: WidgetMap = {
  connect: {
    javascript: ["https://connect.manifoldxyz.dev/2.2.4/connect.umd.js"],
    css: ["https://connect.manifoldxyz.dev/2.2.4/connect.css"],
  },
  marketplace: {
    javascript: [
      "https://marketplace.manifoldxyz.dev/3.3.7/marketplace.umd.js",
    ],
    css: ["https://marketplace.manifoldxyz.dev/3.3.7/marketplace.css"],
  },
  identity: {
    javascript: [
      "https://identity.manifoldxyz.dev/2.1.0/walletIdentity.umd.js",
    ],
    css: ["https://identity.manifoldxyz.dev/2.1.0/walletIdentity.css"],
  },
  restrictedToken: {
    javascript: [
      "https://restrictedtoken.manifoldxyz.dev/0.1.0/restrictedToken.umd.js",
    ],
    css: ["https://restrictedtoken.manifoldxyz.dev/0.1.0/restrictedToken.css"],
  },
  sixFiveFiveOneDisplay: {
    javascript: [
      "https://connect.manifoldxyz.dev/2.2.7/connect.umd.js",
      "https://d5aktt2n34dmg.cloudfront.net/0.0.1/6551-display-widget.umd.js",
    ],
    css: ["https://d5aktt2n34dmg.cloudfront.net/0.0.1/6551-display-widget.css"],
  },
};
