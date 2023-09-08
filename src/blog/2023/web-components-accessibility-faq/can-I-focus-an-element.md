---
title: "Can I focus an element in shadow DOM programmatically?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Yes.'
date: 2023-09-08T09:10:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_shadow_focus.jpg
layout: "layouts/wcfaq.njk"
---
The answer to this question is _yes_, but there are two different ways of doing it, and how you can do it depends on the type of component you're working with. 

Before I can elaborate, you must understand the difference between the two types of shadow DOMs there are. When you attach a shadow tree to a node, you can either create an _open_ or _closed_ shadow DOM.

*Open* means that JavaScript from the outside has access to the nodes inside the shadow DOM. That’s usually the default.

<figure>

```js
class TheButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const button = document.createElement("button");
    button.textContent = "Click me";
    button.addEventListener('click', e => alert('yo!'))

    this.shadowRoot.append(button);
  }
}

customElements.define("the-button", TheButton);
```

<figcaption>
A component with an open shadow DOM.
</figcaption>

</figure>


The following query returns `1` because there's one element in the shadow DOM of the component.

<figure>

```js
const theButton = document.querySelector('the-button');
console.log(theButton.shadowRoot.querySelectorAll('*').length)
// => returns 1
```

<figcaption>
Querying the component and all elements in its shadow root.
</figcaption>

</figure>

*Closed* denies access to the nodes from the outside.

<figure>

```js
class TheButton extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "closed" });

    const button = document.createElement("button");
    button.textContent = "Click me";
    button.addEventListener('click', e => alert('yo!'))

    this._shadow.append(button);
  }
}

customElements.define("the-button", TheButton);
```

<figcaption>
A component with a closed shadow DOM.
</figcaption>

</figure>

In a closed shadow DOM the same query returns `“Cannot read properties of null (reading ‘querySelectorAll’)”` because you cannot access the shadow DOM from the outside.

Now that you know that, we can talk about the two solutions.

## Accessing the shadowRoot

This solution only works when you're dealing with an open shadow DOM.

<figure>

```js
const theButton = document.querySelector('the-button')
theButton.shadowRoot.querySelector('button').focus()
```

<figcaption>
Querying the component and focusing the button in its shadow root.
</figcaption>

</figure>

When you click the “Focus” button in light DOM, the “Click me” button in shadow DOM receives focus.

<div data-sample="demo">
  <button class="btn1">Focus</button>
  <the-button></the-button>
</div>

<script>
  const btn = document.querySelector('.btn1')
  btn.addEventListener('click', e => document.querySelector('the-button').shadowRoot.querySelector('button').focus())

  class TheButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });

      const style = document.createElement("style");
      style.textContent = `
        button:focus {
          outline: 4px solid var(--color-blue-dark);
          outline-offset: 2px,
        }
      `
      const button = document.createElement("button");
      button.textContent = "Click me";
      button.addEventListener('click', e => alert('yo!'))

      this.shadowRoot.append(style);
      this.shadowRoot.append(button);
    }
  }

  customElements.define("the-button", TheButton);
</script>

## Delegating focus

Another solution that works both with an open and closed shadow DOM is focus delegation.
When you attach the shadow, you can pass another option in addition to the `mode`, `delegatesFocus`.

<figure>

```js
  class TheButton extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open", delegatesFocus: true  });

      const button = document.createElement("button");
      button.textContent = "Click me";
      button.addEventListener('click', e => alert('yo!'))

      this.shadowRoot.append(button);
    }
  }

  customElements.define("the-button", TheButton);
```

<figcaption>
A component with an open shadow DOM that delegates focus.
</figcaption>

</figure>

When it's `true`, and you call `focus()` on the host, the first focusable element in the hosts shadow DOM receives focus.

<figure>

```js 
const btn = document.querySelector('button')
btn.addEventListener('click', e => document.querySelector('the-button').focus())
```

<figcaption>
Focusing the component, focuses the button.
</figcaption>

</figure>

<div data-sample="demo">
  <button class="btn2">Focus</button>
  <the-button2></the-button2>
</div>

<script>
  
  const btn2 = document.querySelector('.btn2')
  btn2.addEventListener('click', e => document.querySelector('the-button2').focus())

  class TheButton2 extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open", delegatesFocus: true });
  const style = document.createElement("style");
      style.textContent = `
        button:focus {
          outline: 4px solid var(--color-blue-dark);
          outline-offset: 2px,
        }
      `

      const button = document.createElement("button");
      button.textContent = "Click me";
      button.addEventListener('click', e => alert('yo!'))

      this.shadowRoot.append(style);
      this.shadowRoot.append(button);
    }
  }

  customElements.define("the-button2", TheButton2);
</script>

