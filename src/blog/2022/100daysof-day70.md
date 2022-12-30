---
title: 'Day 70: the defined pseudo-class'
date: 2022-12-30T09:38:54.969Z
image: articles/sm_100days-day70.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "`:defined` represents any element that has been _defined_. This includes standard elements and custom elements that have been successfully defined."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/jOpWQpb
layout: "layouts/100days.njk"
reading:
  - title: ":defined - CSS: Cascading Style Sheets (MDN)"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/:defined
---


<style>
  [data-sample] :defined {
    background-color: #000;
  color: #fff;
}
</style>

<script>
  class BasicComponent extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('de-fined', BasicComponent);
</script>

```css
:defined {
  background-color: #000;
  color: #fff;
}
```

## Standard elements

```html
<p>I'm defined</p>
<small>I'm defined</small>
```

<div data-sample="demo">
  <p>I'm defined</p>
  <small>I'm defined</small>
</div>

## Undefined custom elements

```html
<unde-fined>I'm not defined</unde-fined>
```

<div data-sample="demo">
  <unde-fined>I'm not defined</unde-fined>
</div>

## Defined custom elements

```html
<de-fined>I'm defined</de-fined>
```

```js
class BasicComponent extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('de-fined', BasicComponent);
```

<div data-sample="demo">
  <de-fined>I'm defined</de-fined>
</div>

## Deprecated elements

```html
  <center>test</center>
  <font>test</font>
  <blink>test</blink>
```

<div data-sample="demo">
  <center>test</center>
  <font>test</font>
  <blink>test</blink>
</div>