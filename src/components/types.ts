import { ReactNode } from "react";

export type Props = {
  label?: ReactNode;
  children?: ReactNode;
  list?: {
    title: ReactNode;
    value: unknown;
  }[];
  placeholder: ReactNode;
  openMenu: boolean;
  onToggle: () => void;
  onSelect?: (value: unknown) => void; // used when list is provided
  disable?: boolean;
  stylesControl?: {
    selector?: string; // used to custom the design of the selector
    placeholder?: string; // used to custom the style of the placeholder
    label?: string; // used to custom the style of the label
    dropdown?: string; // used to custom the style of the dropdown
    menu?: string; // used to custom the style of the menu
    item?: string; // used to custom the style of the item
  };
  displaySelectorIcon?: boolean; // control the display of the selector icon
  selectorIcon?: ReactNode; // to choose your prefered icon instead of arrow down icon
};
