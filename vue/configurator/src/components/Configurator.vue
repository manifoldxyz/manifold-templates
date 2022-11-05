<template>
  <el-container>
    <el-aside width="30%">
      <div v-if="configuration?.sharedProps" class="widget-configuration">
        <h1>Shared Options</h1>
        <el-row v-for="(prop, key) in configuration.sharedProps" :key="key">
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
      </div>
      <div
        class="widget-configuration"
        v-for="(widget, widgetIndex) in configuration?.widgets"
        :key="widgetIndex"
      >
        <h1>{{ widget.name }} Options</h1>
        <el-row v-for="(prop, key) in widget.props" :key="key">
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
      </div>
      <div class="code-blocks">
        <h1>Code</h1>
        <h2>Header</h2>
        <div class="div-code">
          <div
            v-for="(widget, widgetIndex) in configuration?.widgets"
            :key="widgetIndex"
          >
            {{`
            <script src="${widget.javascript}"></script>
            ` }}
          </div>
          <div
            v-for="(widget, widgetIndex) in configuration?.widgets"
            :key="widgetIndex"
          >
            {{`
            <link ref="stylesheet" href="${widget.css}" />
            ` }}
          </div>
        </div>
        <h2>Body</h2>
        <div class="div-code">
          <div
            v-for="(widget, widgetIndex) in configuration?.widgets"
            :key="widgetIndex"
            :id="`div-output-${widgetIndex}`"
          ></div>
        </div>
      </div>
    </el-aside>
    <el-main>
      <div
        v-for="(widget, widgetIndex) in configuration?.widgets"
        :key="widgetIndex"
        :id="`widget-parent-${widgetIndex}`"
      >
        <div
          v-if="widget.dataWidget"
          :id="`widget-${widgetIndex}`"
          :data-widget="widget.dataWidget"
        ></div>
        <div v-else :id="`widget-${widgetIndex}`"></div>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {
  WidgetPropType,
  WidgetDefinition,
  WidgetPropDefinition,
} from "./lib/WidgetProps";
import _ from "lodash";

interface ConfiguratorData {
  WidgetPropType: any;
}

export interface ConfiguratorDefinition {
  widgets: WidgetDefinition[];
  sharedProps?: { [key: string]: WidgetPropDefinition };
}

@Options({
  props: {
    configuration: Object as () => ConfiguratorDefinition,
  },
  watch: {
    configuration: {
      handler: _.debounce(function (newData: ConfiguratorDefinition) {
        let networkProp;
        for (let index = 0; index < newData.widgets.length; index++) {
          const widget = newData.widgets[index];
          // Clear current widget
          const parentElement = document.getElementById(
            `widget-parent-${index}`
          )!;
          let element = parentElement.firstElementChild!;
          if (element.id !== `widget-${index}`) {
            // Widget element was fully replaced, so clear out the replacement divs and recreate the original
            parentElement.innerHTML = "";
            element = document.createElement("div");
            element.setAttribute("id", `widget-${index}`);
            if (widget.dataWidget) {
              element.setAttribute("data-widget", widget.dataWidget);
            }
            parentElement.appendChild(element);
          } else {
            // Widget element still exists, reset it
            element.innerHTML = "";
            // Set v-node to undefined so it reloads
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            element._vnode = undefined;
          }

          // Update props
          for (const propKey in widget.props) {
            const prop = widget.props[propKey];
            if (propKey === "data-network") networkProp = prop;
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

          // Update shared props
          for (const propKey in newData.sharedProps) {
            const prop = newData.sharedProps[propKey];
            if (propKey === "data-network") networkProp = prop;
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

          // Set div output text
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.updateDivOutput();
        }

        // Clear ManifoldEthereumProvider network value directly otherwise it cannot be reinitialized
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.ManifoldEthereumProvider._network = networkProp?.value
          ? parseInt(networkProp.value.toString())
          : undefined;

        // Trigger widget refresh
        window.dispatchEvent(new Event("m-refresh-widgets"));
      }, 500),
      deep: true,
    },
  },
})
export default class Configurator extends Vue {
  configuration?: ConfiguratorDefinition;
  WidgetPropType = WidgetPropType;

  mounted(): void {
    // Add script an link
    for (const widget of this.configuration!.widgets) {
      const script = document.createElement("script");
      script.setAttribute("src", widget.javascript);
      document.head.appendChild(script);
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", widget.css);
      document.head.append(link);
    }
    this.updateDivOutput();
  }

  updateDivOutput(): void {
    for (let index = 0; index < this.configuration!.widgets.length; index++) {
      const parentElement = document.getElementById(`widget-parent-${index}`)!;
      let element = parentElement.firstElementChild!;
      // Set div output text
      document.getElementById(`div-output-${index}`)!.innerText =
        element.outerHTML
          .replace(/id="[a-zA-Z0-9-]*" ?/, "")
          .replaceAll(/data-v-[a-z0-9]*="" ?/g, "")
          .replace(" >", ">")
          .replaceAll("  ", " ");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-container h1 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.code-blocks {
  text-align: left;
}
.code-blocks h1 {
  margin-top: 20px;
  margin-bottom: 10px;
}
.code-blocks h2 {
  margin-top: 5px;
}

.widget-configuration {
  text-align: left;
}
.div-code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  padding: 10px;
  text-align: left;
}
</style>
