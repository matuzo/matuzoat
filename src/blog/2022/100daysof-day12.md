---
title: 'Day 12: max() trickery'
date: 2022-10-11T09:38:54.969Z
image: articles/sm_100days-day12.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "I saw this interesting one-liner in a demo by [Temani Afif](https://twitter.com/ChallengesCss)."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/xxjPzyE
layout: "layouts/100days.njk"
---
```css
.wrapper {
  margin-inline: max(0px, ((100% - 64rem) / 2)); 
}
```

It’s basically a shorter way of writing this:

```css
.wrapper {
  max-width: 64rem;
  margin: 0 auto;
  width: 100%;
}
```



It’s not up to me to decide whether it’s smart to use this in production or not, but I want to break it down to fully understand what’s going on.

Let’s work our way from the inside out.

```css
(100% - 64rem)
````

This takes the available width and subtracts the maximum width of the wrapper. What’s left is the remaining space.

```css
((100% - 64rem) / 2)
````

We take the remaining space and divide it by 2. We have to divide it because we want to use it for the left and right margin of the wrapper.

```css
max(0px, ((100% - 64rem) / 2));
````

If 100% is less than 64rem, we would get a negative number, which would break the layout. The [max() function](/blog/2022/100daysof-day5/) ensures that the `margin` is always at least zero. It takes a comma separated list of expressions. The largest value in the list will be selected. If the value of our calculation is less than 0, `max()` takes 0 instead because it’s larger than the negative number.

```css
margin-inline: max(0px, ((100% - 64rem) / 2));
```

[margin-inline](/blog/2022/100daysof-day3/) sets both the left and the right margin to either 0 or our calculated value, which centers the element.
