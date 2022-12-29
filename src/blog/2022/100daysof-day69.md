---
title: 'Day 69: width in container queries'
date: 2022-12-29T09:38:54.969Z
image: articles/sm_100days-day69.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "In a media query, it’s obvious what _width_ means. It always refers to the width of the viewport. With size container queries it’s not that obvious."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/xxJZydb
layout: "layouts/100days.njk"
reading:
  - title: "Day 59: naming containers"
    url: /blog/2022/100daysof-day59/
  - title: "Day 62: the container shorthand"
    url: /blog/2022/100daysof-day62/
---
```css
/* Kicks in when the viewport has a minimum width of 500px */
@media (min-width: 500px) {
  body {
    background-color: hotpink;
  }
}
```

`width` in a size container query queries the width of the container's content box. Let me illustrate what that means with an example.


The `<section>` is the container and the `.card` changes background color when the container has a minimum width of 500px.
```html
<section>
  <h2>Latest news</h2>
  
  <div class="card">
    <h2>Hey, I'm a card!</h2>
  </div>
</section>
```

The `<section>` has an explicit width, padding, and a border. It's `box-sizing` property is set to the default value `content-box`.

```css
section {
  box-sizing: content-box;
  container-type: inline-size;

  width: 500px;
  padding: 20px;
  border: 10px solid;
}

@container (min-width: 500px) {
  .card {
    background-color: hotpink;
  }
}
```

The total width of the container (`<section>`) is 560px (500px `width` + 40px `padding` + 20px `border`). The container query fires when the `width` is at least 500px, not when the total width is 500px. 

<div class="highlight">

You can grab and resize the `<section>` by clicking and dragging it in the bottom right corner. The background color of the `.card` changes as soon as the width of the parent section hits `500px`.

</div>

<style>
  [data-sample] section {
    width: 500px;
    container-type: inline-size;
    border: 10px solid;
    padding: 20px;
    resize: horizontal;
    overflow: auto;
    box-sizing: content-box;
  }

  .sample2 section {
    box-sizing: border-box;

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
</style>

<div data-sample="demo">
<section>
<h2>total width: 560px,<br>content-box: 500px</h2>

<div class="card">
<h2>Hey, I'm a card!</h2>
</div>
</section>
</div>

If you change `box-sizing: content-box;` to `box-sizing: border-box;`, the total width of the container is 500px (440px `width` + 40px `padding` + 20px `border`). The container query still only fires when the `width` is at least 500px.

```css
section {
  box-sizing: border-box;
  container-type: inline-size;

  width: 500px;
  padding: 20px;
  border: 10px solid;
}

@container (min-width: 500px) {
  .card {
    background-color: hotpink;
  }
}
```

<div data-sample="demo" class="sample2">
<section>
<h2>total width: 500px,<br>content-box: 460px</h2>

<div class="card">
<h2>Hey, I'm a card!</h2>
</div>
</section>
</div>

<script>
  const sections = document.querySelectorAll('[data-sample] section');
  const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    entry.target.querySelector('h2').innerHTML = 
      `total width: ${entry.target.getBoundingClientRect().width}px,<br>
        content-box: ${entry.contentRect.width}px`
  }

  console.log('Size changed');
  });

  resizeObserver.observe(sections[0]);
  resizeObserver.observe(sections[1]);
</script>

So, when we talk about width in a size container query, it always refers to the size of the [content-box](https://w3c.github.io/csswg-drafts/css-sizing/#valdef-box-sizing-content-box).