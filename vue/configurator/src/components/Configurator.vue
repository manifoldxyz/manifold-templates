<template>
  <el-container>
    <el-aside width="20%">
      <el-row v-for="(prop, key) in widgetProps" :key="key">
        <el-col :span="6">{{ prop.name }}</el-col>
        <el-col :span="12">
          <el-input
            v-if="prop.type === WidgetPropType.STRING"
            v-model="prop.value"
            class="w-50 m-2"
            :placeholder="prop.name"
          />
          <el-select
            v-else-if="prop.type === WidgetPropType.ENUMERATION"
            v-model="prop.value"
            class="m-2"
            placeholder="None"
            size="small"
          >
            <el-option
              v-for="item in prop.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-checkbox
            v-else-if="prop.type === WidgetPropType.BOOLEAN"
            v-model="prop.value"
            size="large"
          />
        </el-col>
      </el-row>
      <div id="div-output"></div>
    </el-aside>
    <el-main>
      <div
        v-if="addConnectWidget"
        id="manifold-connect"
        data-widget="m-connect"
      ></div>
      <div id="widget-parent">
        <div v-if="dataWidget" id="widget" :data-widget="dataWidget"></div>
        <div v-else id="widget"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { WidgetPropType, WidgetPropDefinition } from "./lib/WidgetProps";
import _ from "lodash";

interface ConfiguratorData {
  WidgetPropType: any;
}

@Options({
  props: {
    widgetProps: {
      type: Object as () => { [key: string]: WidgetPropDefinition },
      required: true,
    },
    dataWidget: String,
    addConnectWidget: Boolean,
  },
  watch: {
    widgetProps: {
      handler: _.debounce(function (newData: {
        [key: string]: WidgetPropDefinition;
      }) {
        // Clear ManifoldEthereumProvider network value directly otherwise it cannot be reinitialized
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.ManifoldEthereumProvider._network = newData["data-network"]
          ?.value
          ? parseInt(newData["data-network"].value.toString())
          : undefined;

        // Clear current widget
        const parentElement = document.getElementById("widget-parent")!;
        let element = parentElement.firstElementChild!;

        if (element.id !== "widget") {
          // Widget element was fully replaced, so clear out the replacement divs and recreate the original
          parentElement.innerHTML = "";
          element = document.createElement("div");
          element.id = "widget";
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const dataWidget = this.dataWidget;
          if (dataWidget) element.setAttribute("data-widget", dataWidget);
          parentElement.appendChild(element);
        } else {
          // Widget element still exists, reset it
          element.innerHTML = "";
          // Set v-node to undefined so it reloads
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          element._vnode = undefined;
          for (const propKey in newData) {
            const prop = newData[propKey];
            let value = prop.value;
            if (prop.type === WidgetPropType.STRING) {
              value = value.toString().trim();
            }
            if (value !== prop.defaultValue) {
              element.setAttribute(propKey, value.toString());
            } else {
              element.removeAttribute(propKey);
            }
          }
        }
        document.getElementById("div-output")!.innerText = element.outerHTML
          .replace(/id="[a-zA-Z0-9-]*" ?/, "")
          .replaceAll(/data-v-[a-z0-9]*="" ?/g, "");

        // Clear connect widget if necessary
        const connectElement = document.getElementById("manifold-connect");
        if (connectElement) {
          // Set v-node to undefined so it reloads
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          connectElement._vnode = undefined;
          for (const propKey in newData) {
            const prop = newData[propKey];
            if (prop.shared) {
              let value = prop.value;
              if (prop.type === WidgetPropType.STRING) {
                value = value.toString().trim();
              }
              if (value !== prop.defaultValue) {
                element.setAttribute(propKey, value.toString());
              } else {
                element.removeAttribute(propKey);
              }
            }
          }
        }

        // Trigger widget refresh
        window.dispatchEvent(new Event("m-refresh-widgets"));
      },
      500),
      deep: true,
    },
  },
})
export default class Configurator extends Vue {
  data(): ConfiguratorData {
    return {
      WidgetPropType,
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
  margin-right: 100px;
}
</style>
