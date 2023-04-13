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
              "data-address": {
                name: "Contract address -- required",
                type: WidgetPropType.STRING,
                value: "", // can test with 0xf11f75c3b4548138c8894df6f32517c82fa7e362
                required: true,
              },
            },
          },
        ],
      },
    };
  }
}
</script>
