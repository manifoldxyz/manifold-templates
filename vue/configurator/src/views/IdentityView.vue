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
              "data-wallet": {
                name: "Wallet address -- required",
                type: WidgetPropType.STRING,
                value: "",
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
