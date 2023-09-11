---
title: "Are there any constraints regarding accessibility testing?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Yes.'
date: 2023-09-07T13:45:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_testing.jpg
layout: "layouts/wcfaq.njk"
order: 17
---

## Debugging with accessibility testing tools</h2>

Not all accessibility testing tools support Shadow DOM. For example, Wave flags zero errors, but there are at least three in the following component. 

<figure>

```js
class SomeBugs extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `   
    <img src="#test">
    
    <button></button>
    <button aria-hidden="true">Click</button>
      `
  }
}

customElements.define('some-bugs', SomeBugs);
```

<figcaption>Image with no alt, empty button, and aria-hidden interactive element.</figcaption>
</figure>


<img src="/images/shadow-dom-debugging4.webp" alt="Browser version of wave showing 0 errors" width="1200" height="680" loading="lazy">

## Debugging with DevTools

I like to use the live expression feature in Chrome's Dev Tools to debug keyboard accessibility issues by logging `document.activeElement`.

When I focus a button in light DOM, it returns the focused button.

<img src="/images/shadow-dom-debugging.webp" alt="Focus on button 1. Dev tools logs button.button1" width="1200" height="352" loading="lazy">

When I focus a button in shadow DOM, it returns the parent component.

<img src="/images/shadow-dom-debugging1.webp" alt="Focus on button 2. Dev tools logs cus-tom12" width="1200" height="313" loading="lazy">

To workaround that I have to create a second live expression that logs `document.activeElement.shadowRoot.activeElement`.

<img src="/images/shadow-dom-debugging2.webp" alt="Focus on button 2. Dev tools logs cus-tom12 and button.button2" width="1200" height="384" loading="lazy">

That's okay, but you get an annoying error when focusing an element without a shadow root.
<img src="/images/shadow-dom-debugging3.webp" alt="Focus on button 1. Dev tools logs button.button1 and Uncaught TypeError: Cannot read properties of null…" width="1200" height="384" loading="lazy">

