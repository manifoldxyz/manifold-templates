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
export default class IdentityView extends Vue {
  configuration?: ConfiguratorDefinition;

  data() {
    return {
      configuration: {
        widgets: [
          {
            ...Widgets.identity,
            name: "Wallet Identity Widget",
            dataWidget: "m-wallet-identity",
            props: {
              "data-wallet": {
                name: "Wallet address -- required",
                type: WidgetPropType.STRING,
                value: "",
                required: true,
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
