---
title: 'Day 28: custom properties and web components'
date: 2022-11-02T09:38:54.969Z
image: articles/sm_100days-day28.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "We already know that we can [encapsulate styles within a web component](/blog/2022/100daysof-day10/) and we know that [web components inherit styles](/blog/2022/100daysof-day18/). Another interesting feature of web components in terms of CSS is that custom properties used in a web component can be modified from the outside."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/KKeKYqX
layout: "layouts/100days.njk"
caniuse: "font-variation-settings"
reading:
  - title: "Day 10: global styles and web components"
    url: /blog/2022/100daysof-day10
  - title: "Day 18: inheritable styles and web components"
    url: /blog/2022/100daysof-day18
  - title: "Day 45: the specificity of ::slotted() content"
    url: /blog/2022/100daysof-day45
---
Let's take this basic alert component.

<script>
  class Alert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    const styles = document.createElement('style');
    styles.textContent = `
      div {
        background-color: var(--alert-bg, rgb(136 177 255 / 0.5));
        color: var(--alert-color, rgb(0 0 0));
        font-weight: bold;
        padding: var(--alert-spacing, 1rem);
      }
    `
    const content = document.createElement('div');
    content.innerHTML = `
      <slot></slot>
    `
    this.shadowRoot.append(styles)
    this.shadowRoot.append(content)
  }
}

customElements.define('matuzo-alert', Alert);
</script>

<div class="sample">
<matuzo-alert>
  Please confirm your e-mail address by clicking the link in the e-mail we just sent you.
</matuzo-alert>
</div>

```js
class Alert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    const styles = document.createElement('style');
    styles.textContent = `
      div {
        background-color: rgb(136 177 255 / 0.5);
        color: rgb(0 0 0);
        font-weight: bold;
        padding: 1rem;
      }
    `

    const content = document.createElement('div');
    content.innerHTML = `
      <slot></slot>
    `
    
    this.shadowRoot.append(styles)
    this.shadowRoot.append(content)
  }
}

customElements.define('matuzo-alert', Alert);
```

```html
<matuzo-alert>
  Please confirm your e-mail address by clicking the link in the e-mail we just sent you.
</matuzo-alert>
```

Now, let's say we want to reuse this component, but convey a different importance visually. We could add attributes (props) for styling to the web component.

```html
<matuzo-alert type="error">
  The amount must be a value between 1 and 16.
</matuzo-alert>
```

```js
styles.textContent = `
  div {
    background-color: rgb(136 177 255 / 0.5);
    color: rgb(0 0 0);
    font-weight: bold;
    padding: 1rem;
  }

  host([type="error"]) div {
    …
  }
`
```

This works and it’s also sometimes the preferred way, but we could also open the component up by using custom properties.

```js
const styles = document.createElement('style');
styles.textContent = `
  div {
    background-color: var(--alert-bg, rgb(136 177 255 / 0.5));
    color: var(--alert-color, rgb(0 0 0));
    font-weight: bold;
    padding: var(--alert-spacing, 1rem);
  }
`
```
What's happening here is that we set the `background-color`, `color`, and `padding` to a custom property. If the custom property isn't defined, it [falls back to default value](/blog/2022/100daysof-day1). The web component still looks the same, but we can now change its styling according to our needs by modifying custom properties without touching the component.

<style>
  matuzo-alert {
    display: block;
    margin-bottom: 1rem;
  }

  .error {
    --alert-bg: rgb(255 119 119);
    --alert-spacing: 2rem;
  }

  .success {
    --alert-bg: rgb(39 149 39);
    --alert-color: rgb(255 255 255);
  }
</style>

## Default

<div class="sample">

<matuzo-alert>
  Please confirm your e-mail address by clicking the link in the e-mail we just sent you.
</matuzo-alert>

</div>

```html
<matuzo-alert>
  Please confirm your e-mail address by clicking the link in the e-mail we just sent you.
</matuzo-alert>
```

## Error
<div class="sample">
<matuzo-alert class="error">
  The amount must be a value between 1 and 16.
</matuzo-alert>
</div>

```css
.error {
  --alert-bg: rgb(255 119 119);
  --alert-spacing: 2rem;
}
```

```html
<matuzo-alert class="error">
  The amount must be a value between 1 and 16.
</matuzo-alert>
```



## Success

<div class="sample">
<matuzo-alert class="success">
  Settings saved successfully.
</matuzo-alert>
</div>

```css
.success {
  --alert-bg: rgb(39 149 39);
  --alert-color: rgb(255 255 255);
}
```

```html
<matuzo-alert class="success">
  The amount must be a value between 1 and 16.
</matuzo-alert>
```