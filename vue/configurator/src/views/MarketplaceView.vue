<template>
  <Configurator :configuration="configuration" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Configurator, {
  ConfiguratorDefinition,
} from "@/components/Configurator.vue";
import { WidgetPropType } from "@/components/lib/WidgetProps";
import { Widgets } from "@/config/widgetLocations";

declare global {
  interface WindowEventMap {
    "m-marketplace_widget_injected": CustomEvent<{
      contractAddress: string;
      listingId: string;
      key: string;
    }>;
  }
}

@Options({
  components: {
    Configurator,
  },
})
export default class MarketplaceView extends Vue {
  configuration?: ConfiguratorDefinition;

  data() {
    return {
      configuration: {
        sharedProps: {
          "data-network": {
            name: "Network",
            type: WidgetPropType.ENUMERATION,
            value: "1",
            options: [
              {
                value: "1",
                label: "Ethereum Mainnet",
              },
              {
                value: "5",
                label: "Goerli",
              },
              {
                value: "137",
                label: "Matic",
              },
            ],
            defaultValue: "",
          },
          "data-fallback-provider": {
            name: "Fallback Provider",
            type: WidgetPropType.STRING,
            value: "",
            defaultValue: "",
            dependentProps: ["data-network"],
          },
        },
        widgets: [
          {
            ...Widgets.connect,
            name: "Connect Widget",
            dataWidget: "m-connect",
            /* Schemed Utility class definitons for light/dark
            https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/manifold-css-variables/scheme-utility-classes */
            widgetTheme: {
              value: "",
              options: [
                {
                  value: "manifold-scheme-dark",
                  label: "Dark",
                },
                {
                  value: "manifold-scheme-light",
                  label: "Light",
                },
                {
                  value: "",
                  label: "OS Preference",
                },
              ],
            },
            props: {
              "data-delay-auth": {
                name: "Delay Authentication",
                type: WidgetPropType.BOOLEAN,
                value: true,
                defaultValue: false,
              },
              "data-multi": {
                name: "Wallet Connect",
                type: WidgetPropType.BOOLEAN,
                value: false,
                defaultValue: false,
              },
            },
          },
          {
            ...Widgets.marketplace,
            name: "Marketplace Widget",
            /* Schemed Utility class definitons for light/dark
            https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/manifold-css-variables/scheme-utility-classes */
            widgetTheme: {
              value: "",
              options: [
                {
                  value: "manifold-scheme-dark",
                  label: "Dark",
                },
                {
                  value: "manifold-scheme-light",
                  label: "Light",
                },
                {
                  value: "",
                  label: "OS Preference",
                },
              ],
            },
            props: {
              "data-widget": {
                name: "Widget Type",
                type: WidgetPropType.ENUMERATION,
                value: "",
                options: [
                  {
                    value: "m-layout-complete-listing",
                    label: "Full Listing",
                  },
                  {
                    value: "m-card-catalog",
                    label: "Catalog Card",
                  },
                  {
                    value: "m-card-countdown",
                    label: "Countdown Card",
                  },
                ],
                defaultValue: "",
                required: true,
              },
              "data-id": {
                name: "Listing Id",
                type: WidgetPropType.STRING,
                value: "",
                defaultValue: "",
                required: true,
              },
              "data-widget-key": {
                name: "Widget Key",
                type: WidgetPropType.STRING,
                value: "",
                defaultValue: "",
                required: false,
              },
            },
          },
        ],
      },
    };
  }

  mounted() {
    window.addEventListener(
      "m-marketplace_widget_injected",
      this.onMarketplaceWidgetInjected
    );
  }

  beforeUnmount(): void {
    window.removeEventListener(
      "m-marketplace_widget_injected",
      this.onMarketplaceWidgetInjected
    );
  }

  onMarketplaceWidgetInjected(event: CustomEvent) {
    const { detail } = event;
    console.log("Marketplace Widget Injected", detail);
  }
}
</script>
<style>
:root() {
  --base-font: "Raleway", sans-serif;
}

:where(.manifold) {
  font-family: var(--base-font);
  --manifold-color-page--background: #121212;
  --manifold-color-connect--background: rgba(0, 0, 0, 0.8);
  --manifold-color-connect--text: #fff;
  --manifold-color-connect--hover: hsla(0, 0%, 100%, 0.8);
}

#m-connection-wizard-container {
  pointer-events: auto;
}
#m-connection-wizard.h1 {
  color: black;
}
#m-connection {
  pointer-events: auto;
  position: absolute;
  top: 40px;
  right: 40px;
  height: auto;
  width: 180px;
  border: 2px solid var(--manifold-color-connect--background);
  border-radius: 30px;
  background-color: transparent;
  @media screen and (max-width: 520px) {
    top: 25px;
    right: 25px;
    height: auto;
    width: 130px;
  }
}

#m-connection button {
  display: block !important;
  width: 100% !important;
  height: 60px !important;
  text-transform: uppercase !important;
  font-size: 11px !important;
  border-radius: 0 !important;
  border: none !important;
  transition: color 0.3s ease, border 0.3s ease, background 0.3s ease !important;
}
#m-connection button:hover {
  background: var(--manifold-theme--color--primary) !important;
  color: var(--manifold-theme--color--secondary) !important;
}
#m-connection div {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
}
div[data-widget="m-connect"] {
  width: 100%;
  height: 270px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  pointer-events: none;
}

.manifold.m-layout-listing {
  font-family: var(--base-font);
  --manifold-color-cta-background--base: #fff;
  --manifold-color-cta-background--disabled: hsla(0, 0%, 100%, 0.0666666667);
  --manifold-color-cta-background--hover: hsla(0, 0%, 100%, 0.6);
  --manifold-color-cta-text--base: #000;
  --manifold-color-cta-text--disabled: #8a8a8a;
  --manifold-color-theme--secondary: #1a1a1a;
  --manifold-color-link-background--hover: hsla(0, 0%, 100%, 0.3);
  --manifold-color-theme--primary: #2b2baa;
  --manifold-color-text: hsla(0, 0%, 100%, 0.87);
  --manifold-color-text--primary: hsla(0, 0%, 92.2%, 0.87);
  --manifold-color-text--secondary: #c9c9c9;
  --manifold-color-text--disabled: hsla(0, 0%, 100%, 0.5);
  --manifold-color-text--muted: hsla(0, 0%, 100%, 0.6);
  --manifold-color-page--background: #121212;
  --manifold-color-card--background: #333;
}
.manifold.m-layout-listing .m-listing-info {
  --manifold-color-layout--border: #6a6a6a;
  --manifold-color-listing-layout--button: #212121;
  --manifold-color-listing-layout--button-rgb: 33, 33, 33;
  --manifold-color-listing-layout--button-r: 33;
  --manifold-color-listing-layout--button-g: 33;
  --manifold-color-listing-layout--button-b: 33;
  --manifold-color-listing-layout--button-hsl: 0deg, 0%, 13%;
  --manifold-color-listing-layout--button-h: 0deg;
  --manifold-color-listing-layout--button-s: 0%;
  --manifold-color-listing-layout--button-l: 13%;
}
.manifold.m-layout-listing .m-listing-info .m-aside .manifold.m-bids {
  --manifold-color-bids--bidder: #333;
  --manifold-color-bids--background: hsla(0, 0%, 80%, 0.35);
  --manifold-color-bids--border: #6a6a6a;
  --manifold-color-bids--expand-button: #9f9f9f;
  --manifold-color-bids-background: hsla(0, 0%, 100%, 0.05);
}
.manifold.m-layout-listing .manifold.m-expandable-image-expanded button,
.manifold.m-expandable-image button {
  --manifold-color-expandable-image-button: hsla(0, 0%, 100%, 0.25);
  --manifold-color-expandable-image-button--hover: hsla(0, 0%, 100%, 0.5);
}
.manifold.m-confirm .m-confirm-inner .m-confirm-info .manifold.m-rich-form {
  --manifold-color-bid-form-rich--background-input: hsla(0, 0%, 100%, 0.05);
  --manifold-color-bid-form-rich--background-balance: rbga(0, 0, 0, 0.25);
}
.manifold.m-layout-listing {
  background: black;
  color: white;
  width: 100%;
  height: auto;
  text-align: left;
  min-height: 100%;
  @media screen and (max-width: 520px) {
    .m-expandable-image > button {
      right: 25px;
    }
    .m-listing-info {
      padding: 25px;
    }
  }
}
.manifold.m-layout-listing .m-expandable-image {
  overflow: visible;
}
.manifold.m-layout-listing .manifold.m-expandable-image > button {
  right: 55px;
  bottom: -25px;
}
.manifold.m-layout-listing .m-expandable-image-expanded.show {
  z-index: 101;
}
.manifold.m-layout-listing
  .manifold.m-expandable-image
  .m-token-media
  > button {
  z-index: 101;
}
.manifold.m-layout-listing .m-listing-info .m-main .manifold.m-name {
  font-weight: 100;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
}
.manifold.m-layout-listing .m-listing-info .m-main .manifold.m-attributes {
  max-width: 100%;
}
.manifold.m-layout-listing
  .m-listing-info.m-main
  .manifold.m-attributes
  .m-attribute {
  border-bottom-color: var(--manifold-color-layout--border);
  grid-template-columns: 140px minmax(0, 1fr);
  grid-gap: 10px;
}
.manifold.m-layout-listing
  .m-listing-info.m-main
  .manifold.m-attributes
  .m-attribute
  span {
  text-overflow: ellipsis;
  white-space: nowrap;
}
.manifold.m-layout-listing
  .m-listing-info
  .m-main
  .manifold.m-description::before {
  display: none;
}
.manifold.m-layout-listing .m-listing-info .m-main .manifold.m-description p {
  font-size: 18px;
  line-height: 1.5;
}
.manifold.m-layout-listing .m-listing-info .m-main .m-links .m-link-action {
  border: 1px solid var(--manifold-color-theme--secondary);
  background: none;
  text-transform: uppercase;
  font-size: 11px;
  margin-left: 0;
}
.manifold.m-layout-listing
  .m-listing-info
  .m-main
  .m-links
  .m-link-action:hover {
  background: var(--manifold-color-link-background--hover);
}
.manifold.m-layout-listing .m-listing-info .m-aside > button {
  height: 60px;
  margin-top: 17px;
  background: var(--manifold-color-cta-background--base);
  color: var(--manifold-color-cta-text--base);
}
.manifold.m-layout-listing .m-listing-info .m-aside > button span {
  color: var(--manifold-color-cta-text--base);
}
.manifold.m-layout-listing .m-listing-info .m-aside > button:disabled {
  background: var(--manifold-color-cta-background--disabled);
  color: var(--manifold-color-cta-text--disabled);
}
.manifold.m-layout-listing .m-listing-info .m-aside > button:disabled span {
  color: var(--manifold-color-cta-text--disabled);
}
.manifold.m-layout-listing .m-listing-info .m-aside > button:hover {
  background: var(--manifold-color-cta-background--hover);
}
.manifold.m-layout-listing .m-listing-info {
  padding: 55px;
}
.manifold.m-layout-listing .m-listing-info .m-aside .manifold.m-countdown {
  border: 1px solid var(--manifold-color-layout--border);
  border-top: none;
  padding: 15px;
}
.manifold.m-layout-listing
  .m-listing-info
  .m-aside
  .manifold.m-countdown
  p:only-child {
  font-size: 11px;
  text-transform: uppercase;
}
.manifold.m-layout-listing .m-listing-info .m-aside .manifold.m-tooltip {
  display: none;
}
.manifold.m-layout-listing .m-listing-info .m-aside .manifold.m-bids {
  margin-top: 17px;
  border: 0;
  border-top: 1px solid var(--manifold-color-bids--border);
  padding-top: 10px;
}
.manifold.m-layout-listing
  .m-listing-info
  .m-aside
  .manifold.m-bids
  .m-bids-header {
  border-bottom: 0;
  padding: 15px;
}
.manifold.m-layout-listing
  .m-listing-info
  .m-aside
  .manifold.m-bids
  .m-bids-header
  span {
  margin-top: 0;
}
.manifold.m-layout-listing .m-listing-info .m-aside .manifold.m-bids {
  background: var(--manifold-color-bids-background);
}
.manifold.m-layout-listing
  .m-listing-info
  .m-aside
  .manifold.m-bids
  .m-bids-inner
  a
  > svg {
  filter: invert(100%);
}
.manifold.m-layout-listing
  .m-listing-info
  .m-aside
  .manifold.m-bids
  .m-bids-inner
  span {
  background: none;
}
.manifold.m-layout-listing
  .m-listing-info
  .m-aside
  .manifold.m-bids
  .m-bids-inner
  button {
  background: #fff1;
}
.manifold.m-layout-listing
  .m-listing-info
  .m-countdown.m-bids
  .m-bids-inner
  span:last-child {
  padding-top: 0;
  opacity: 0.5;
}
.manifold.m-layout-listing .m-listing-info .m-aside .m-bids button {
  background: #fff1;
}
</style>
