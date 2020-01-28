---
title: 'Here’s what I didn’t know about list-style-type'
metadescription: >-
  In Chrome  79+, Firefox 39+, and Opera 66+ it's possible to define a string value as the bullet of an ordered or unordered list.
date: 2020-01-28T06:58:54.969Z
teaser: "At the CSS-in-Vienna meet-up last week [Ulrich](https://twitter.com/udobiasch) told me that starting with Chrome 79 it's possible to define a string value for the `list-style-type` property. I was surprised because I thought `::marker` was supposed to solve that. That's why I did some research, here's what I learned."
tags:
  - css
publication: Matuzo
draft: false
archive: false
---
## list-style-type excepts a string value

In Chrome  79+, Firefox 39+, and Opera 66+ it's possible to define a string value as the bullet of an ordered or unordered list, which means that emojis work, as well. 

```css
ul {
  list-style-type: "🐣";
}
```

<ul class="lst-emoji">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<style>
.lst-emoji {
  list-style-type: "🐣";
}
</style>

The list item may also be described as an Unicode value. 

```css
ul {
  list-style-type: "\1F44D";
}
```

<ul class="lst-unicode">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<style>
.lst-unicode {
  list-style-type: "\1F44D";
}
</style>

## @counter-style is a thing

Browsing the MDN page for `list-style-type` I discovered that there's a `@counter-style` at-rule. It allows you to define custom counter styles. It's  `list-style-type` with super powers. 

Currently, only supported in Firefox, there are several interesting options, like a list of one or multiple `symbols`, `suffix`, `prefix` or `range`. I won't describe them here, I suggest you read about [counter styles on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@counter-style) or have a look at the demos below (Firefox only). 

**Drooling emoji and a suffix**

```css
@counter-style drooling {
  system: cyclic;
  symbols: "\1F924";
  suffix: ". ";
}

.counterstyle {
  list-style: drooling;
}
```

<ul class="lst-drooling">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<style>
@counter-style drooling {
  system: cyclic;
  symbols: "\1F924";
  suffix: ". ";
}

.lst-drooling {
  list-style: drooling;
}
</style>

**3 different symbols with a prefix only applied to the 2nd, 3rd and 4th list item**

```css
  @counter-style custom {
    system: cyclic;
    symbols: "\1F924" "\1F44D" "\1F525";
    prefix: "->";
    range: 2 4;
  }
  
  .counterstyle2 {
    list-style: custom;
  }
```

<ul class="lst-custom">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
  <li>Item 5</li>
</ul>

<style>
@counter-style custom {
    system: cyclic;
    symbols: "\1F924" "\1F44D" "\1F525";
    prefix: "->";
    range: 2 4;
}

.lst-custom {
  list-style: custom;
}
</style>

[Check it out on CodePen](https://codepen.io/matuzo/pen/XWJQWPa?editors=1100). 

## What about `::marker? 

On [HTMHell](https://www.htmhell.dev/15-letter-by-letter/) I’m using the `::marker` CSS pseudo-element to select the marker box of list items, which by default contains a bullet or number, and replace is using the `content` attribute.

```css
  li::marker {
    content: "🔥";
    font-size: 2.6rem;
  }
```

<ul class="lst-marker">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<style>
.lst-marker li::marker{
    content: "🔥";
    font-size: 2.6rem;
}
</style>

What’s great about `::marker` is that you can finally style bullets.

```css
  .li::marker {
    color: #FF00FF;
    font-size: 2em;
  }
```

<ul class="lst-marker2">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<style>
.lst-marker2 li::marker {
    color: #FF00FF;
    font-size: 2em;
}
</style>

Only all [font properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts), [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color), [text-combine-upright](https://developer.mozilla.org/en-US/docs/Web/CSS/text-combine-upright), [unicode-bidi](https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi), [direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction) and [content](https://developer.mozilla.org/en-US/docs/Web/CSS/content) can be used with `::marker`. 

While it’s possible to change the `content`, I’d say that the main purpose of `::marker` is styling, and `list-style-type` and `@counter-style` are responsible for the value of the bullet.

This post is part of a series called [“Here’s what I didn’t know about…”](/blog/heres-what-i-didnt-know).
