---
title: 'Day 29: !important custom properties'
date: 2022-11-03T09:38:54.969Z
image: articles/sm_100days-day29.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Using `!important` with custom properties might not work as you expect."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/oNyNOGr
layout: "layouts/100days.njk"
reading:
  - title: "What no one told you about CSS Variables "
    url: https://dev.to/afif/what-no-one-told-you-about-css-variables-553o#1-be-careful-with-raw-important-endraw-
---
If you look at the following example, which color does the text have?

<style>
  .example1 {
    --color: red;
    
    color: var(--color) !important;
    color: blue;
  }

  .example2 {
    --color: red !important;

    color: var(--color);
    color: blue;
  }

  .example3 {
    --color: red;
    --color: blue;

    color: var(--color);
  }

  .example4 {
    --color: red !important;
    --color: blue;

    color: var(--color);
  }

  .example5 {
    --color: red !important;
    --color: blue;

    color: var(--color);
    color: blue;
  }
</style>

```css
.example1 {
  --color: red;
  
  color: var(--color) !important;
  color: blue;
}
```

<details>
  <summary>Show .example1</summary>
  <div class="example1">I'm red!</div>
</details>

Makes sense! By using `!important` we make the first color declaration more important than the second one.

Now, what about this? Which color does the text have now?

```css
.example2 {
  --color: red !important;

  color: var(--color);
  color: blue;
}
```

<details>
  <summary>Show .example2</summary>
  <div class="example2">I'm blue!</div>
</details>

In order to understand that, we have to look at the spec. There it says:

> Custom properties can contain a trailing !important, but this is automatically removed from the property’s value by the CSS parser,…

Aha! It's okay to use it, but it will be removed from the value by the parser, and since it's removed, the second color declaration overwrites the first one.  

Why can we use it, if the CSS parser removes it anyway? Well, because the sentence continues:

> …and makes the custom property "important" in the CSS cascade.

Custom properties are just like ordinary properties in CSS part of the cascade and they follow its rules. If you take the following example, which color does the text have?


```css
.example3 {
  --color: red;
  --color: blue;

  color: var(--color);
}
```

<details>
  <summary>Show .example3</summary>
  <div class="example3">I'm blue!</div>
</details>

Why? Because declarations defined later in the document overwrite those defined earlier, if they have the same specificity. This applies to custom properties just like it does to ordinary properties.

We can change the specificity in CSS by using different selectors or by making a property `!important`.  
With that in mind, can you guess which color the text has in the following example?

```css
.example4 {
  --color: red !important;
  --color: blue;

  color: var(--color);
}
```

<details>
  <summary>Show .example4</summary>
  <div class="example4">I'm red!</div>
</details>

I'm sure you got that one right! One last example, to conclude this topic. Which color does the text have?

```css
.example5 {
  --color: red !important;
  --color: blue;

  color: var(--color);
  color: blue;
}
```

<details>
  <summary>Show .example5</summary>
  <div class="example5">I'm blue!</div>
</details>

This post is based on a chapter in an [article written bei Temani Afif](https://dev.to/afif/what-no-one-told-you-about-css-variables-553o).