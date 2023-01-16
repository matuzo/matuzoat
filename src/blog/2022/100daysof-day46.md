---
title: 'Day 46: ordering layers'
date: 2022-11-28T09:38:54.969Z
image: articles/sm_100days-day46.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "By default, cascade layers are stacked in the order they are defined, but you don’t have to rely on it. You can determine the order in one place."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/vYrrwNO
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 37: cascade layers"
    url: /blog/2022/100daysof-day37/
  - title: "Day 40: unlayered styles"
    url: /blog/2022/100daysof-day40/
  - title: "Day 43: grouping layers"
    url: /blog/2022/100daysof-day43/
  - title: "Day 49: layering entire style sheets"
    url: /blog/2022/100daysof-day49/
  - title: "Day 52: multiple layer lists"
    url: /blog/2022/100daysof-day52/
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
In the following example, the border color of the paragraph is first red, then blue, then rebeccapurple, and finally green. 


```css
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
@layer base {
  .demo1 p {
    border: 10px solid red;
  }
}

@layer framework {
  .demo1 p {
    border-color: blue;
  }
}

@layer components {
  .demo1 p {
    border-color: rebeccapurple;
  }
}

@layer theme {
  .demo1 p {
    border-color: green;
  }
}

.demo3 p {
  border-color: hotpink;
}

@layer base1, components1, theme1, framework1;

@layer base1 {
  .demo3 p,
  .demo2 p {
    border: 10px solid red;
  }
}

@layer framework1 {
  .demo3 p,
  .demo2 p {
    border-color: blue;
  }
}

@layer components1 {
  .demo3 p,
  .demo2 p {
    border-color: rebeccapurple;
  }
}

@layer theme1 {
  .demo3 p,
  .demo2 p {
    border-color: green;
  }
}
</style>

<div data-sample="demo" class="sample demo1">
<p>
Bartender, I got me a bet for you. I'm gonna bet you $300 that I can piss into that glass over there and not spill a single, solitary drop.
</p>
</div>

You can change that order by defining layers first in a comma-separated list, starting with `@layer`.

```css
@layer base, components, theme, framework;

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

<div data-sample="demo" class="sample demo2">
<p>
Bartender, I got me a bet for you. I'm gonna bet you $300 that I can piss into that glass over there and not spill a single, solitary drop.
</p>
</div>

The order of appearance of the `@layer` blocks doesn't matter any more, the order in the `@layer` list does. The border color of the paragraph is now first red, then rebeccapurple, then green, and finally blue.

Oh, and of course, if you add [unlayered styles](/blog/2022/100daysof-day40/), those still win.


```css
p {
  border-color: hotpink;
}

@layer base, components, theme, framework;

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

<div data-sample="demo" class="sample demo3">
<p>
Bartender, I got me a bet for you. I'm gonna bet you $300 that I can piss into that glass over there and not spill a single, solitary drop.
</p>
</div>
