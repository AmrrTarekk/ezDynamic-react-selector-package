import React, { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import "../index.css";
import { Props } from "./types";
import ExpandIcon from "./ExpandMore.svg";

export const Selector = ({
  label,
  children,
  list = [],
  placeholder,
  openMenu,
  onToggle,
  onSelect,
  disable = false,
  selectorStyle = "",
}: Props) => {
  const [position, setPosition] = useState<{ block: "top" | "bottom" }>({
    block: "bottom",
  });

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const handleOpenMenu = (e: any) => {
    e.stopPropagation();
    onToggle();

    function calculatePosition() {
      if (dropdownRef.current && parentRef.current) {
        const dropDown = dropdownRef.current.getBoundingClientRect();

        const parent = parentRef.current.getBoundingClientRect();
        if (!dropDown || !parent) return;

        const { height } = dropDown;
        const { top: parentTop, height: parentHeight } = parent;

        if (parentTop + parentHeight + height >= window.innerHeight) {
          setPosition({ block: "top" });
        } else {
          setPosition({ block: "bottom" });
        }
      }
    }

    calculatePosition();
  };

  useEffect(() => {
    const focusListener = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onToggle();
        // setPosition({ block: 'bottom' });
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
    <div className="selector">
      <div
        ref={parentRef}
        className={`selectField ${selectorStyle}`}
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
        <img src={ExpandIcon} alt="expand-icon" className="icon" />
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
        <div className={"dropdownBox"}>
          {children ? (
            children
          ) : (
            <div className="list">
              {list.map((item, index) => (
                <Fragment key={index}>
                  <div
                    onClick={function () {
                      if (onSelect) {
                        onSelect(item.value);
                      }
                    }}
                    className="menu"
                  >
                    {item.title}
                  </div>
                  {index !== list.length - 1 && <hr />}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
