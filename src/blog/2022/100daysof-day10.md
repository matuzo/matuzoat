---
title: 'Day 10: global styles and web components'
date: 2022-10-07T09:38:54.969Z
image: articles/sm_100days-day10.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "I was wondering what happens with HTML elements in web components when I add styles to the document. Under which circumstances do global styles defined in a style element or external stylesheet apply to these elements? "
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/OJZOEWQ
layout: "layouts/100days.njk"
caniuse: "modal"
---
As it turns out, it depends on how you create and use the components. In my test setup I have an HTML document, a stylesheet and three different components.

<style>
  .div {
    border: 2px solid red;
  }

  slot-component,
  basic-component,
  shadow-component {
    display: block;
    margin-top: 0 !important;
  }
</style>

<p class="code-label"><strong>styles.css</strong></p>

```css
div {
  border: 2px solid red;
}
```

<p class="code-label"><strong>index.html</strong></p>

```html
<head>
  …
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <basic-component></basic-component>

  <shadow-component></shadow-component>
  
  <slot-component>
    <div>Bye World!</div>
  </slot-component>

  <script src="basic-component.js" type="module"></script>
  <script src="shadow-component.js" type="module"></script>
  <script src="slot-component.js" type="module"></script>
</body>
```

### Web component without shadow DOM

If you add an element to a web component using JavaScript and you don’t attach it to the shadow DOM, styles defined outside the web component apply.

<p class="code-label"><strong>basic-component.js</strong></p>

```js
class BasicComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<div>Hello World!</div>`
  }
}

customElements.define('basic-component', BasicComponent);
```

<p style="margin-bottom:0"><strong>Demo:</strong></p>
<basic-component></basic-component>

### Web component with shadow DOM

If you attach an element to the shadow DOM inside the web component, style declarations from the outside don’t apply.

<p class="code-label"><strong>shadow-component.js</strong></p>

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

<p style="margin-bottom:0"><strong>Demo:</strong></p>
<shadow-component></shadow-component>

### Web Component with slotted content

If you attach an element to the shadow DOM inside the web component and you pass slotted content, style declarations from the outside only apply to the slotted content.

```js
class SlotComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div>Hello World!</div>
      <slot></slot>
      `
  }
}

customElements.define('slot-component', SlotComponent);
```

<p style="margin-bottom:0"><strong>Demo:</strong></p>
<slot-component>
  <div class="div">Bye World!</div>
</slot-component>


<script>
class BasicComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `<div class="div">Hello World!</div>`
  }
}

customElements.define('basic-component', BasicComponent);

class ShadowComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `<div class="div">Hello World!</div>`
  }
}

customElements.define('shadow-component', ShadowComponent);

class SlotComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <div class="div">Hello World!</div>
      <slot></slot>
      `
  }
}

customElements.define('slot-component', SlotComponent);
</script>

PS: The next post is coming on Monday because weekends are for family and friends. ❤️
