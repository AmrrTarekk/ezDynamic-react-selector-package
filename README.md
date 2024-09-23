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

##### or you can simply wrap your code inside of it and customize the selection condition:

```ts 

```