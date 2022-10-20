---
title: 'Day 19: the placeholder-shown pseudo-class'
date: 2022-10-20T09:38:54.969Z
image: articles/sm_100days-day19.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You can use the `:placeholder-shown` pseudo-class to select input fields with a placeholder that haven't been filled out yet.
"
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/YzLdELj
layout: "layouts/100days.njk"
caniuse: ":placeholder-shown"
reading:
  - title: "placeholder-shown on MDN"
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/:placeholder-shown
---
```css
input:placeholder-shown {
  outline: 5px solid blue;
}
```

```html
<p>
  <label for="name">Name</label>
  <input type="text" id="name" placeholder="your name…" value="Johanna">
</p>

<p>
  <label for="email">E-Mail</label>
  <input type="email" id="email" placeholder="name@domain.com">
</p>
```

<style>
  input:placeholder-shown {
    outline: 5px solid blue;
  }
</style>

<p>
  <label for="name">Name</label>
  <input type="text" id="name" placeholder="your name…" value="Johanna">
</p>

<p>
  <label for="email">E-Mail</label>
  <input type="email" id="email" placeholder="name@domain.com">
</p>


PS: Yeah, I know, that one has been around for quite a while already, but I started writing CSS 15 years ago. So anything that was published after 2015 is modern CSS for me. :)