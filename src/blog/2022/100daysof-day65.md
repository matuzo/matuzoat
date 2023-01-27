---
title: 'Day 65: using the em unit in container queries'
date: 2022-12-23T09:38:54.969Z
image: articles/sm_100days-day65.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Relative units used in container queries work differently than relative units in media queries."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/QWBwWer
layout: "layouts/100days.njk"
reading:
  - title: "Use the Right Container Query Syntax"
    url: https://www.oddbird.net/2022/08/18/cq-syntax/
  - title: "CSS Containment Module Level 3"
    url: https://www.w3.org/TR/css-contain-3/
  - title: "Day 56: container queries"
    url: /blog/2022/100daysof-day56/
  - title: "Day 59: naming containers"
    url: /blog/2022/100daysof-day59/
  - title: "Day 62: the container shorthand"
    url: /blog/2022/100daysof-day62/
  - title: "Day 69: width in container queries"
    url: /blog/2022/100daysof-day69/
  - title: "Day 73: size container features"
    url: /blog/2023/100daysof-day73/
  - title: "Day 78: container query units"
    url: /blog/2023/100daysof-day78/
  - title: "Day 90: scoped styles in container queries"
    url: /blog/2023/100daysof-day90/
---
If you use `em` in a media query, the font-size of the `<body>`, `<html>`, or any other element on the page doesn't matter. That's because relative length units in media queries are based on the _initial value_, which means that units are never based on results of declarations. `em` in a media query is relative to the font-size, defined by the user agent or the user’s preferences.

```css
/* 
  The font size of both <body> and <html> is 40px,
  the media query doesn't fire at 2560px (40 * 64),
  but at 1024px (16 * 64) (assuming that the base 
  font size in the browser is 16px).
*/

html, body {
  font-size: 40px;
}

@media (min-width: 64em) {
  body {
    background: aqua;
  }
}
```

With container queries that's different. Relative length units are evaluated based on the _computed values_ of the query container.

The container query in the following example fires at `512px` (32 * 16 = 512) because the font size of the container is `16px`.

```css
section {
  font-size: 16px;
  container: wrapper / inline-size; 
}

.card {
  background-color: yellow;
}

@container wrapper (min-width: 32em) {
  .card {
    background-color: hotpink;
  }
}
```

<style>
  [data-sample] section {
    width: 50%;
    container-type: inline-size;
    outline: 10px solid;
    resize: horizontal;
    overflow: auto;
    font-size: 16px;
  }

  [data-sample] .large {
    font-size: 26px;
  }

  [data-sample] .card {
    background-color: yellow;
    border: 5px solid;
    padding: 1rem;
    margin: 1rem;
  }

  [data-sample] h2 {
     margin: 1rem;
  }

  [data-sample] .card h2 {
    background: none;
  }


  @container (min-width: 32em) {
    [data-sample] .card {
      background-color: hotpink;
    }
  }
</style>


```html
<section>
  <h2>Latest news</h2>
  
  <div class="card">
    <h2>Hey, I'm a card!</h2>
  </div>
</section>
```

You can grab and resize the `<section>` by clicking and dragging it in the bottom right corner.

<div data-sample="demo">
<section>
<h2>Latest news</h2>

<div class="card">
<h2>Hey, I'm a card!</h2>
</div>
</section>
</div>

If you change the font size of the container to `26px`, the media query fires at `832px` (32 * 26 = 832)

```css
.large {
  font-size: 26px;
}
```

```html
<section class="large">
  <h2>Latest news</h2>
  
  <div class="card">
    <h2>Hey, I'm a card!</h2>
  </div>
</section>
```

<div data-sample="demo">
<section class="large">
<h2>Latest news</h2>

<div class="card">
<h2>Hey, I'm a card!</h2>
</div>
</section>
</div>