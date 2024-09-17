import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import { Props } from "./types";

export const Selector = ({
  label,
  children,
  list = [],
  placeholder,
  openMenu,
  onToggle,
  onSelect,
  disable = false,
  stylesControl = {
    selector: "",
    placeholder: "",
    label: "",
    dropdown: "",
    menu: "",
    item: "",
  },
  displaySelectorIcon = true,
  selectorIcon,
}: Props) => {
  const [position, setPosition] = useState<{ block: "top" | "bottom" }>({
    block: "bottom",
  });

  const [selectedItem, setSelectedItem] = useState<unknown>();

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
  const onDelete = (item: unknown) => {
    if (item === selectedItem) {
      setSelectedItem(null);
      onSelect?.(null);
    }
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
      {/* css: selectorStyle */}
      <div
        ref={parentRef}
        className={`selectField ${
          stylesControl.selector ? stylesControl.selector : ""
        }`}
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
            <p
              className={`label ${
                stylesControl.label ? stylesControl.label : ""
              }`}
            >
              {label}
            </p>
          ) : (
            label
          )
        ) : typeof placeholder === "string" ? (
          <p
            className={`placeholder ${
              stylesControl.placeholder ? stylesControl.placeholder : ""
            }`}
          >
            {placeholder}
          </p>
        ) : (
          placeholder
        )}
        {displaySelectorIcon &&
          (selectorIcon ? (
            selectorIcon
          ) : (
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.80654 0.806574C9.74457 0.744088 9.67083 0.694492 9.5896 0.660646C9.50836 0.6268 9.42122 0.609375 9.33321 0.609375C9.2452 0.609375 9.15807 0.6268 9.07683 0.660646C8.99559 0.694492 8.92185 0.744088 8.85988 0.806574L5.80654 3.85991C5.74457 3.92239 5.67084 3.97199 5.5896 4.00583C5.50836 4.03968 5.42122 4.05711 5.33321 4.05711C5.2452 4.05711 5.15807 4.03968 5.07683 4.00583C4.99559 3.97199 4.92185 3.92239 4.85988 3.85991L1.80654 0.806574C1.74457 0.744088 1.67083 0.694492 1.5896 0.660646C1.50836 0.6268 1.42122 0.609375 1.33321 0.609375C1.2452 0.609375 1.15807 0.6268 1.07683 0.660646C0.995587 0.694492 0.921853 0.744088 0.859877 0.806574C0.73571 0.931482 0.666016 1.10045 0.666016 1.27657C0.666016 1.4527 0.73571 1.62167 0.859877 1.74657L3.91988 4.80657C4.29488 5.18111 4.80321 5.39148 5.33321 5.39148C5.86321 5.39148 6.37154 5.18111 6.74654 4.80657L9.80654 1.74657C9.93071 1.62167 10.0004 1.4527 10.0004 1.27657C10.0004 1.10045 9.93071 0.931482 9.80654 0.806574Z"
                fill="#4B4B4B"
              />
            </svg>
          ))}
      </div>
      {/* css: dropdown */}
      <div
        style={{ visibility: openMenu ? "visible" : "hidden" }}
        ref={dropdownRef}
        className={`dropdown ${position.block === "top" ? "top" : "bottom"} ${
          stylesControl.dropdown ? stylesControl.dropdown : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {/* css: dropdownBox */}
        <div className={`menu ${stylesControl.menu ? stylesControl.menu : ""}`}>
          {children ? (
            children
          ) : (
            // css: list
            <div className="list">
              {list.map((item, index) => (
                <div key={index}>
                  {/* css: item */}
                  <div
                    onClick={function () {
                      if (onSelect) {
                        onSelect(item.value);
                        setSelectedItem(item.value);
                      }
                    }}
                    className={`item ${
                      stylesControl.item ? stylesControl.item : ""
                    } ${selectedItem === item.value ? "active" : ""}`}
                  >
                    {item.title}
                    <span
                      onClick={function (e) {
                        e.stopPropagation();
                        onDelete(item.value);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        id="Layer_1"
                        data-name="Layer 1"
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                      >
                        <path
                          d="m16.707,8.707l-3.293,3.293,3.293,3.293-1.414,1.414-3.293-3.293-3.293,3.293-1.414-1.414,3.293-3.293-3.293-3.293,1.414-1.414,3.293,3.293,3.293-3.293,1.414,1.414Zm7.293,3.293c0,6.617-5.383,12-12,12S0,18.617,0,12,5.383,0,12,0s12,5.383,12,12Zm-2,0c0-5.514-4.486-10-10-10S2,6.486,2,12s4.486,10,10,10,10-4.486,10-10Z"
                          fill="#4B4B4B"
                        />
                      </svg>
                    </span>
                  </div>
                  {index !== list.length - 1 && <hr />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
