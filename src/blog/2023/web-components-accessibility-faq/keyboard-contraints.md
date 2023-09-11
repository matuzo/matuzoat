---
title: "Are there any constraints regarding keyboard accessibility?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Not that I know, but some things are annoying.'
date: 2023-09-11T13:37:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_keyboarda11y.jpg
layout: "layouts/wcfaq.njk"
order: 15
---

Style encapsulation sounds great until you want certain styles to be applied everywhere. For example, you define focus styles globally because they are usually the same for every element. You expect them to apply to every interactive element when you do that, but thanks to style encapsulation, interactive elements in shadow trees don't get that styling.

<figure>

```css
:focus-visible {
  outline: 2px solid; 
  outline-offset: 2px;
}
```

```html
<button>Button 1</button>
<button>Button 2</button>
<sha-dow></sha-dow>
```

<figcaption>Two buttons in Light DOM, two in Shadow DOM</figcaption>
</figure>

<style>
  :focus-visible {
  outline: 2px solid; 
  outline-offset: 2px;
}
</style>

<figure>

<div data-sample="demo" class="demo12">

<button>Button 1</button>
<button>Button 2</button>
<sha-dow></sha-dow>
</div>

<figcaption>Button one and two have custom styles. Button three and four use default styles.</figcaption>
</figure>

<script>
  class Shadow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
      <button>Button 3</button>
      <button>Button 4</button>
    `
  }
}

customElements.define('sha-dow', Shadow);
</script>



```js
class Shadow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
      <button>Button 3</button>
      <button>Button 4</button>
    `
  }
}

customElements.define('sha-dow', Shadow);
```


To get the same focus styles in shadow DOM as in light DOM, you have to repeat the global declarations in each component with interactive elements.


```css
:root {
  --site-focus-outline: 2px solid;
  --site-focus-offset: 2px;
}

:focus-visible {
  outline: var(--site-focus-outline);
  outline-offset: var(--site-focus-offset);
}
```



```js
  class Shadow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `   
    <style>
      :focus-visible {
        outline: var(--site-focus-outline);
        outline-offset: var(--site-focus-offset);
      }
    </style>
    
    <button>Button 3</button>
    <button>Button 4</button>
      `
  }
}

customElements.define('sha-dow', Shadow);
```