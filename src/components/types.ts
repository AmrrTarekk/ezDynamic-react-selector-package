import { ReactNode } from "react";

export type Props = {
  label?: ReactNode;
  children?: ReactNode;
  list?: {
    title: ReactNode;
    value: ReactNode;
  }[];
  placeholder: ReactNode;
  openMenu: boolean;
  onToggle: () => void;
  onSelect?: (value: ReactNode) => void; // used when list is provided
  disable?: boolean;
  selectorStyle?: string; // used to custom the design of the selector
};
