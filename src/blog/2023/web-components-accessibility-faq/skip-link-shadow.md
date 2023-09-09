---
title: "Can a skip link target an element in shadow DOM?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'No.'
date: 2023-09-08T16:00:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_skip.jpg
layout: "layouts/wcfaq.njk"
order: 8
---
Element IDs are scoped within a shadow root. A link in light DOM can't find a target in shadow DOM, but of course, you can put an `id` on the custom element itself.

```html
  <ol>
    <a href="#light">Bring me to the light</a>
    <a href="#shadow">Bring me to the shadow</a>
    <li><a href="#parent">Bring me to the shadow's parent</a></li>
  </ol>

  <p id="light">Target in light</p>
  <the-component id="parent"></the-component>
```

```js
class TheComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const paragraph = document.createElement("p");
    paragraph.textContent = "Target in shadow";
    paragraph.setAttribute('id', shadow)

    this.shadowRoot.append(paragraph);
  }
}

customElements.define("the-component", TheComponent);
```

<div data-sample="demo">
  <ol>
    <li><a href="#light">Bring me to the light</a></li>
    <li><a href="#shadow">Bring me to the shadow</a></li>
    <li><a href="#parent">Bring me to the shadow's parent</a></li>
  </ol>


  <p id="light">Target in light</p>
  <the-component id="parent"></the-component>
</div>

<style>
  :target {
    background: aqua;
  }

  the-component {
    display: block;
  }
</style>

<script>
class TheComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const paragraph = document.createElement("p");
    paragraph.textContent = "Target in shadow";
    paragraph.setAttribute('id', 'shadow')

    this.shadowRoot.append(paragraph);
  }
}

customElements.define("the-component", TheComponent);
</script>
