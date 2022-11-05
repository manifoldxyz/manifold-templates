export enum WidgetPropType {
  STRING = "string",
  BOOLEAN = "boolean",
  ENUMERATION = "enumeration",
}

export interface WidgetPropDefinition {
  name: string;
  type: WidgetPropType;
  value: string | boolean;
  defaultValue: string | boolean;
  options?: WidgetPropOptions[];
  // Set to true if we want the prop to be used across all widget elements
  shared?: boolean;
}

interface WidgetPropOptions {
  value: string;
  label: string;
}
