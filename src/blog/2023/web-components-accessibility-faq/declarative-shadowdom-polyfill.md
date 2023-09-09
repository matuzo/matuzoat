---
title: "Is there a polyfill for Declarative Shadow DOM?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Yes, kinda.'
date: 2023-09-09T07:45:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_dsdpolyfill.jpg
layout: "layouts/wcfaq.njk"
order: 3
---

Building a polyfill for declarative shadow DOM is straightforward: you find all `<template shadowrootmode>` elements and convert them to attached Shadow Roots on their parent element.
That allows the web component to function in unsupported browsers but only when JavaScript is enabled and functioning.

```js
(function attachShadowRoots(root) {
  // find all templates with a shadowrootmode attribute
  root.querySelectorAll("template[shadowrootmode]").forEach(template => {
    // get the mode: open or closed
    const mode = template.getAttribute("shadowrootmode");
    // attach a shadow to the component
    const shadowRoot = template.parentNode.attachShadow({ mode });
    // append the content in the template
    shadowRoot.appendChild(template.content);
    // remove the template
    template.remove();
    attachShadowRoots(shadowRoot);
  });
})(document);
```

<script>
class TheMessage3 extends HTMLElement {
  static observedAttributes = ["type", "text"];

  constructor() {
    super();
  }
}

customElements.define("the-message3", TheMessage3);
</script>

<div data-sample="demo">

<the-message3>
<template shadowrootmode="open">
<style>:host { --_border: blue; display: block; border: 4px dotted var(--_border); padding: 0.5em; } :host([type="warning"]) {--_border: orange;}
</style><slot></slot></template><p>You should see a 4px dotted blue border, even in Firefox.</p>
</the-message3>

</div>

<script>
	(function attachShadowRoots(root) {
  root.querySelectorAll("template[shadowrootmode]").forEach(template => {
    const mode = template.getAttribute("shadowrootmode");
    const shadowRoot = template.parentNode.attachShadow({ mode });
    shadowRoot.appendChild(template.content);
    template.remove();
    attachShadowRoots(shadowRoot);
  });
})(document);
</script>

Source: [Declarative Shadow DOM](https://developer.chrome.com/en/articles/declarative-shadow-dom/#polyfill)