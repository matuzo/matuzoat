---
title: 'Here’s what I didn’t know about “color”'
metadescription: >-
  In Chrome  79+, Firefox 39+, and Opera 66+ it's possible to define a string value as the bullet of an ordered or unordered list.
date: 2020-04-19T06:58:54.969Z
image: articles/sm_color.png
teaser: "This is part 2 of my series [Here’s what I didn’t know about…](/blog/heres-what-i-didnt-know/) in which I try to learn new things about CSS. This time I'm trying to find out what I didn't know about the `color` property."
tags:
  - css
publication: Matuzo
draft: false
archive: false
---

When setting the CSS `color` property, 2 things happen.

1. The foreground `color` value of an element's text changes.
3. The `currentcolor` value changes.

```css
a {
  color: #237680;
}

circle {
  fill: currentColor;
}
```

```html
<a href="#">
  Hello World!
  <svg height="30" width="30">
    <circle cx="15" cy="15" r="10" fill="red" />
  </svg> 
</a>
````
<style>
.rich-text .link-reset:link,
.rich-text .link-reset:visited {
  box-shadow: none !important;
  text-decoration: underline !important;
  transition: none !important;
  color: #237680 !important;
}

.rich-text .link-reset circle {
  fill: currentColor;
}
</style>

<p>
  <a href="#" class="link-reset">
    Hello World!

  <svg height="30" width="30">
    <circle cx="15" cy="15" r="10" fill="red" />
</svg> 
</a>
</p>


## currentColor is the default color value of some properties

Usually when I work with the `border` property, I change the width and color of the border. That’s probably why I’ve never noticed that the default value of `border-color` is `currentColor`.

```css
.parent {
  color: #ca3041;
  border-style: solid;
}
```

```html
<div class="parent">
  yo!
</div>
```

<style>
.div-color {
  color: #ca3041;
}
</style>

<div class="div-color" style="border-style: solid;">yo!</div>

So, if you change the `color` value of an element, its border color changes, too.<br>
That’s the case for most properties that have a color.

### text-emphasis-color

```css
.parent em {
  text-emphasis-style: "*";
}
```

<div class="div-color"><em style="text-emphasis-style: '*'"><abbr title="What the fuck">WTF</abbr> is text-emphasis?</em></div>

### text-shadow

```css
.parent span {
  text-shadow: 5px 10px;
}
```

<div class="div-color"><span style="text-shadow: 5px 10px;">yo!</span></div>

### text-decoration-color

```css
.parent span {
  text-decoration: overline underline;
}
```

<div class="div-color"><span style="text-decoration: overline underline">yo!</span></div>

### caret-color

> The user agent selects an appropriate color for the caret. This is generally currentcolor, but the user agent may choose a different color to ensure good visibility and contrast with the surrounding content, taking into account the value of currentcolor, the background, shadows, and other factors. 

<https://developer.mozilla.org/en-US/docs/Web/CSS/caret-color>

```css
input {
  color: #ca3041;
}
```
<p>
  <label for="input">The text and caret color should be red</label> <br/>
  <input type="text" class="div-color" id="input">
</p>

### outline-color

```css
.parent span {
  outline-style: dotted;
}
```

<div class="div-color"><span style="outline-style: dotted">yo!</span></div>

### column-rule-color

```css
.parent p {
  columns: 3;
  column-rule: solid;
}
```

<div class="div-color"><p style="columns: 3; column-rule: solid;">I didn't know that column-rule exists. How did I miss that?</p></div>

Now that I've written it down, it absolutely makes sense and I guess I subconsciously knew how most of the properties behave, but I just wasn't aware. Now I am. :)

## HSL colors

Yes, I know, HSL colors are not specific to the color property and they’ve been around for forever (IE 9+), but I’ve never used them and I don’t know how they work. Now is a good time to find out.

HSL (Hue, Saturation, Lightness) is an alternative representation of the RGB color model.

### Hue
H is an angle of the color circle. It can be defined using 4 different units.

`deg` (or unitless): a value between 0 and 360. Red: 0deg, Green: 120deg, Blue: 240deg.
`rad`: a value between 0 and 2π (~6.2832). (Red: 0rad, Green: 2.0944rad, Blue: 4.1888rad)
`grad`: a value between 0 and 400. (Re: 0grad, Green: 133.33grad, Blue: 266.66grad)
`turn`: a value between 0 and 1. (Re: 0grad, Green: 0.333turn, Blue: 0.6666turn)


For example, a right angle is 90deg = 100grad = 0.25turn ≈ 1.5708rad

This page about [the &lt;angle&gt; CSS data type](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) on MDN helped me better understand how these units relate.


### Saturation

S is a percentage. 0% is fully unsaturated (gray), 100% is fully saturated.

### Lightness

L is a percentage. 0% lightness is black, 50% lightness is default, and 100% lightness is white.


```css
body {
  background: hsl(0, 100%, 100%); /* = #FFFFFF */
}
```

<p style="background: hsl(0, 100%, 100%); color: hsl(0, 100%, 0%)">hsl(0, 100%, 100%)</p>

```css
body {
  background: hsl(0, 100%, 0%); /* = #000000 */
}
```

<p style="background: hsl(0, 100%, 0%); color: hsl(0, 100%, 100%)">hsl(0, 100%, 0%)</p>

```css
body {
  background: hsl(0, 100%, 50%); /* = #FF0000 */
}
```

<p style="background: hsl(0, 100%, 50%); color: hsl(0, 100%, 100%)">hsl(0, 100%, 50%)</p>


```css
body {
  background: hsl(0, 50%, 50%); /* = ##bf4040 */
}
```

<p style="background: hsl(0, 50%, 50%); color: hsl(0, 100%, 100%)">hsl(0, 50%, 50%)</p>

There’s also hsla, which adds support for a fourth parameter (alp﻿ha).

```css
body {
  background: hsla(0, 100%, 50%, 0.5); /* = rgba(255, 0, 0, 0.5)*/
}
```

<p style="background: hsla(0, 100%, 50%, 0.5); color: hsl(0, 100%, 0%)">hsla(0, 100%, 50%, 0.5)</p>


CSS Colors Level 4 adds support for space-separated values.

```css
body {
  background: hsl(0 100% 50% / .15); /* = rgba(255, 0, 0, 0.15*/
  background: hsl(0 100% 50% / 15%) /* = rgba(255, 0, 0, 0.15*/
}
```

<p style="background: hsl(0 100% 50% / 15%); color: hsl(0, 100%, 0%)">hsl(0 100% 50% / 15%)</p>


> Many designers find HSL more intuitive than RGB, since it allows hue, saturation, and lightness to each be adjusted independently. HSL can also make it easier to create a set of matching colors (such as when you want multiple shades of a single hue).

<https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#HSL_colors>


Thanks for reading ❤️. In part 3 I'll probably write about `text-emphasis` or `column-rule` 🙃.
