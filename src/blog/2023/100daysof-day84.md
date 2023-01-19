---
title: 'Day 84: the @property at-rule'
date: 2023-01-19T09:38:54.969Z
image: articles/sm_100days-day84.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "The `@property` rule allows you to register custom properties. "
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/XWBejbz
layout: "layouts/100days.njk"
---
You can already define custom properties, but the difference between defining and registering is that the at-rule allows you to specify the type and other attributes.

```css
@property --hue {
  /* The type. */
  syntax: '<angle>';
  /* Is it an inhertiable property? */
  inherits: false;
  /* The initial value. */
  initial-value: 0deg;
}
```

## syntax

The `syntax` descriptor specifies the syntax (or type) of the property. You can find a list of [supported syntax component names](https://drafts.css-houdini.org/css-properties-values-api/#supported-names) in the spec.

```css
@property --milliseconds {
  syntax: '<integer>';
  inherits: false;
}
```

## inherits

The `inherits` descriptor specifies whether the property inherits from its parent or not.

```css
@property --color-primary {
  syntax: '<color>';
  inherits: true;
}
```

## initial-value

The `initial-value` descriptor specifies the initial value of the custom property.

```css
@property --color-primary {
  syntax: '<color>';
  inherits: true;
  initial-value: rgb(0 0 0);
}
```

## An example

Let's say we have a `<button>` and we want to transition the background color on `:hover` and `:focus-visible`.

<style>
  @property --h3 {
    initial-value: 0;
    inherits: true;
    syntax: '<number>';
  }

button {
  --h: 176;
  --h3: 176;
  --s: 74%;
  --l: 60%;
  
  --bg: hsl(var(--h) var(--s) var(--l));
  
  background-color: var(--bg);
  font-size: 2rem;
      width: 10rem;
    height: 10rem;
    border-radius: 50%;
}

.button1 {
  transition: background-color 1s;
}

.button2 {
  transition: --h 1s;
}

.button3 {
  transition: --h3 1.6s;
  --bg: hsl(var(--h3) var(--s) var(--l));
}

.button3:hover {
  --h3: 40;
}

button:is(:hover, :focus-visible) {
  --h: 40;
}
</style>  

```css
button {
  --h: 176;
  --s: 74%;
  --l: 60%;
  
  --bg: hsl(var(--h) var(--s) var(--l));
  
  background-color: var(--bg);
  transition: background-color 1s;
}

button:is(:hover, :focus-visible) {
  --h: 20;
}
```

<div data-sample="demo">
  <header>
    <button type="button" class="button1">Send</button>
  </header>
</div>

That works well, we get a nice transition from the first color to the second color, but if we want to animate just the hue to get a more interesting effect, we have bad luck, because the value of `--h` is a string, which you can't animate.

```css
button {
  --h: 176;
  --s: 74%;
  --l: 60%;
  
  --bg: hsl(var(--h) var(--s) var(--l));
  
  background-color: var(--bg);
  transition: --h 1s;
}
```

<div data-sample="demo">
  <header>
    <button type="button" class="button2">Send</button>
  </header>
</div>

With `@property` we can turn the string into number and animate it.

```css
@property --h {
  initial-value: 0;
  inherits: true;
  syntax: '<number>';
}

button {
  --h: 176;
  --s: 74%;
  --l: 60%;
  
  --bg: hsl(var(--h) var(--s) var(--l));
  
  background-color: var(--bg);
  transition: --h 1.6s;
}
```

<div data-sample="demo">
  <header>
    <button type="button" class="button3">Send</button>
  </header>
</div>