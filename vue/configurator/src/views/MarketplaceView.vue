<template>
  <Configurator :configuration="configuration" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Configurator, {
  ConfiguratorDefinition,
} from "@/components/Configurator.vue";
import { WidgetPropType } from "@/components/lib/WidgetProps";
import {
  ConnectWidgetLocation,
  MarketplaceWidgetLocation,
} from "@/config/widgetLocations";

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
          },
        },
        widgets: [
          {
            ...ConnectWidgetLocation,
            name: "Connect Widget",
            dataWidget: "m-connect",
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
            ...MarketplaceWidgetLocation,
            name: "Marketplace Widget",
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
                ],
                defaultValue: "",
              },
              "data-id": {
                name: "Listing Id",
                type: WidgetPropType.STRING,
                value: "",
                defaultValue: "",
              },
            },
          },
        ],
      },
    };
  }
}
</script>
<style>
:where(.manifold) {
  font-family: "Raleway", sans-serif;
  --manifold-color-connect--background: rgba(0, 0, 0, 0.8);
  --manifold-color-connect--text: #fff;
  --manifold-color-connect--hover: hsla(0, 0%, 100%, 0.8);
}
:where(.manifold.m-layout-listing) {
  --manifold-color-cta-background--base: #fff;
  --manifold-color-cta-background--disabled: hsla(0, 0%, 100%, 0.0666666667);
  --manifold-color-cta-background--hover: hsla(0, 0%, 100%, 0.6);
  --manifold-color-cta-text--base: #000;
  --manifold-color-cta-text--disabled: #8a8a8a;
  --manifold-color-theme--secondary: #1a1a1a;
  --manifold-color-link-background--hover: hsla(0, 0%, 100%, 0.3);
  --manifold-color-bids-background: hsla(0, 0%, 100%, 0.05);
  --manifold-color-theme--primary: #2b2baa;
  --manifold-color-text: hsla(0, 0%, 100%, 0.87);
  --manifold-color-text--primary: hsla(0, 0%, 92.2%, 0.87);
  --manifold-color-text--secondary: #c9c9c9;
  --manifold-color-text--disabled: hsla(0, 0%, 100%, 0.5);
  --manifold-color-text--muted: hsla(0, 0%, 100%, 0.6);
  --manifold-color-page--background: #121212;
  --manifold-color-card--background: #333;
  --manifold-color-layout--border: #6a6a6a !important;
  --manifold-color-listing-layout--button: #212121 !important;
  --manifold-color-listing-layout--button-rgb: 33, 33, 33 !important;
  --manifold-color-listing-layout--button-r: 33 !important;
  --manifold-color-listing-layout--button-g: 33 !important;
  --manifold-color-listing-layout--button-b: 33 !important;
  --manifold-color-listing-layout--button-hsl: 0deg, 0%, 13% !important;
  --manifold-color-listing-layout--button-h: 0deg !important;
  --manifold-color-listing-layout--button-s: 0% !important;
  --manifold-color-listing-layout--button-l: 13% !important;
}
:where(.manifold.m-rich-form) {
  --manifold-color-bid-form-rich--background-input: hsla(0, 0%, 100%, 0.05);
  --manifold-color-bid-form-rich--background-balance: rbga(0, 0, 0, 0.25);
}

:where(.manifold.m-expandable-image-expanded, .manifold.m-expandable-image) {
  --manifold-color-expandable-image-button: hsla(0, 0%, 100%, 0.25);
  --manifold-color-expandable-image-button--hover: hsla(0, 0%, 100%, 0.5);
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
  border: 2px solid var(--manifold-color-connect--text);
  border-radius: 30px;
  background-color: transparent;
  @media screen and (max-width: 520px) {
    top: 25px;
    right: 25px;
    height: auto;
    width: 130px;
  }
}

#m-connection .m-connection-wallet span {
  color: var(--manifold-color-connect--text) !important;
}

#m-connection button {
  display: block !important;
  width: 100% !important;
  height: 60px !important;
  color: var(--manifold-color-connect--text) !important;
  text-transform: uppercase !important;
  font-size: 11px !important;
  border-radius: 0 !important;
  border: none !important;
  background: var(--manifold-color-connect--background) !important;
  transition: color 0.3s ease, border 0.3s ease, background 0.3s ease !important;
}

#m-connection button:hover {
  background: var(--manifold-color-connect--hover) !important;
  color: black !important;
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

.m-expandable-image-expanded .show {
  z-index: 101;
}

.m-complete-view,
.m-description-view,
.m-layout-listing {
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

.m-complete-view .m-expandable-image,
.m-description-view .m-expandable-image,
.m-layout-listing .m-expandable-image {
  overflow: visible;
}

.m-complete-view .manifold.m-expandable-image > button,
.m-description-view .manifold.m-expandable-image > button,
.m-layout-listing .manifold.m-expandable-image > button {
  right: 55px;
  bottom: -25px;
}

.m-complete-view .manifold.m-expandable-image .m-token-media > button,
.m-description-view .manifold.m-expandable-image .m-token-media > button,
.m-layout-listing .manifold.m-expandable-image .m-token-media > button {
  z-index: 101;
}

.m-complete-view .m-listing-info .m-main .m-name,
.m-description-view .m-listing-info .m-main .m-name,
.manifold.m-layout-listing .m-listing-info .m-main .manifold.m-name {
  font-weight: 100;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
}

.m-complete-view .m-listing-info .m-main .manifold.m-attributes,
.m-description-view .m-listing-info .m-main .manifold.m-attributes,
.m-layout-listing .m-listing-info.m-main .manifold.m-attributes {
  max-width: 100%;
}

.m-complete-view .m-listing-info .m-main .manifold.m-attributes .m-attribute,
.m-description-view .m-listing-info .m-main .manifold.m-attributes .m-attribute,
.m-layout-listing .m-listing-info.m-main .manifold.m-attributes .m-attribute {
  border-bottom-color: var(--manifold-color-layout--border);
  grid-template-columns: 140px minmax(0, 1fr);
  grid-gap: 10px;
}

.m-complete-view
  .m-listing-info
  .m-main
  .manifold.m-attributes
  .m-attribute
  span,
.m-description-view
  .m-listing-info
  .m-main
  .manifold.m-attributes
  .m-attribute
  span,
.m-layout-listing
  .m-listing-info.m-main
  .manifold.m-attributes
  .m-attribute
  span {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.m-complete-view .m-listing-info .m-main .manifold.m-description::before,
.m-description-view .m-listing-info .m-main .manifold.m-description::before,
.m-layout-listing .m-listing-info.m-main .manifold.m-description::before {
  display: none;
}

.m-complete-view .m-listing-info .m-main .manifold.m-description p,
.m-description-view .m-listing-info .m-main .manifold.m-description p,
.m-layout-listing .m-listing-info.m-main .manifold.m-description p {
  font-size: 18px;
  line-height: 1.5;
}

.m-complete-view .m-listing-info .m-main .manifold.m-links a,
.m-description-view .m-listing-info .m-main .manifold.m-links a,
.m-layout-listing .m-listing-info.m-main .manifold.m-links a {
  border: 1px solid var(--manifold-color-theme--secondary);
  background: none;
  text-transform: uppercase;
  font-size: 11px;
  margin-left: 0;
}

.m-complete-view .m-listing-info .m-main .manifold.m-links a:hover,
.m-description-view .m-listing-info .m-main .manifold.m-links a:hover,
.m-layout-listing .m-listing-info.m-main .manifold.m-links a:hover {
  background: var(--manifold-color-link-background--hover);
}

.m-complete-view .m-listing-info .m-aside > button {
  height: 60px;
  margin-top: 17px;
  background: var(--manifold-color-cta-background--base);
  color: var(--manifold-color-cta-text--base);
}

.m-complete-view .m-listing-info .m-aside > button span,
.m-description-view .m-listing-info .m-aside > button span,
.m-layout-listing .m-listing-info .m-aside > button span {
  color: var(--manifold-color-cta-text--base);
}

.m-complete-view .m-listing-info .m-aside > button:disabled,
.m-description-view .m-listing-info .m-aside > button:disabled,
.m-layout-listing .m-listing-info .m-aside > button:disabled {
  background: var(--manifold-color-cta-background--disabled);
  color: var(--manifold-color-cta-text--disabled);
}

.m-complete-view .m-listing-info .m-aside > button:disabled span,
.m-description-view .m-listing-info .m-aside > button:disabled span,
.m-layout-listing .m-listing-info .m-aside > button:disabled span {
  color: var(--manifold-color-cta-text--disabled);
}

.m-complete-view .m-listing-info .m-aside > button:hover,
.m-description-view .m-listing-info .m-aside > button:hover,
.m-layout-listing .m-listing-info .m-aside > button:hover {
  background: var(--manifold-color-cta-background--hover);
}

.m-complete-view.m-listing-info,
.m-description-view.m-listing-info,
.m-layout-listing .m-listing-info {
  padding: 55px;
}

.m-expandable-image-expanded .show {
  z-index: 101;
}

.m-complete-view .m-listing-info .m-description p {
  font-size: 14px;
}
.m-complete-view .m-listing-info .m-countdown {
  border: 1px solid var(--manifold-color-layout--border);
  border-top: none;
  padding: 15px;
}
.m-complete-view .m-listing-info .m-countdown p:only-child {
  font-size: 11px;
  text-transform: uppercase;
}
.m-complete-view .m-listing-info .m-tooltip {
  display: none;
}
.m-complete-view .m-listing-info .m-aside .manifold.m-bids {
  margin-top: 17px;
  border: 0;
  border-top: 1px solid var(--manifold-color-bids--border);
  padding-top: 10px;
}
.m-complete-view .m-listing-info .m-aside .manifold.m-bids .m-bids-header {
  border-bottom: 0;
  padding: 15px;
}

.m-complete-view .m-listing-info .m-aside .manifold.m-bids .m-bids-header span {
  margin-top: 0;
}

.m-complete-view
  .m-listing-info
  .m-aside
  .manifold.m-bids
  .m-bids-inner
  .m-bid {
  background: var(--manifold-color-bids-background);
}

.m-complete-view
  .m-listing-info
  .m-aside
  .manifold.m-bids
  .m-bids-inner
  a
  > svg {
  filter: invert(100%);
}

.m-complete-view .m-listing-info .m-aside .manifold.m-bids .m-bids-inner span {
  background: none;
}

.m-complete-view
  .m-listing-info
  .m-aside
  .manifold.m-bids
  .m-bids-inner
  button {
  background: #fff1;
}

.m-complete-view
  .m-listing-info
  .m-countdown.m-bids
  .m-bids-inner
  span:last-child {
  padding-top: 0;
  opacity: 0.5;
}
.m-complete-view .m-listing-info .m-aside .m-bids button {
  background: #fff1;
}
</style>
