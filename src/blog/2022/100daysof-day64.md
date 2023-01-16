---
title: 'Day 64: the revert-layer keyword'
date: 2022-12-22T09:38:54.969Z
image: articles/sm_100days-day64.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "With cascade layers comes a new CSS-wide property value, `revert-layer`."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/ExpaQzQ
layout: "layouts/100days.njk"
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
  - title: "Day 52: multiple layer lists"
    url: /blog/2022/100daysof-day52/
  - title: "Day 55: anonymous layers"
    url: /blog/2022/100daysof-day55/
  - title: "Day 58: ordering nested layers"
    url: /blog/2022/100daysof-day58/
  - title: "Day 63: explicit defaulting with inherit, initial, unset, and revert"
    url: /blog/2022/100daysof-day63/
  - title: "Day 68: cascade layers and browser support"
    url: /blog/2022/100daysof-day68/
  - title: "Day 74: using !important in cascade layers"
    url: /blog/2023/100daysof-day74
---
You can use the `revert-layer` keyword to roll back the cascade to a value defined in a previous layer.

In the following example, the `base` layer defines a black color for the border. The theme layer sets the border color to `fuchsia`. In a `print` media query within the `theme` layer we revert the style back to the color in the `base` layer.


<style>
  @layer base {
    [data-sample] h2 {
      --border-color: #000;
      
      border: 4px solid var(--border-color);
    }
  }

  @layer theme {
    [data-sample] h2 {
      --border-color: fuchsia;
    }
    
    @media print {
      [data-sample] h2 {
      --border-color: revert-layer;
      }
    }
  }
</style>


```css
@layer base {
  h2 {
    --border-color: #000;
    
    border: 4px solid var(--border-color);
  }
}

@layer theme {
  h2 {
    --border-color: fuchsia;
  }
  
  @media print {
    h2 {
     --border-color: revert-layer;
    }
  }
}
```

```html
<h2>Sretan Božić!</h2>
```

<div data-sample="demo">

<h2>Sretan Božić!</h2>

</div>

If you try to print this page, you will see that the `border-color` of the `<h2>` is `#000`.

<button onclick="print()">Preview print stylesheet</button>