---
title: 'Day 74: using !important in cascade layers'
date: 2023-01-05T09:38:54.969Z
image: articles/sm_100days-day74.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "In order to understand how `!important` works in cascade layers, you have to understand how `!important` works generally. The conclusion of this post might not be what you expect."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/xxJEPvg
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
  - title: "Day 64: the revert-layer keyword"
    url: /blog/2022/100daysof-day64/
  - title: "Day 68: cascade layers and browser support"
    url: /blog/2022/100daysof-day68/
---

<style>
  .sample1 h1 {
    color: green;
  }

  .sample1 h1 {
    color: red;
  }

  .sample2 h1 {
    color: green !important;
  }

  .sample2 h1 {
    color: red;
  }

  @layer base {
    .sample3 h1 {
      color: green;
    }
  }

  @layer components {
    .sample3 h1 {
      color: red;
    }
  }

  .sample4 h1 {
    color: blue;
  }

  @layer base {
    .sample4 h1 {
      color: green;
    }
  }

  @layer components {
    .sample4 h1 {
      color: red;
    }
  }

  .sample5 h1 {
    color: blue;
  }

  @layer base {
    .sample5 h1 {
      color: green !important;
    }
  }

  @layer components {
    .sample5 h1 {
      color: red;
    }
  }

  .sample6 h1 {
    color: blue;
  }

  @layer base {
    .sample6 h1 {
      color: green !important;
    }
  }

  @layer components {
    .sample6 h1 {
      color: red !important;
    }
  }

  .sample7 h1 {
    color: blue !important;
  }

  @layer base {
    .sample7 h1 {
      color: green !important;
    }
  }

  @layer components {
    .sample7 h1 {
      color: red !important;
    }
  }
</style>

## The basics

Let's start nice and easy. We have two declarations with the same specificity. The second one wins because it comes later in the document.


```css
h1 {
  color: green;
}

h1 {
  color: red;
}
```

<div data-sample="demo 1" class="sample1">
  <h1>I'm red</h1>
</div>

Adding `!important` to the first declaration increases its specificity, turning the color green.

```css
h1 {
  color: green !important;
}

h1 {
  color: red;
}
```

<div data-sample="demo 2" class="sample2">
  <h1>I'm green</h1>
</div>

So far, so good. I assume that most of you already knew that. Now let’s have a look at cascade layers and what happens if we use `!important` in layers.

## Layers

We have two layers, each with a declaration with the same specificity. The second declaration wins because it’s in a layer defined later in the document.

```css
@layer base {
  h1 {
    color: green;
  }
}

@layer components {
  h1 {
    color: red;
  }
}
```

<div data-sample="demo 3" class="sample3">
  <h1>I'm red</h1>
</div>

If we add un-layered styles, the color turns blue because un-layered styles have precedence over layered styles.

```css
h1 {
  color: blue;
}

@layer base {
  h1 {
    color: green;
  }
}

@layer components {
  h1 {
    color: red;
  }
}
```

<div data-sample="demo 4" class="sample4">
  <h1>I'm blue</h1>
</div>

If we add `!important` to the declaration in the base layer, the color turns green.

```css
h1 {
  color: blue;
}

@layer base {
  h1 {
    color: green !important;
  }
}

@layer components {
  h1 {
    color: red;
  }
}
```

<div data-sample="demo 5" class="sample5">
  <h1>I'm green</h1>
</div>

Okay, I have to stop here for a moment. All this makes sense to me. Here’s what I thought happens before I wrote this blog post:

By default, our order of precedence is like this:

1. Un-layered styles (most important)
1. components layer
1. base layer (least important)

Demo 3 and 4 confirm that.

If we add `!important` to the declaration in the base layer, our order looks like this:

1. !important base layer (most important)
1. Un-layered styles
1. components layer
1. base layer (least important)

Demo 5 confirms that.

If I keep extending my logic, this would mean that if we add `!important `to the components layer, the order looks like this:

1. !important components layer (most important)
1. !important base layer
1. Un-layered styles
1. components layer 
1. base layer(least important)

Let’s try!


```css
h1 {
  color: blue;
}

@layer base {
  h1 {
    color: green !important;
  }
}

@layer components {
  h1 {
    color: red !important;
  }
}
```

<div data-sample="demo 6" class="sample6">
  <h1>I'm green</h1>
</div>

Nooope, not red, still green. To explain why, let's have a look at the spec.

<blockquote>“CSS attempts to create a balance of power between author and user style sheets. By default, rules in an author’s style sheet override those in a user’s style sheet, which override those in the user-agent’s default style sheet. To balance this, a declaration can be marked important, which increases its weight in the cascade and <strong>inverts the order of precedence</strong>” <em>(emphasis mine)</em>.</blockquote>

[CSS Cascading and Inheritance Level 3](https://www.w3.org/TR/css-cascade-3/#importance)

This means that `!important` doesn't just increase the weight of a declaration in the cascade, but it inverts the order of precedence. So, in our first basic example `!important` doesn't just make the first declaration more important, no, it inverts the order of precedence!

```css
h1 {
  color: green !important;
}

h1 {
  color: red;
}
```

If we make the first declaration important, this…

1. h1 color red (most important)
1. h1 color green (least important)

…becomes this:

1. h1 color green (most important)
1. h1 color red (least important)

Before cascade layers, this didn’t really matter, but now, with multiple layers on the author level, understanding this concept is critical. If we apply this logic to our last layer example, we get this:

1. !important base layer (most important)
1. !important components layer
1. !important un-layered styles
1. Un-layered styles
1. components layer 
1. base layer(least important)

So, even if we add `!important` to the un-layered styles, the declaration in the base layer still wins.

```css
h1 {
  color: blue !important;
}

@layer base {
  h1 {
    color: green !important;
  }
}

@layer components {
  h1 {
    color: red !important;
  }
}
```

<div data-sample="demo 7" class="sample7">
  <h1>I'm still green</h1>
</div>


Got it? No? Don't worry. It took me more than an hour to understand it. This video by Una Kravets helped a lot:

<div class="video-wrapper">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dS123IXPcJ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>