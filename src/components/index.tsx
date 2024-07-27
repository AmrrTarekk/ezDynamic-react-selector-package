import React, { ReactNode, useEffect, useRef, useState } from "react";
import "../index.css";
import { Props } from "./types";

export const Selector = ({
  label,
  children,
  placeholder,
  openMenu,
  onToggle,
  disable = false,
}: Props) => {
  const [position, setPosition] = useState<{ block: "top" | "bottom" }>({
    block: "bottom",
  });
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);
  const handleOpenMenu = (e: any) => {
    e.stopPropagation();
    onToggle();
    (() => {
      const dropDown = dropdownRef.current?.getBoundingClientRect();
      const parent = parentRef.current?.getBoundingClientRect();

      if (!dropDown || !parent) return;
      const { height } = dropDown;
      const { top: parentTop, height: parentHeight } = parent;

      if (parentTop + parentHeight + height >= window.innerHeight) {
        setPosition({ block: "top" });
      } else {
        setPosition({ block: "bottom" });
      }
    })();
  };

  useEffect(() => {
    const focusListener = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
        // setPosition({ block: "bottom" });
      }
    };

    if (openMenu) {
      document.body.addEventListener("click", focusListener);
    } else {
      document.body.removeEventListener("click", focusListener);
    }

    return () => document.body.removeEventListener("click", focusListener);
  }, [onToggle, openMenu]);
  return (
    <div className="customDropDownMenu">
      <div
        ref={parentRef}
        className={"selectField"}
        onClick={(e) => {
          if (!disable) {
            handleOpenMenu(e);
          }
        }}
        style={{
          cursor: disable ? "not-allowed !important" : "pointer",
        }}
      >
        {label ? (
          typeof label === "string" ? (
            <p>{label}</p>
          ) : (
            label
          )
        ) : (
          <p style={{ color: "#979797" }}>{placeholder}</p>
        )}
        icon
      </div>
      <div
        style={{ visibility: openMenu ? "visible" : "hidden" }}
        ref={dropdownRef}
        className={`dropdown ${position.block === "top" ? "top" : "bottom"}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <div className={"dropdownBox"}>{children}</div>
      </div>
    </div>
  );
};
