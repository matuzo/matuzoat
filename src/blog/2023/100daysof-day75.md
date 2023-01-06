---
title: 'Day 75: font palettes'
date: 2023-01-06T09:38:54.969Z
image: articles/sm_100days-day75.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Apparently, multicolored typefaces on the web are a thing. You can use and modify them in CSS."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/ExpgbyY
layout: "layouts/100days.njk"
reading:
  - title: "COLRv1 and CSS font-palette | CSS-Tricks"
    url: https://css-tricks.com/colrv1-and-css-font-palette-web-typography
  - title: "Wakamai Fondue, the tool that answers the question “what can my font do?”"
    url: https://wakamaifondue.com/
  - title: "Hands-On Guide to Color Fonts and @font-palette-values"
    url: https://youtu.be/VpZSMq2ajDE
  - title: "Rocher Color - Harbor Type | Fonts made in Brazil"
    url: https://www.harbortype.com/fonts/rocher-color/
---
<style>


@font-face {
  font-family: 'Rocher';
  src: url('/images/RocherColorGX.woff2');
}

@font-palette-values --pink {
  font-family: 'Rocher';
  base-palette: 1;
}

@font-palette-values --green {
  font-family: 'Rocher';
  base-palette: 2;
}

@font-palette-values --gray {
  font-family: 'Rocher';
  base-palette: 9;
}

[data-sample] h1 {
  font-family: 'Rocher';
  font-size: 6rem;
  margin: 0;
}

.sample2 h1 {
  font-palette: --pink;
}

.sample3 h1 {
  font-palette: --green;
}

.sample4 h1 {
  font-palette: --gray;
}

</style>

```css
@font-face {
  font-family: 'Rocher';
  src: url('/fonts/RocherColorGX.woff2');
}

h1 {
  font-family: "Rocher";
}
```

<div data-sample="demo">

<h1>woah!</h1>

</div>

Pretty cool, right? What’s even cooler is that color fonts come with a default color palette and optionally with a set of alternative palettes that you can access via CSS.

<figure>
  <img src="/images/100days-75-1.jpg" alt="11 palette each with 4 colors">
  <figcaption>The font “Rocher” comes with 11 palettes</figcaption>
</figure>

In order to use a different palette, you have to reference and associate it with a font using the `@font-palette-value` rule. Within the rule, you assign a palette using the `base-palette` property. The value is an index, starting at 0 (default palette). Rocher comes with 11 palettes, which means that you can assign values between 0 and 10.

```css
@font-palette-values --pink {
  font-family: 'Rocher';
  base-palette: 1;
}

@font-palette-values --green {
  font-family: 'Rocher';
  base-palette: 2;
}

@font-palette-values --gray {
  font-family: 'Rocher';
  base-palette: 9;
}
```

To use a palette, you use the `font-palette` property and reference the name you’ve defined in the `@font-palette-values` rule (You pick the name, it's not predefined).

```css
h1 {
  font-palette: --pink;
}
```

<div data-sample="demo" class="sample2">

<h1>woah!</h1>

</div>

```css
h1 {
  font-palette: --green;
}
```

<div data-sample="demo" class="sample3">

<h1>woah!</h1>

</div>

```css
h1 {
  font-palette: --gray;
}
```

<div data-sample="demo" class="sample4">

<h1>woah!</h1>

</div>