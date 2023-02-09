---
title: 'Day 99: native nesting'
date: 2023-02-09T09:38:54.969Z
image: articles/sm_100days-day99.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Nesting in CSS is coming soon! For me personally not _the_ killer feature, at least compared to [cascade layers](/blog/2022/100daysof-day37/) or [container queries](/blog/2022/100daysof-day56/), but still exciting. Let’s see how it works."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/bGjPomJ
layout: "layouts/100days.njk"
reading:
  - title: "Try out CSS Nesting today"
    url: https://webkit.org/blog/13813/try-css-nesting-today-in-safari-technology-preview/
---

The most important thing to know about native nesting in CSS is that the nested selector always must start with a symbol (. # : [ * + > ~) because of limitations in browser parsing engines.

The following code doesn't work:
```css
/* Doesn't work */

ul {
  li {
    border-color: green;
  }
}
```

To work around that limitation the nested selector can start with an `&`.

```css
ul {
  & li {
    border-color: green;
  }
}

/* 
  Same as: 
  ul li { } 
*/
```

Besides this limitation, everything works as expected for me. Here are some of the things I've tested:

```css
a {
  &:hover {
    background-color: aqua;
  }
  
  &:focus-visible {
    background-color: aqua;
  }
}

/* 
  Same as:
  a:hover { }
  a:focus-visible { } 
*/
```

```css
a {
  &:is(:hover, :focus-visible) {
    background-color: aqua;
  }
}

/* 
  Same as:
  a:is(:hover, :focus-visible) { } 
*/
```

```css
h2 {
  font-family: sans-serif;
  
  &::first-letter {
    color: red;
  }
}

/* 
  Same as:
  h2 { } 
  h2::first-letter { } 
*/
```

```css
h2 {
  & + p {
    background-color: red;
  }
}

/* 
  Same as:
  h2 + p { } 
*/
```

```css
h2 {
  .parent & {
    background-color: aqua;
  }
}

/* 
  Same as:
  .parent h2 { } 
*/
```

```css
h2 {
  @media (min-width: 400px) {
    background: red;
  }
}

/* 
  Same as:
  @media (min-width: 400px) {
    h2 { } 
  }
*/
```

```css
h2 {
  @media (min-width: 400px) {
    background: red;
    
    &::before {
      content: "!";
      color: #fff;
    }
    
    & ~ p {
      & span {
        background-color: #000;
      }
      
      :is(span) {
        color: #fff;
      }
    }
  }
}

/* 
  Same as:
  @media (min-width: 400px) {
    h2 { } 
    h2::before { }
    h2 ~ p span { }
    h2 ~ p :is(span) { }
  }
*/
```

```css
div {
  & & & h3 {
    background-color: green;
  }
}

/* 
  Same as:
  div div div h3 { }
*/
```

```css
h3 {
  :is(div) & {
    color: #fff;
  }
}

/* 
  Same as:
  :is(div) h3 { }
*/
```

```css
a {
  &[download] {
    border: 1px solid red;
  }
}

/* 
  Same as:
  a[download] { }
*/
```

You can try it today in [Chrome Dev](https://www.google.com/chrome/dev/), [Safari Technology Preview](https://developer.apple.com/safari/technology-preview/), or [Polypane 13](https://polypane.app/blog/polypane-13-css-nesting-extension-support-in-beta-search-by-selector-and-chromium-110/).