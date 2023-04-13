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
            },
          },
        ],
      },
    };
  }
}
</script>
