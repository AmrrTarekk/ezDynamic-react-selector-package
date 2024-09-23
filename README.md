# ezdynamic-react-selector

Easy Dynamic react selector component.

## Introduction

It's a versatile React component for dynamic selection scenarios. It provides an easy-to-use interface for creating and managing selection components with customizable options and flexibility.

#### Key Features:

- **Dynamic Selection:** Allows users to dynamically add, remove, and select items.
- **Customizable:** Supports various customization options for styling and behavior.
- **Flexible Integration:** Easily integrates with existing React applications and state management solutions with any desired design.

## Install

```bash
npm install ezdynamic-react-selector
```

## Usage

you should always import styles before it:

```ts
import "ezdynamic-react-selector/dist/index.css";
import { Selector } from "ezdynamic-react-selector";
```

Here are examples of how you can use it.

### Sinlge Selection:

#### Examples

#### Set up the selected array as:

```ts
const selectedArr = {
  title: ReactNode;
  value: string;
}[]
```

##### First way:

```ts
import "ezdynamic-react-selector/dist/index.css";
import { Selector } from "ezdynamic-react-selector";
import styles from "./App.module.css";
import { useState } from "react";

const arr = [
  {
    title: "one",
    value: "one",
  },
  {
    title: "two",
    value: "two",
  },
  {
    title: "three",
    value: "three",
  },
  {
    title: "four",
    value: "four",
  },
  {
    title: "five",
    value: "five",
  },
  {
    title: "six ",
    value: "six",
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div
      className={styles.App}
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Selector
          placeholder="Select Value"
          label={selectedValue}
          openMenu={open}
          onToggle={() => handleToggle()}
          list={arr}
          onSelect={(value) => setSelectedValue(value)}
          stylesControl={{
            selector: styles.selector,
            dropdown: styles.dropdown,
            placeholder: styles.placeholder,
          }}
        />
      </div>
    </div>
  );
}

export default App;
```

```css
// As Example

.selector {
}
.dropdown {
}
.placeholder {
}
```

#### Seocnd way:

##### or you can simply wrap your code inside of it and customize the selection condition as follows:

**NOTE** This approach simplifies coding and allows you to fully customize it to suit your needs, which is the core value of this package.

in this case you have to write your own style for the dropdown menu

```ts
<Selector
  placeholder="Select Value"
  label={selectedValue}
  openMenu={open}
  onToggle={() => handleToggle()}
>
  <div>
    {arr.map((item, index) => (
      <Fragment key={index}>
        <div
          className={`${styles.item} ${
            selectedValue === item.value ? styles.selected : ""
          }`}
          onClick={() => setSelectedValue(item.value)}
        >
          <span>{item.title}</span>
          {selectedValue === item.value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setSelectedValue("");
              }}
            >
              &#10060;
            </span>
          )}
        </div>
        {arr.length - 1 !== index && <hr />}
      </Fragment>
    ))}
  </div>
</Selector>
```

CSS code as:

```css
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  padding: 4px 7px;
}

.selected {
  background-color: #a419161c;
}
```

### Multiple Selections:

Same as before but the label is changed to the selections the user would picked.

```ts
import "ezdynamic-react-selector/dist/index.css";
import { Selector } from "ezdynamic-react-selector";
import styles from "./App.module.css";
import { Fragment, useState } from "react";

const arr = [
  {
    title: "one",
    value: "one",
  },
  {
    title: "two",
    value: "two",
  },
  {
    title: "three",
    value: "three",
  },
  {
    title: "four",
    value: "four",
  },
  {
    title: "five",
    value: "five",
  },
  {
    title: "six ",
    value: "six",
  },
];

function App() {
  const [open, setOpen] = useState(false);
  const [selectedList, setSelectedList] = useState([]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const removeItemFromList = (e, value) => {
    e.stopPropagation();
    setSelectedList((prev) => prev.filter((item) => item !== value));
  };

  return (
    <div
      className={styles.App}
      style={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Selector
          placeholder="Select Value"
          label={
            selectedList.length > 0 && (
              <div className={styles.selectedList}>
                {selectedList.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            )
          }
          openMenu={open}
          onToggle={() => handleToggle()}
        >
          <div>
            {arr.map((item, index) => (
              <Fragment key={index}>
                <div
                  className={`${styles.item} ${
                    selectedList.includes(item.value) ? styles.selected : ""
                  }`}
                  onClick={() =>
                    !selectedList.includes(item.value) &&
                    setSelectedList((prev) => [...prev, item.value])
                  }
                >
                  <span>{item.title}</span>
                  {selectedList.includes(item.value) && (
                    <span onClick={(e) => removeItemFromList(e, item.value)}>
                      &#10060;
                    </span>
                  )}
                </div>
                {arr.length - 1 !== index && <hr />}
              </Fragment>
            ))}
          </div>
        </Selector>
      </div>
    </div>
  );
}

export default App;
```

```css
.selectedList {
  display: flex;
  gap: 10px;
}
```

## Built With

- [TSDX](https://tsdx.io/) - TSDX

## Author

- [**Amr Tarek**](https://www.linkedin.com/in/amrrtarekk/)

## License

This project is licensed under the MIT License
