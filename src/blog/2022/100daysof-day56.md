---
title: 'Day 56: container queries'
date: 2022-12-12T09:38:54.969Z
image: articles/sm_100days-day56.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use media queries to style elements based on features of the browser viewport, for example, `min-width`, `max-height`, or orientation. With container queries, you can now do the same but with any parent element. Instead of the viewport, you can now listen to properties and features of a containing element."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/VwdOpOw
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Use the Right Container Query Syntax"
    url: https://www.oddbird.net/2022/08/18/cq-syntax/
  - title: "CSS Containment Module Level 3"
    url: https://www.w3.org/TR/css-contain-3/
  - title: "Day 59: naming containers"
    url: /blog/2022/100daysof-day59/
  - title: "Day 62: the container shorthand"
    url: /blog/2022/100daysof-day62/
---

You can query all kinds of things, not just the width, height, or orientation, but for example custom properties, as well. There’s an important difference between size container features (`width`, `height`, `inline-size`, `block-size`, `aspect-ratio`, `orientation`) and style container features (computed values). If you want to query size container features, you have to define a size container explicitly. That’s because they require special size containment in order to function. 

Miriam Suzanne explains it in [Use the Right Container Query Syntax](https://www.oddbird.net/2022/08/18/cq-syntax/) like that:

> Normally, the size of an element would be based on the size of its contents – but if we query that size, and change the contents based on the query, we have an infinite loop. Size containment breaks that loop by ensuring the size of a container is not based on the size of its contents.

You can create a size container using the `container-type` property. There are two options: `inline-size` (establishes size containment on the inline axis) and `size` (establishes size containment on the inline and block axis). There’s no dedicated `block-size` option and we should be careful using `size`, according to Miriam Suzanne. I don’t really understand why yet, but I’ll dig into that in a separate post.

```html
<section>
  <h2>Latest news</h2>
  
  <div class="card">
    <h2>Hey, I'm a card!</h2>
  </div>
</section>
```

```css
/* That's our size container. */
section {
  width: 50%;
  container-type: inline-size;
}

/* Default styles for the card. */
.card {
  background-color: yellow;
  border: 5px solid;
}
```

We can query the container using `@container`.

```css
/* The background-color of the .card 
changes to hotpink once the section
has a min-width of 500px */
@container (min-width: 500px) {
  .card {
    background-color: hotpink;
  }
}

/* For comparison: The border-style
of the .card  changes to dotted once
the viewport has a min-width of 500px */
@media (min-width: 500px) {
  .card {
    border-style: dotted;
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


  @container (min-width: 500px) {
    [data-sample] .card {
      background-color: hotpink;
    }
  }

  @media (min-width: 500px) {
    [data-sample] .card {
      border-style: dotted;
    }
  }
</style>

You grab and resize the `<section>` by clicking and dragging it in the bottom right corner. The background color of the `.card` changes as soon as the width of the parent section hits `500px`.

<div data-sample="demo">
<section>
<h2>Latest news</h2>

<div class="card">
<h2>Hey, I'm a card!</h2>
</div>
</section>
</div>