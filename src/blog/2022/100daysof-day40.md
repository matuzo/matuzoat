---
title: 'Day 40: Unlayered styles'
date: 2022-11-18T09:38:54.969Z
image: articles/sm_100days-day40.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "On day 37 we learned that we can get [more control over specificity](/blog/2022/100daysof-day37/) by creating layers. That first, simple example is pretty straightforward, but what happens if we mix layered and unlayered styles?"
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/RwJLyxy
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 37: cascade layers"
    url: https://www.matuzo.at/blog/2022/100daysof-day37/
  - title: "A Complete Guide to CSS Cascade Layers"
    url: https://css-tricks.com/css-cascade-layers/
---
Let's start nice and simple with a single layer. The border of this quote is red.

```html
<blockquote>
  There's only one Return, okay, and it ain't of the king...
</blockquote>
```

```css
@layer base {
  blockquote {
    border: 4px solid red;
    padding: 1rem;
  }
}
```

<style>
.four {
  border-color: hotpink;
}

@layer base {
  blockquote {
    border: 4px solid red;
    padding: 1rem;
  }
}

@layer component {
  .two {
    border-color: green;
  }
}

.three {
  border-color: hotpink;
}
</style>

<blockquote>
  There's only one Return, okay, and it ain't of the king...
</blockquote>

If we add another layer, the border color turns green because a layer defined later in the document has precedence over a layer defined earlier.

```css
@layer base {
  blockquote {
    border: 4px solid red;
    padding: 1rem;
  }
}

@layer component {
  blockquote {
    border-color: green;
  }
}
```

<blockquote class="two">
  There's only one Return, okay, and it ain't of the king...
</blockquote>


<p>If we add unlayered styles after the second layer, the color turns hotpink. Not because the declaration comes later in the document, but because unlayered styles have the highest priority and always<span aria-describedby="not-always">*</span> overwrite layered styles.</p>

<p id="not-always">*Okay, not always, but we'll talk about that in another post.</span>

```css
@layer base {
  blockquote {
    border: 4px solid red;
    padding: 1rem;
  }
}

@layer component {
  blockquote {
    border-color: green;
  }
}

blockquote {
  border-color: hotpink;
}
```

<blockquote class="three">
  There's only one Return, okay, and it ain't of the king...
</blockquote>

This means that the color will be hotpink even if the unlayered styles come before the layered styles.


```css
blockquote {
  border-color: hotpink;
}

@layer base {
  blockquote {
    border: 4px solid red;
    padding: 1rem;
  }
}

@layer component {
  blockquote {
    border-color: green;
  }
}
```

<blockquote class="four">
  There's only one Return, okay, and it ain't of the king...
</blockquote>