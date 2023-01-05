---
title: 'Day 43: grouping layers'
date: 2022-11-23T09:38:54.969Z
image: articles/sm_100days-day43.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Cascade layers can be grouped by nesting layer rules."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/rNKdVVB
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 37: cascade layers"
    url: /blog/2022/100daysof-day37/
  - title: "Day 40: unlayered styles"
    url: /blog/2022/100daysof-day40/
  - title: "Day 46: ordering layers"
    url: /blog/2022/100daysof-day46/
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
    url: /blog/2022/100daysof-day74
  - title: "A Complete Guide to CSS Cascade Layers"
    url: https://css-tricks.com/css-cascade-layers/
---
If you work on a large style sheet, you might want to create cascade layers to group different types of declarations. In order to give your layers even more structure and control, you can also group declarations within layers.

Consider the following example. We have a layer for reset styles, base styles, components, and theming.

```css
@layer reset {
  body {
    margin: 0;
  }
}

@layer base {
  body {
    font-size: 1.6rem;
  }
}

@layer components {
  p {
    border: 1px solid;
  }
}

@layer theme {
  p {
    border-color: red;
  }
}
```

There's nothing wrong with that, but it might make sense to group similar layers. For example, you could group reset and base styles and component and theme styles.

```css
@layer base {
  @layer reset {
    body {
      margin: 0;
    }
  }

  @layer defaults {
    body {
      font-size: 1.6rem;
    }
  }
}

@layer components {
  @layer structure {
    p {
      border: 1px solid;
    }
  }
  
  @layer theme {
    p {
      border-color: red;
    }
  }
}
```

The same rules in terms or prioritization that apply to root layers also apply to nested layers. This adds more complexity to your style sheets, but it also gives you fine-grained control over specificity.

Nesting layer may seem to be overkill, and it probably is for many sites, but it will make more sense once we talk about ordering layers.