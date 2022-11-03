---
title: 'Day 33: :is() or :where()'
date: 2022-11-10T09:38:54.969Z
image: articles/sm_100days-day33.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Thoughts on when it’s better to use `:is()` over `:where()` and vice versa."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/xxzZrvR
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "CSS Logical Properties and Values (MDN)"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties
draft: true
---
The other day I posted this code snippet on social media and asked people whether they thought it was readable.

```css
summary:where(:hover, :focus)::after {
  transform: rotate(180deg);
}
```

Some people responded they prefer `:is()` over `:where()` because it’s shorter or less typing. Others said they liked `:where()` better because grammatically it made more sense to them or because it just sounded better. 

These sound like valid reasons to pick one over the other, but they shouldn’t be (the main) reasons. As we already know, there is an important [difference between :is() and :where()](/blog/2022/100daysof-day14/). The specificity of `:where()` is always 0, while `:is()` takes on the specificity of the most specific selector in its arguments.

I thought that was clear to me, but a brief discussion following my initial question made me realize that I need to put a bit more thinking into the topic. Kilian asked me whether I find myself defaulting to `:is()` or `:where()`, and I responded “:where() because I like to keep the specificity curve as flat as possible”. Then Šime responded “But `summary:hover` *should* have a higher specificity than `summary`. That’s a good thing.”, and he's right!

## The case for `:is()`

In the following example, I'm defining that the background color of the `summary` should be blue and change to red on hover and focus. 

```css
summary:hover,
summary:focus {
  background-color: red;
}

summary {
  background-color: blue;
}
```

You can see that the declaration for the default state of the element comes later in the document, but it doesn't overwrite the styles for the hover and focus states because its specificity is lower. I guess we can agree that it would make more sense to write it the other way around, but it's a good thing that it still works that way. The `:hover` and `:focus` pseudo-classes make the selector more specific, because it's their job to define styles for a specific scenario.

<style>
  summary {
    color: #fff;
    padding: 0.3rem;
  }

  .default summary:hover,
  .default summary:focus {
    background-color: red;
  }

  .default summary {
    background-color: blue;
  }

  .where summary:where(:hover, :focus) {
    background-color: red;
  }

  .where summary {
    background-color: blue;
  }

  .is summary:is(:hover, :focus) {
    background-color: red;
  }

  .is summary {
    background-color: blue;
  }
</style>

<details class="default">
  <summary>Show more info</summary>
  <p>Here's the info</p>
</details>

Now, let’s do the same using :where().

```css
summary:where(:hover, :focus) {
  background-color: red;
}

summary {
  background-color: blue;
}
```

<details class="where">
  <summary>Show more info</summary>
  <p>Here's the info</p>
</details>


Now the background color is always blue because the specificity of the first and second selector is the same and the second selector, which comes later in the document, overwrites the styles of the first selector.

`:where()` nulls the specificity of its selectors. While it’s a good practice to keep specificity low, sometimes we need higher specific to assure that certain rules will be applied.  
This is an example where we want to maintain the specificity of the selectors, and we can do that by using `:is()`. 

```css
summary:is(:hover, :focus) {
  background-color: red;
}

summary {
  background-color: blue;
}
```

<details class="is">
  <summary>Show more info</summary>
  <p>Here's the info</p>
</details>

## The case for `:where()`

<style>
  .default input[type="text"],
  .default input[type="email"],
  .default input[type="url"] {
    background-color: #efefef;
    border: 2px solid;
  }

  .default [aria-invalid="true"] {
    border-color: red;
  }

  .where input:where(
  [type="text"], 
  [type="email"], 
  [type="url"]) {
    background-color: #efefef;
    border: 2px solid;
  }

  .where [aria-invalid="true"] {
    border-color: red;
  }
</style>

Sometimes we need selectors with higher specificity to improve readability and comprehensibility, or to limit the elements styles will be applied to.

For example, in your base styles you might have something like this.

```css
input[type="text"],
input[type="email"],
input[type="url"] {
  background-color: #efefef;
  border: 2px solid;
}
```

```html
<label for="name">name</label>
<input type="text" id="name">
```
<div class="default">
<label for="name">Name</label><br>
<input type="text" id="name">
</div>

Now, let's say you want to change the border color when the data provided by the user is invalid.

```css
[aria-invalid="true"] {
  border-color: red;
}
```

```html
<label for="name">name</label>
<input type="text" id="name" aria-invalid="true">
```
<div class="default">
<label for="name">name</label>
<input type="text" id="name" aria-invalid="true">
</div>

The color of the border doesn't change because `input[type="text"]` is more specific than `[aria-invalid="true"]`. We don't need `input[type="text"]` to be that specific, but the combination of tag and attribute selector makes it easier for us to understand what's going on and it rules out other elements which potentially might have a `type` attribute with these values.

We can use `:where()` to lower the specific of the selector.

```css
input:where(
  [type="text"], 
  [type="email"], 
  [type="url"]) {
  background-color: #efefef;
  border: 2px solid;
}

[aria-invalid="true"] {
  border-color: red;
}
```

<div class="where">
  <label for="name">name</label>
  <input type="text" id="name" aria-invalid="true">
</div>

Deciding whether to use `:is()` or `:where()` is not a matter of personal preference, it’s a matter of specificity. Use `:is()` to maintain or increase it and `:where()` to lower it.