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
            },
          },
        ],
      },
    };
  }
}
</script>
