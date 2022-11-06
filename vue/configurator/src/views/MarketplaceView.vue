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
:root {
  --manifold-color-cta-background--base: #fff !important;
  --manifold-color-cta-background--disabled: hsla(
    0,
    0%,
    100%,
    0.0666666667
  ) !important;
  --manifold-color-cta-background--hover: hsla(0, 0%, 100%, 0.6) !important;
  --manifold-color-cta-text--base: #000 !important;
  --manifold-color-cta-text--disabled: #8a8a8a !important;
  --manifold-color-theme--secondary: #1a1a1a !important;
  --manifold-color-campaign--text: #fff !important;
  --manifold-color-connect--background: rgba(0, 0, 0, 0.8) !important;
  --manifold-color-connect--text: #fff !important;
  --manifold-color-connect--hover: hsla(0, 0%, 100%, 0.8) !important;
  --manifold-color-link-background--hover: hsla(0, 0%, 100%, 0.3) !important;
  --manifold-color-bids-background: hsla(0, 0%, 100%, 0.05) !important;
  --manifold-color-theme--primary: #2b2baa !important;
  --manifold-color-text: hsla(0, 0%, 100%, 0.87) !important;
  --manifold-color-text--primary: hsla(0, 0%, 92.2%, 0.87) !important;
  --manifold-color-text--secondary: #c9c9c9 !important;
  --manifold-color-text--disabled: hsla(0, 0%, 100%, 0.5) !important;
  --manifold-color-text--muted: hsla(0, 0%, 100%, 0.6) !important;
  --manifold-color-page--background: #121212 !important;
  --manifold-color-card--background: #333 !important;
}

.m-complete-view *,
.m-description-view *,
.m-layout-listing * {
  font-family: "Raleway", sans-serif;
}
#m-connection-wizard-container {
  pointer-events: auto;
}
#m-connection-wizard.h1 {
  color: black;
}

#walletconnect-wrapper * {
  pointer-events: auto;
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

.m-complete-view .m-expandable-image > button,
.m-description-view .m-expandable-image > button,
.m-layout-listing .m-expandable-image > button {
  right: 55px;
  bottom: -25px;
}

.m-complete-view .m-expandable-image .m-token-media > button,
.m-description-view .m-expandable-image .m-token-media > button,
.m-layout-listing .m-expandable-image .m-token-media > button {
  z-index: 101;
}

.m-complete-view .m-listing-info .m-main .m-name,
.m-description-view .m-listing-info .m-main .m-name,
.manifold.m-layout-listing .m-listing-info .m-main .m-name {
  font-weight: 100 !important;
  text-transform: uppercase;
  margin-bottom: 2.5rem !important;
}

.m-complete-view .m-listing-info .m-main .m-attributes,
.m-description-view .m-listing-info .m-main .m-attributes,
.m-layout-listing .m-listing-info.m-main .m-attributes {
  max-width: 100%;
}

.m-complete-view .m-listing-info .m-main .m-attributes .m-attribute,
.m-description-view .m-listing-info .m-main .m-attributes .m-attribute,
.m-layout-listing .m-listing-info.m-main .m-attributes .m-attribute {
  border-bottom-color: var(--manifold-color-layout--border);
  grid-template-columns: 140px minmax(0, 1fr);
  grid-gap: 10px;
}

.m-complete-view .m-listing-info .m-main .m-attributes .m-attribute span,
.m-description-view .m-listing-info .m-main .m-attributes .m-attribute span,
.m-layout-listing .m-listing-info.m-main .m-attributes .m-attribute span {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.m-complete-view .m-listing-info .m-main .m-description::before,
.m-description-view .m-listing-info .m-main .m-description::before,
.m-layout-listing .m-listing-info.m-main .m-description::before {
  display: none;
}

.m-complete-view .m-listing-info .m-main .m-description p,
.m-description-view .m-listing-info .m-main .m-description p,
.m-layout-listing .m-listing-info.m-main .m-description p {
  font-size: 18px;
  line-height: 1.5;
}

.m-complete-view .m-listing-info .m-main .m-links a,
.m-description-view .m-listing-info .m-main .m-links a,
.m-layout-listing .m-listing-info.m-main .m-links a {
  border: 1px solid var(--manifold-color-theme--secondary);
  background: none;
  text-transform: uppercase;
  font-size: 11px;
  margin-left: 0;
}

.m-complete-view .m-listing-info .m-main .m-links a:hover,
.m-description-view .m-listing-info .m-main .m-links a:hover,
.m-layout-listing .m-listing-info.m-main .m-links a:hover {
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

.m-description-view footer {
  background: #101010;
  text-align: center;
  align-items: center;
  padding-bottom: 20px;
}
.m-description-view footer span {
  color: #999;
  text-transform: uppercase;
  font-size: 10px;
}
.m-description-view footer span a {
  color: white;
  font-size: inherit;
}
.m-description-view .m-logo {
  padding: 20px;
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
.m-complete-view .m-listing-info .m-bids {
  margin-top: 17px;
  border: 0;
  border-top: 1px solid var(--manifold-color-bids--border);
  padding-top: 10px;
}
.m-complete-view .m-listing-info .m-bids .m-bids-header {
  border-bottom: 0;
  padding: 15px;
}

.m-complete-view .m-listing-info .m-bids .m-bids-header span {
  margin-top: 0;
}

.m-complete-view .m-listing-info .m-bids .m-bids-inner .m-bid {
  background: var(--manifold-color-bids-background);
}

.m-complete-view .m-listing-info .m-countdown.m-bids .m-bids-inner a > svg {
}

.m-complete-view .m-listing-info .m-countdown.m-bids .m-bids-inner span {
  background: none;
}

.m-complete-view .m-listing-info .m-countdown.m-bids .m-bids-inner button {
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
.m-complete-view .m-listing-info .m-bids button {
  background: #fff1;
}
</style>
