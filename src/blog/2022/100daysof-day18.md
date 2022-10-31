---
title: 'Day 18: inheritable styles and web components'
date: 2022-10-19T09:38:54.969Z
image: articles/sm_100days-day18.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "We already know that we can [encapsulate styles within a web component](/blog/2022/100daysof-day10/) by adding elements along with the styles to the shadow DOM. Global style declarations from outside don’t overwrite styles inside the web component.  

Shadow DOM doesn't provide total encapsulation, though. "
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/eYrbeVB
layout: "layouts/100days.njk"
caniuse: "has()"
reading:
  - title: "Styling: Styles Piercing Shadow DOM"
    url: https://open-wc.org/guides/knowledge/styling/styles-piercing-shadow-dom/
  - title: "Day 10: global styles and web components"
    url: /blog/2022/100daysof-day10/
---
If you look at the following component, you’ll notice that it uses the same font as the rest of the page, even though I haven't applied any styles to the web component. If styles were completely encapsulated, I would expect the component to use a default font like *Times*, but the web component inherits styles from its parent elements.  

<p style="margin-bottom:0"><strong>Demo:</strong></p>
<p>
<shadow-component></shadow-component>
</p>

<p class="code-label"><strong>HTML:</strong></p>

```html
<shadow-component></shadow-component>
```

<p class="code-label"><strong>JS:</strong></p>

```js
class ShadowComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div>Hello World!</div>`
  }
}

customElements.define('shadow-component', ShadowComponent);
```

<script>
  class ShadowComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="div">Hello World!</div>`
  }
}

customElements.define('shadow-component', ShadowComponent);
</script>

If I wrap the component in a `<div>` and a set a `color` on the div, the color of the text inside the web component changes as well. That's because [top-level elements of a shadow tree inherit from their host element](https://www.w3.org/TR/css-scoping-1/#inheritance). In other words, [inhertiable styles](https://web.dev/learn/css/inheritance/#which-properties-are-inheritable) will be passed to the shadow DOM.

```css
.parent {
  color: red;
}
```

```html
<div class="parent">
  <shadow-component></shadow-component>
</div>
```


<style>
  .parent {
    color: red;
  }
</style>

<p style="margin-bottom:0"><strong>Demo:</strong></p>
<div class="parent">
  <shadow-component></shadow-component>
</div>