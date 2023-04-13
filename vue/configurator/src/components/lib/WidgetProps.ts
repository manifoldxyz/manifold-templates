export enum WidgetPropType {
  STRING = "string",
  BOOLEAN = "boolean",
  ENUMERATION = "enumeration",
}

interface WidgetPropOptions {
  value: string;
  label: string;
}

interface WidgetThemeDefinition {
  value: string;
  options: WidgetPropOptions[];
}

export interface WidgetPropDefinition {
  name: string;
  type: WidgetPropType;
  value: string | boolean;
  defaultValue: string | boolean;
  options?: WidgetPropOptions[];
  required?: boolean;
  dependentProps?: string[];
}

export interface WidgetDefinition {
  name: string;
  props: { [key: string]: WidgetPropDefinition };
  dataWidget?: string;
  widgetTheme?: WidgetThemeDefinition;
  javascript: string;
  css: string;
}
