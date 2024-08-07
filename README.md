# ezdynamic-react-selector

Easy Dynamic react selector component.

## Introduction

It's a versatile React component for dynamic selection scenarios. It provides an easy-to-use interface for creating and managing selection components with customizable options and flexibility.

#### Key Features:

- **Dynamic Selection:** Allows users to dynamically add, remove, and select items.
- **Customizable:** Supports various customization options for styling and behavior.
- **Flexible Integration::** Easily integrates with existing React applications and state management solutions with any desired design.

## Install

```bash
npm install ezdynamic-react-selector
```

## Usage

```javascript
import { useState } from "react";
import { createRoot } from "react-dom/client";

import { createContext, useContextSelector } from "use-context-selector";

const context = createContext(null);

const Counter1 = () => {
  const count1 = useContextSelector(context, (v) => v[0].count1);
  const setState = useContextSelector(context, (v) => v[1]);
  const increment = () =>
    setState((s) => ({
      ...s,
      count1: s.count1 + 1,
    }));
  return (
    <div>
      <span>Count1: {count1}</span>
      <button type="button" onClick={increment}>
        +1
      </button>
      {Math.random()}
    </div>
  );
};

const Counter2 = () => {
  const count2 = useContextSelector(context, (v) => v[0].count2);
  const setState = useContextSelector(context, (v) => v[1]);
  const increment = () =>
    setState((s) => ({
      ...s,
      count2: s.count2 + 1,
    }));
  return (
    <div>
      <span>Count2: {count2}</span>
      <button type="button" onClick={increment}>
        +1
      </button>
      {Math.random()}
    </div>
  );
};

const StateProvider = ({ children }) => (
  <context.Provider value={useState({ count1: 0, count2: 0 })}>
    {children}
  </context.Provider>
);

const App = () => (
  <StateProvider>
    <Counter1 />
    <Counter2 />
  </StateProvider>
);

createRoot(document.getElementById("app")).render(<App />);
```
