---
title: 'Day 89: higher-order custom properties'
date: 2023-01-26T09:38:54.969Z
image: articles/sm_100days-day89.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Style queries may change the way we write CSS significantly."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/jOpxRYQ
layout: "layouts/100days.njk"
reading:
  - title: "Motion Path Module Level 1"
    url: https://www.w3.org/TR/motion-1/
  - title: "Fun with CSS Motion Path"
    url: https://css-irl.info/fun-with-css-motion-path/
  - title: "Create a Responsive CSS Motion Path? Sure We Can!"
    url: https://css-tricks.com/create-a-responsive-css-motion-path-sure-we-can/
  - title: "Method Draw Vector Editor"
    url: https://editor.method.ac/
---

<div class="highlight">

**Caution:** If you’re a fan of Tailwind or similar utility frameworks, you might find this post offensive because it suggests using fewer classes instead of more.

</div>

On [day 80](/blog/2023/100daysof-day80/) I’ve introduced you to container style queries. I’ve showed you a practical example from a project I was working on where style queries would’ve been really useful: When the following component has a dark background color, I set a light text color on all children.

```html
<div class="card">
  <h2>light</h2>
</div>

<div class="card" style="--bg: var(--dark)">
  <h2>dark</h2>
</div>
```

```css
:root {
  --dark: #000;
  --light: aqua;
}

.card {
  --bg: var(--light);

  background-color: var(--bg);
  color: #000;
}

@container style(--bg: var(--dark)) {
  * {
    color: #fff;
  }
}
```

Yeah, I know, not the best example in the world, but you get the point.

What’s even more interesting than querying custom properties, we’ve applied to a property of a container, is querying custom properties whose sole purpose it is to tell us something about the container. Doesn’t make sense? Okay, here’s an example.

Let's say we have a basic card component. 

<style>
  .card-wrapper {
    --width: 20rem;
    --direction: column;
    
    border: 2px solid #000;
    display: flex;
    flex-direction: var(--direction);
    max-width: var(--width);    
    width: 100%;
  }

  .card-image {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  .card-image img {
    height: 100%;
    min-width: 0;
    order: 1;
    object-fit: cover;
    width: 100%;
    border: none;
  }

  .card-content {
    order: 2;
    padding: 1rem;
  }


@container style(--card-size: large) {
  .card-wrapper {
    --width: 30rem;
  }
  
  h2 {
    font-size: 2rem;
  }
}

@container style(--card-style: vertical) {
  .card-wrapper {
    --width: 40rem;
    --direction: row;
    gap: 1rem;
  }
  
  h2 {
    margin-top: 0.5em;
  }
  
  .card-image {
    aspect-ratio: 1;
  }
}
</style>


<div class="card" style="display: block">
<div class="card-wrapper">
  <div class="card-content">
<h2>My title</h2>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non id sint pariatur excepturi delectus, quas saepe, adipisci nemo, beatae quo minima molestiae mollitia expedita assumenda doloremque.</p>
</div>

<div class="card-image">
<img src="https://assets.codepen.io/144736/neue-donau+%281%29.webp" alt="" />
</div>
</div>
</div>

If I want a larger variation of this component, I do this:

```html
<div class="card" style="--card-size: large">
  …
</div>
```

You can also create a separate class, if you're not a fan of inline styles.

```css
.card-large {
  --card-size: large;
}
```

```html
<div class="card card-large">
  …
</div>
```


<style>
  .card {
    display: none;
  }
  @container style(--supports: style-queries) {
    .card {
      display: block;
    }
    .card-screenshot {
      display: none;
    }
  }
</style>

<div style="--supports: style-queries">

<div class="card" style="--card-size: large">
<div class="card-wrapper">
  <div class="card-content">
<h2>My title</h2>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non id sint pariatur excepturi delectus, quas saepe, adipisci nemo, beatae quo minima molestiae mollitia expedita assumenda doloremque.</p>
</div>

<div class="card-image">
<img src="https://assets.codepen.io/144736/neue-donau+%281%29.webp" alt="" />
</div>
</div>
</div>

<img src="/images/100days-89-1.jpg" width="480" height="499" class="card-screenshot" alt="Same component but larger and larger text">

</div>


<div class="highlight">

**Note:** Container style queries are still only supported in Chrome behind a flag.

</div>


Or if I want a vertical layout for the large card, I do this:


```html
<div class="card" style="--card-size: large; --card-style: vertical">
  …
</div>
```



<div style="--supports: style-queries">


<div class="card" style="--card-size: large; --card-style: vertical">
<div class="card-wrapper">
  <div class="card-content">
<h2>My title</h2>

<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non id sint pariatur excepturi delectus, quas saepe, adipisci nemo, beatae quo minima molestiae mollitia expedita assumenda doloremque. Magni nesciunt animi recusandae.</p>
</div>

<div class="card-image">
<img src="https://assets.codepen.io/144736/neue-donau+%281%29.webp" alt="" />
</div>
</div>
</div>

<img src="/images/100days-89-2.jpg" width="640" height="296" class="card-screenshot" alt="Same component but larger, larger text, and a vertical layout.">

</div>

Here are the style queries that make this possible: 

```css

@container style(--card-size: large) {
  .card-wrapper {
    --width: 30rem;
  }
  
  h2 {
    font-size: 2rem;
  }
}

@container style(--card-style: vertical) {
  .card-wrapper {
    --width: 40rem;
    --direction: row;
    gap: 1rem;
  }
  
  h2 {
    margin-top: 0.5em;
  }
  
  .card-image {
    aspect-ratio: 1;
  }
}
```

Okay, cool, but can't we just use a class for that? Yes, but…

* Instead of applying conditional styling using a class, we can now do something we've been used to doing for a while already: adding conditions through queries. It's just style queries instead of media queries.
* We don't need modifier classes anymore. The style query already scopes the styles in that block to a specific condition.
* We can create variations of elements that don't have or don't need classes.
  ```html
  <blockquote style="--type: pull-quote">
  </blockquote>
  ```
* custom properties are inhertiable, which means that we can control the styling of all cards within an element by setting the property on the parent element.
  ```html
  <section style="--card-size: large">
    <div class="card">…</div>
    <div class="card">…</div>
    <div class="card">…</div>
  </section>
  ```

  or even 

  ```html
  <body style="--card-size: large">
    <div class="card">…</div>
    <div class="card">…</div>
    <div class="card">…</div>
  </body>
  ```

Container style queries are so brand new they aren’t even there yet. I can’t wait for browsers to support them to see if and how they will change the way we write CSS. 