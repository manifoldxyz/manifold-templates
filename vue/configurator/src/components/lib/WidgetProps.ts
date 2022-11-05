export enum WidgetPropType {
  STRING = "string",
  BOOLEAN = "boolean",
  ENUMERATION = "enumeration",
}

interface WidgetPropOptions {
  value: string;
  label: string;
}

export interface WidgetPropDefinition {
  name: string;
  type: WidgetPropType;
  value: string | boolean;
  defaultValue: string | boolean;
  options?: WidgetPropOptions[];
}

export interface WidgetDefinition {
  name: string;
  props: { [key: string]: WidgetPropDefinition };
  dataWidget?: string;
  javascript: string;
  css: string;
}
