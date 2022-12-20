---
title: 'Day 59: naming containers'
date: 2022-12-15T09:38:54.969Z
image: articles/sm_100days-day59.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "When you add a container query, it will look for the nearest ancestor container, by default. If you have multiple nested containers or if you just want to make sure that your query uses the right container, you can name containers and query them specifically."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/BaVXprV
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Use the Right Container Query Syntax"
    url: https://www.oddbird.net/2022/08/18/cq-syntax/
  - title: "CSS Containment Module Level 3"
    url: https://www.w3.org/TR/css-contain-3/
  - title: "Day 56: container queries"
    url: /blog/2022/100daysof-day56/
  - title: "Day 62: the container shorthand"
    url: /blog/2022/100daysof-day62/
---
Let's say, we have 2 size containers, `.wrapper`  and `<section>`.

```html
<div class="wrapper">
  <section>
    <h2>Latest news</h2>
    
    <div class="card">
      <h2>Hey, I'm a card!</h2>
    </div>
  </section>
</div>
```

```css
/* That's our outer size container. */
.wrapper {
  container-type: inline-size;
}

/* That's our inner size container. */
section {
  width: 50%;
  container-type: inline-size;
}

/* Default styles for the card. */
.card {
  background-color: yellow;
  border: 5px solid;
}

/* Container query */
@container (min-width: 500px) {
  .card {
    background-color: hotpink;
  }
}
```

<style>
  [data-sample] .wrapper {
    container-type: inline-size;
    outline: 10px dashed;
    padding: 20px;
        resize: horizontal;
    overflow: auto;
  }

  [data-sample].sample2 .wrapper {
    container-name: wrapper;
  }

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


@container wrapper (min-width: 500px) {
  .sample2 .card {
    background-color: hotpink;
  }
}
</style>

By default, the container query watches the width of the closest size container, `<section>`. You grab and resize the `<section>` by clicking and dragging it in the bottom right corner. The background color of the `.card` changes as soon as the width of the parent section hits `500px`.

<div data-sample="demo">
<div class="wrapper">
<section>
<h2>Latest news</h2>

<div class="card">
<h2>Hey, I'm a card!</h2>
</div>
</section>
</div>
</div>

By naming the container and using that name in the query, you can target a specific container.

```css
/* That's our outer size container. */
.wrapper {
  container-type: inline-size;
  container-name: wrapper;
}

/* That's our inner size container. */
section {
  container-type: inline-size;
}

/* The query watches the width of the outer size container (.wrapper) */
@container wrapper (min-width: 500px) {
  .card {
    background-color: hotpink;
  }
}
```

You grab and resize the `.wrapper` by clicking and dragging it in the bottom right corner. The background color of the `.card` changes as soon as the width of the `.wrapper` is lower than `500px`.

<div data-sample="demo" class="sample2">
<div class="wrapper">
<section>
<h2>Latest news</h2>

<div class="card">
<h2>Hey, I'm a card!</h2>
</div>
</section>
</div>
</div>