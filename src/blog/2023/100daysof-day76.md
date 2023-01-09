---
title: 'Day 76: overwriting colors in font palettes'
date: 2023-01-09T09:38:54.969Z
image: articles/sm_100days-day76.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use the override-colors property to override colors in a font palette."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/KKBaxYK
layout: "layouts/100days.njk"
reading:
  - title: "COLRv1 and CSS font-palette | CSS-Tricks"
    url: https://css-tricks.com/colrv1-and-css-font-palette-web-typography
  - title: "Wakamai Fondue, the tool that answers the question “what can my font do?”"
    url: https://wakamaifondue.com/
  - title: "Day 75: font palettes"
    url: /blog/2022/100daysof-day75/
---

Color fonts come with one or more predefined color palettes. You can select them by using the `font-palette` property. You can also define your own color palettes or change specific colors in a palette using the `override-colors` property.

<style>


@font-face {
  font-family: 'Rocher';
  src: url('/images/RocherColorGX.woff2');
}

[data-sample] h1 {
  font-family: 'Rocher';
  font-size: 6rem;
  margin: 0;
}

@font-palette-values --custom {
  font-family: 'Rocher';
  override-colors: 0 #a13908;
}

@font-palette-values --custom-single-2 {
  font-family: 'Rocher';
  override-colors:
  2 #a13908;
}

@font-palette-values --custom-all {
  font-family: 'Rocher';
  override-colors:
  0 rgb(21, 58, 81),
  1 rgb(255 215 0),
  2 rgb(84 159 167),
  3 rgb(128, 210, 219);
}

@font-palette-values --custom-base {
  font-family: 'Rocher';
  base-palette: 1;
  override-colors: 0 #9e4356;
}

.custom {
  font-palette: --custom;
}

.custom-single-2 {
  font-palette: --custom-single-2;
}

.custom-all {
  font-palette: --custom-all;
}

.custom-base {
  font-palette: --custom-base;
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

That's the default font palette of the “Rocher” font.

<div data-sample="demo - default">

<h1>Jurassic 5</h1>

</div>

Using the `@font-palette-value` rule you can create a new font palette. You reference the typeface you want to create the palette for using the `font-family` property. Color palettes of the “Rocher” font consist of 4 colors. We can override colors by defining the index (starting with 0) of the color and a valid color value.

```css
@font-palette-values --custom {
  font-family: 'Rocher';
  override-colors: 0 #a13908;
}

h1 {
  font-palette: --custom;
}
```

<div data-sample="demo">

<h1 class="custom">The Pharcyde</h1>

</div>

You don't have to start at 0, you can override any color.

```css
@font-palette-values --custom {
  font-family: 'Rocher';
  override-colors: 2 #a13908;
}
```

<div data-sample="demo">

<h1 class="custom-single-2">Del the Funky Homosapien</h1>

</div>

Here's a custom palette based on the colors of my code syntax highlighter.

```css
@font-palette-values --custom {
  font-family: 'Rocher';
  override-colors:
  0 rgb(21, 58, 81),
  1 rgb(255 215 0),
  2 rgb(84 159 167),
  3 rgb(128, 210, 219);
}
```


<div data-sample="demo">

<h1 class="custom-all">A Tribe Called Quest</h1>

</div>


You can also use another base palette and override colors.

```css
@font-palette-values --custom {
  font-family: 'Rocher';
  base-palette: 1;
  override-colors: 0 #9e4356;
}
``` 

<div data-sample="demo">

<h1 class="custom-base">MF DOOM</h1>

</div>
