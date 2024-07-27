import { ReactNode } from "react";

export type Props = {
  label?: string | ReactNode;
  children: ReactNode;
  placeholder: string;
  openMenu: boolean;
  onToggle: () => void;
  disable?: boolean;
};
