---
title: 'Day 37: cascade layers'
date: 2022-11-15T09:38:54.969Z
image: articles/sm_100days-day37.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Cascade layers introduce a new way of managing specificity in CSS."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/BaVdaJV
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "A Complete Guide to CSS Cascade Layers"
    url: https://css-tricks.com/css-cascade-layers/
  - title: "Cascade Layers: First Contact"
    url: https://www.matuzo.at/blog/2022/cascade-layers/
  - title: "Day 40: Unlayered styles"
    url: https://www.matuzo.at/blog/2022/100daysof-day40/
  - title: "Day 43: grouping layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day43/
  - title: "Day 46: ordering layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day46/
---

Let’s say we’re using a combination of a tag and an attribute selector for styling e-mail input fields. This declaration is part of our base stylesheet and comes early in the stylesheet. Later in the document, we want to use a class to overwrite parts of the base styling:

```css
input[type="text"],
input[type="email"] {
  border-color: hwb(0 0% 0%);
  border-style: solid;
  border-width: 3px;
}

.form-item {
  border-color: hwb(120 0% 40%);
}
```

<style>
  .demo label {
    display: block;
  }

  .default input[type="text"],
  .default input[type="email"] {
    border-color: hwb(0 0% 0%);
    border-style: solid;
    border-width: 3px;
  }

  .default .form-item {
    border-color: hwb(120 0% 40%);
  }

  @layer base {
    .cascade input[type="text"],
    .cascade input[type="email"] {
      border-color: hwb(0 0% 0%);
      border-style: solid;
      border-width: 3px;
    }
  }

  @layer component {
    .cascade .form-item {
      border-color: hwb(120 0% 40%);
    }
  }
</style>

<div class="demo default">
  <label for="email">E-mail</label>
  <input id="email" type="email" class="form-item">
</div>

This won’t work because `input[type="email"]` is more specific than `.form-item `.  
There are several ways to work around that.

## Using !important

We could use `!important`, but we all know that this probably isn’t the best idea in the long term.

```css
input[type="text"],
input[type="email"] {
  border-color:hwb(0 0% 0%);
  border-style: solid;
  border-width: 3px;
}

.form-item {
  border-color: hwb(120 0% 40%) !important;
}
```

## Increasing selector specificity

We could increase the specificity of the second selector.

```css
input[type="text"],
input[type="email"] {
  border-color:hwb(0 0% 0%);
  border-style: solid;
  border-width: 3px;
}

.form-item.form-item {
  border-color: hwb(120 0% 40%);
}
```

This works, but isn't the most beautiful solution either.

## Decreasing selector specificity

We could decrease the specificity of the first selector.

```css
input:where([type="text"], [type="email"]) {
  border-color:hwb(0 0% 0%);
  border-style: solid;
  border-width: 3px;
}

.form-item {
  border-color: hwb(120 0% 40%);
}
```

Using `:where()` to decrease specificity is a nice solution, and it works great if you only have a handful of selectors, but if you have a group of different selectors that you want on the same level in terms of specificity, there’s a more convenient way to do that.

## Cascade layers

<p>Cascade layers give us more control over the cascade. Using the <code>@layer</code> at-rule we can establish our own layers of the cascade. The rules of specificity we already know still apply within each layer, but there are no conflicts between rules in different layers because rules in a layer with higher priority always<span aria-describedby="not-always">*</span> win over rules in a layer with lower priority no matter how specific selectors are.</p>

<p id="not-always">*Okay, not always, but we'll talk about that in another post.</span>

```css
@layer base {
  input[type="text"],
  input[type="email"] {
    border-color:hwb(0 0% 0%);
    border-style: solid;
    border-width: 3px;
  }
}

@layer component {
  .form-item {
    border-color: hwb(120 0% 40%);
  }
}
```

<div class="demo cascade">
  <label for="email2">E-mail</label>
  <input id="email2" type="email" class="form-item">
</div>

The specificity of `.form-item` is still lower than the specificity of `input[type="email"]`, but `.form-item` is in the component layer, which comes later in the document and thus overwrites styles in the base layer.

There’s a lot more to say about cascade layers, but I’ll save that for later. :)