---
title: 'Day 60: the ::part() pseudo-element'
date: 2022-12-16T09:38:54.969Z
image: articles/sm_100days-day60.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use the `::part` CSS pseudo-element to style an element within a shadow tree."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/RwBbwwa
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 10: global styles and web components"
    url: /blog/2022/100daysof-day10
  - title: "Day 18: inheritable styles and web components"
    url: /blog/2022/100daysof-day18
  - title: "Day 28: custom properties and web components"
    url: /blog/2022/100daysof-day28
  - title: "Day 45: the specificity of ::slotted() content"
    url: /blog/2022/100daysof-day45
---
Let's have a look at the following web component.<br>
There's a heading and a paragraph in the shadow DOM and we can pass content via light DOM.

```js
class NewsTeasers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <h3>Latest news</h3>
      <p>Here's a selection of our latest blog posts.</p>
      <slot></slot>
      `
  }
}

customElements.define('news-teasers', NewsTeasers);
```

```html
<news-teasers>
  <ol>
    <li><a href="#1">Blog post 1</a></li>
    <li><a href="#2">Blog post 2</a></li>
    <li><a href="#3">Blog post 3</a></li>
    <li><a href="#4">Blog post 4</a></li>
  </ol>
</news-teasers>
```

<script>
  class NewsTeasers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <h3>Latest news</h3>
      <p>Here's a selection of our latest blog posts.</p>
      <slot></slot>
      `
  }
}

customElements.define('news-teasers', NewsTeasers);

class NewsTeasers2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <h3 part="heading">Latest news</h3>
      <p part="intro">Here's a selection of our latest blog posts.</p>
      <slot></slot>
      `
  }
}

customElements.define('news-teasers2', NewsTeasers2);
</script>

<style>
  .demo2 news-teasers {
    border: 8px dashed;
    display: block;
    padding: 20px;
  }

  /* inheritable properties */
  .demo2 news-teasers {
    color: green;
  }

  .demo2 news-teasers ol {
    border: 4px dotted;
  }

  .demo3 news-teasers h3 {
    font-size: 2rem;
  }

  /* light DOM */
  .demo3 news-teasers p {
    background-color: #000;
    color: #fff;
  }
</style>

<div data-sample="demo">

<news-teasers>
  <ol>
    <li><a href="#1">Blog post 1</a></li>
    <li><a href="#2">Blog post 2</a></li>
    <li><a href="#3">Blog post 3</a></li>
    <li><a href="#4">Blog post 4</a></li>
  </ol>
</news-teasers>

</div>

Sometimes it's desirable to allow authors to style web components from the outside. I've written about our options on [day 10](/blog/2022/100daysof-day10), [day 18](/blog/2022/100daysof-day18), and [day 28](/blog/2022/100daysof-day28). In summary, we can style the element itself, we can change inheritable properties, and we can style elements in light DOM.

```css
/* the element itself */
news-teasers {
  border: 8px dashed;
}

/* inheritable properties */
news-teasers {
  color: green;
}

/* light DOM */
news-teasers ol {
  border: 4px dotted;
}
```

<div data-sample="demo" class="demo2">

<news-teasers>
  <ol>
    <li><a href="#1">Blog post 1</a></li>
    <li><a href="#2">Blog post 2</a></li>
    <li><a href="#3">Blog post 3</a></li>
    <li><a href="#4">Blog post 4</a></li>
  </ol>
</news-teasers>

</div>

If we try to style elements in the shadow DOM, we're out of luck. We don't have access to them from the outside.

```css
/* shadow DOM */
news-teasers h3 {
  font-size: 2rem;
}

news-teasers p {
  background-color: #000;
  color: #fff;
}
```

<div data-sample="demo" class="demo3">

<news-teasers>
  <ol>
    <li><a href="#1">Blog post 1</a></li>
    <li><a href="#2">Blog post 2</a></li>
    <li><a href="#3">Blog post 3</a></li>
    <li><a href="#4">Blog post 4</a></li>
  </ol>
</news-teasers>

</div>

This is where `[part]` and `::part` come into play. The `part` attribute exposes an element outside of the shadow tree and the `::part()` pseudo-element allows you to select the exposed element.

```js
class NewsTeasers extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <h3 part="heading">Latest news</h3>
      <p part="intro">Here's a selection of our latest blog posts.</p>
      <slot></slot>
      `
  }
}

customElements.define('news-teasers', NewsTeasers);
```

<style>
  news-teasers2::part(heading) {
  font-size: 2rem;
}

news-teasers2::part(intro) {
  background-color: #000;
  color: #fff;
}
</style>

```css
/* exposed parts from the shadow DOM */
news-teasers::part(heading) {
  font-size: 2rem;
}

news-teasers::part(intro) {
  background-color: #000;
  color: #fff;
}
```

<div data-sample="demo" class="demo4">

<news-teasers2>
  <ol>
    <li><a href="#1">Blog post 1</a></li>
    <li><a href="#2">Blog post 2</a></li>
    <li><a href="#3">Blog post 3</a></li>
    <li><a href="#4">Blog post 4</a></li>
  </ol>
</news-teasers2>

</div>