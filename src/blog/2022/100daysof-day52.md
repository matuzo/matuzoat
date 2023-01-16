---
title: 'Day 52: declaring multiple layer lists'
date: 2022-12-06T09:38:54.969Z
image: articles/sm_100days-day52.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "On [day 46](/blog/2022/100daysof-day46/), I’ve explained how you can order layers by defining them in a comma-separated list first. The first layer in the list has the lowest priority and the last layer the highest."
description: "On day 46, I’ve explained how you can order layers by defining them in a comma-separated list first. The first layer in the list has the lowest priority and the last layer the highest. You can create as many lists as so you want, but there's an important thing to consider. "
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/yLEZzwO
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 37: cascade layers"
    url: /blog/2022/100daysof-day37/
  - title: "Day 40: unlayered styles"
    url: /blog/2022/100daysof-day40/
  - title: "Day 43: grouping layers"
    url: /blog/2022/100daysof-day43/
  - title: "Day 46: ordering layers"
    url: /blog/2022/100daysof-day46/
  - title: "Day 49: layering entire style sheets"
    url: /blog/2022/100daysof-day49/
  - title: "Day 55: anonymous layers"
    url: /blog/2022/100daysof-day55/
  - title: "Day 58: ordering nested layers"
    url: /blog/2022/100daysof-day58/
  - title: "Day 64: the revert-layer keyword"
    url: /blog/2022/100daysof-day64/
  - title: "Day 68: cascade layers and browser support"
    url: /blog/2022/100daysof-day68/
  - title: "Day 74: using !important in cascade layers"
    url: /blog/2023/100daysof-day74
  - title: "A Complete Guide to CSS Cascade Layers"
    url: https://css-tricks.com/css-cascade-layers/
---

```css
@layer base, components, theme, framework;
```

You can create as many lists as so you want, but the important thing to remember is that layers are stacked based on the order in which they first appear. If you define one layer in multiple lists, only the first appearance of that layer matters.

```css
@layer base, components, theme;
@layer framework, base, components;

@layer base {
  p {
    border: 10px solid red;
  }
}

@layer framework {
  p {
    border-color: blue;
  }
}

@layer components {
  p {
    border-color: rebeccapurple;
  }
}

@layer theme {
  p {
    border-color: green;
  }
}
```

<style>
@layer base, components, theme;
@layer framework, components, base;

@layer base {
  [data-sample] p {
    border: 10px solid red;
  }
}

@layer framework {
  [data-sample] p {
    border-color: blue;
  }
}

@layer components {
  [data-sample] p {
    border-color: rebeccapurple;
  }
}

@layer theme {
  [data-sample] p {
    border-color: green;
  }
}
</style>

Although `components` is the last layer in the last list and therefore should have the highest priority, the color of the border is blue, as defined in the `framework` layer. That’s because base and components have already been defined earlier. 

@layer base, components, theme;<br>
@layer framework, <s>base</s>, <s>components</s>;

<div data-sample="demo" class="sample demo1">
<p>
Bartender, I got me a bet for you. I'm gonna bet you $300 that I can piss into that glass over there and not spill a single, solitary drop.
</p>
</div>
