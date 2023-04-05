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

@Options({
  components: {
    Configurator,
  },
})
export default class ConnectView extends Vue {
  configuration?: ConfiguratorDefinition;

  data() {
    return {
      configuration: {
        widgets: [
          {
            ...Widgets.connect,
            name: "Connect Widget",
            dataWidget: "m-connect",
            props: {
              "data-app-name": {
                name: "App Name",
                type: WidgetPropType.STRING,
                value: "",
                defaultValue: "",
              },
              "data-client-id": {
                name: "App Client Id",
                type: WidgetPropType.STRING,
                value: "",
                defaultValue: "",
              },
              "data-network": {
                name: "App Network",
                type: WidgetPropType.ENUMERATION,
                value: "",
                options: [
                  {
                    value: "",
                    label: "None",
                  },
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
              "data-multi": {
                name: "Wallet Connect",
                type: WidgetPropType.BOOLEAN,
                value: false,
                defaultValue: false,
              },
              "data-delay-auth": {
                name: "Delay Authentication",
                type: WidgetPropType.BOOLEAN,
                value: false,
                defaultValue: false,
              },
              "data-show-chain": {
                name: "Show Chain",
                type: WidgetPropType.BOOLEAN,
                value: false,
                defaultValue: false,
              },
              "data-show-balance": {
                name: "Show Balance",
                type: WidgetPropType.BOOLEAN,
                value: false,
                defaultValue: false,
              },
              "data-grant-type": {
                name: "Grant Type",
                type: WidgetPropType.ENUMERATION,
                value: "",
                options: [
                  {
                    value: "",
                    label: "Signature",
                  },
                  {
                    value: "token",
                    label: "Token",
                  },
                ],
                defaultValue: "",
              },
              "data-avatar": {
                name: "Show Avatar",
                type: WidgetPropType.BOOLEAN,
                value: false,
                defaultValue: false,
              },
              "data-minimal": {
                name: "Minimal Widget",
                type: WidgetPropType.BOOLEAN,
                value: false,
                defaultValue: false,
              },
              "data-override-connect-text": {
                name: "Button Text",
                type: WidgetPropType.STRING,
                value: "",
                defaultValue: "",
              },
              "data-connect-wallet-image": {
                name: "Button Image",
                type: WidgetPropType.STRING,
                value: "",
                defaultValue: "",
              },
              "data-widget-theme": {
                name: "Widget Color",
                type: WidgetPropType.ENUMERATION,
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
                  // prefers-color-scheme: queries media based on the light/dark mode in browser
                  // Tested using Microsoft Edge and Chrome
                  // https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
                  {
                    value: (
                      window.matchMedia &&
                      window.matchMedia("(prefers-color-scheme: dark)")
                    ).matches
                      ? "manifold-scheme-dark"
                      : "manifold-scheme-light",
                    label: "OS Preference",
                  },
                ],
                defaultValue: "",
                required: false,
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
:root() {
  --base-font: "Raleway", sans-serif;
}

:where(.manifold) {
  font-family: var(--base-font);
  --manifold-color-page--background: #121212;
  --manifold-color-connect--background: rgba(0, 0, 0, 0.8);
  --manifold-color-connect--text: #fff;
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
  background: var(--manifold-color-connect--hover) !important;
  color: var(--manifold-text--color--primary) !important;
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
</style>
