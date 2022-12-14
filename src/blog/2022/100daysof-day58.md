---
title: 'Day 58: ordering nested layers'
date: 2022-12-14T15:01:54.969Z
image: articles/sm_100days-day58.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "On day 43, we've learned how to [group layers](/blog/2022/100daysof-day43/) and on day 46, how to [order them](/blog/2022/100daysof-day43/). In this post, we’ll look into ordering grouped layers."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/abKgxVE
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 37: cascade layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day37/
  - title: "Day 40: unlayered styles"
    url: https://www.matuzo.at/blog/2022/100daysof-day40/
  - title: "Day 43: grouping layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day43/
  - title: "Day 46: ordering layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day46/
  - title: "Day 49: layering entire style sheets"
    url: https://www.matuzo.at/blog/2022/100daysof-day49/
  - title: "Day 52: multiple layer lists"
    url: https://www.matuzo.at/blog/2022/100daysof-day52/
  - title: "Day 55: anonymous layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day55/
  - title: "A Complete Guide to CSS Cascade Layers"
    url: https://css-tricks.com/css-cascade-layers/
---



If we take the following layer, the background color of the `<p>` will be red because the last defined layer has precedence over previously defined layers.

```css
@layer base {
  @layer reset {
    p {
      background-color: #fff;
    }
  }
  
  @layer theme {
    p {
      background-color: aqua;
    }
  }

  @layer defaults {
    p {
      background-color: red;
    }
  }
}
```
<style>
@layer base {
  @layer reset {
    .sample1 p {
      background-color: #fff;
    }
  }
  
  @layer theme {
    .sample1 p {
      background-color: aqua;
    }
  }

  @layer defaults {
    .sample1 p {
      background-color: red;
    }
  }
}

@layer base1 {
  @layer reset, defaults, theme;

  @layer reset {
    .sample2 p {
      background-color: #fff;
    }
  }
  
  @layer theme {
    .sample2 p {
      background-color: aqua;
    }
  }

  @layer defaults {
    .sample2 p {
      background-color: red;
    }
  }
}

@layer reset3, defaults3, theme3;
@layer base3 {
  
  @layer reset3 {
    .sample3 p {
      background-color: #fff;
    }
  }
  
  @layer theme3 {
    .sample3 p {
      background-color: aqua;
    }
  }

  @layer defaults3 {
    .sample3 p {
      background-color: red;
    }
  }
}

@layer base4.reset, base4.defaults, base4.theme;
@layer base4 {
  
  @layer reset {
    .sample4 p {
      background-color: #fff;
    }
  }
  
  @layer theme {
    .sample4 p {
      background-color: aqua;
    }
  }

  @layer defaults {
    .sample4 p {
      background-color: red;
    }
  }
}

@layer base5.reset, component.first, base5.defaults, base5.theme;
@layer base5 {
  @layer reset {
    .sample5 p {
      background-color: #fff;
    }
  }
  
  @layer theme {
    .sample5 p {
      background-color: aqua;
    }
  }

  @layer defaults {
    .sample5 p {
      background-color: red;
    }
  }
}

@layer component {
  @layer first {
    .sample5 p {
      background-color: hotpink;
    }
  }
}
</style>


<div class="sample1" data-sample="demo: the background color is red">
  <p>yo!</p>
</div>

We can change the order by defining the layers within the `base` layer upfront.


```css
@layer base {
  @layer reset, defaults, theme;

  @layer reset {
    p {
      background-color: #fff;
    }
  }
  
  @layer theme {
    p {
      background-color: aqua;
    }
  }

  @layer defaults {
    p {
      background-color: red;
    }
  }
}
```

`reset` has the lowest priority and `theme` the highest.

<div class="sample2" data-sample="demo: the background color is aqua">
  <p>yo!</p>
</div>

If we move the list outside of the base layer, our custom order has no effect because the layers in the list only exist inside the base layer.

```css
@layer reset, defaults, theme;
@layer base {
  @layer reset {
    p {
      background-color: #fff;
    }
  }
  
  @layer theme {
    p {
      background-color: aqua;
    }
  }

  @layer defaults {
    p {
      background-color: red;
    }
  }
}
```

<div class="sample3" data-sample="demo: the background color is red">
  <p>yo!</p>
</div>

If we want to change the order inside a layer from the outside, we can do that by referencing the nested layer on the parent layer, similar to how you would reference a property in a JavaScript object.

```css
@layer base.reset, base.defaults, base.theme;
@layer base {
  @layer reset {
    p {
      background-color: #fff;
    }
  }
  
  @layer theme {
    p {
      background-color: aqua;
    }
  }

  @layer defaults {
    p {
      background-color: red;
    }
  }
}
```

<div class="sample4" data-sample="demo: the background color is aqua">
  <p>yo!</p>
</div>

If we add another parent layer to the mix, you can see how the background color is hotpink even though we’ve added the `component.first` layer early in the list. That’s because top level layers are sorted first, and then the layers within each layer group. The parent layer `component` has precedence over the `base` layer because it comes later in the list.

```css
@layer base.reset, component.first, base.defaults, base.theme;
@layer base {
  @layer reset {
    p {
      background-color: #fff;
    }
  }
  
  @layer theme {
    p {
      background-color: aqua;
    }
  }

  @layer defaults {
    p {
      background-color: red;
    }
  }
}

@layer component {
  @layer first {
    p {
      background-color: hotpink;
    }
  }
}
```

<div class="sample5" data-sample="demo: the background color is hotpink">
  <p>yo!</p>
</div>