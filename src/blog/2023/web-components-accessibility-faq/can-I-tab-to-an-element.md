---
title: "Can I tab to an element in shadow DOM?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Yes.'
date: 2023-09-08T08:45:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_shadow_tab.jpg
layout: "layouts/wcfaq.njk"
order: 6
---
Attaching an interactive element to the shadow root of a component doesn't affect it in terms of its interactivity. You can hover it, click it, or focus it using the keyboard.

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

<script>
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
</script>

Try pressing the <kbd>Tab</kbd> key until you find the button and then press <kbd>Enter</kbd> or <kbd>Space</kbd>.

<div data-sample="demo">
  <the-button></the-button>
</div>