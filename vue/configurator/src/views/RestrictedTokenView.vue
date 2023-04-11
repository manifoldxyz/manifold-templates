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
            ...Widgets.restrictedToken,
            name: "Restricted Token Widget",
            dataWidget: "m-restricted-token",
            props: {
              "data-address": {
                name: "Contract address -- required",
                type: WidgetPropType.STRING,
                value: "", // can test with 0xf11f75c3b4548138c8894df6f32517c82fa7e362
                required: true,
              },
              /* Schemed Utility class definitons for light/dark
              https://docs.manifold.xyz/v/manifold-for-developers/resources/widgets/manifold-css-variables/scheme-utility-classes */
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
