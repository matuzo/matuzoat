---
title: 'Day 83: computed values in container style queries'
date: 2023-01-18T09:38:54.969Z
image: articles/sm_100days-day83.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "On [day 80](/blog/2023/100daysof-day80/), I’ve explained that we can check whether a container has a specific property and value assigned and apply additional styles based on this condition. On [day 82](/blog/2023/100daysof-day82/), I’ve explained that the value of a property can come from different sources, undergo adjustments before it becomes the actual value, and take on different forms along the way. To use container style queries, it’s important to understand which value's being used in queries."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/poZrVXK
layout: "layouts/100days.njk"
reading:
  - title: "4. Value Processing"
    url: https://www.w3.org/TR/css-cascade-4/#value-stages
  - title: "Day 82: value processing"
    url: /blog/2023/100daysof-day82/
---
Let’s start nice and easy. We have a `.card` and the value of the `--bg` property is `red`. In a style query, we check if that’s actually the case and apply conditional style to the `<h1>` nested in the card.

```html
<div class="card">
  <h1>heyho</h1>
</div>
```

```css
.card {
  --bg: red;
}

@container style(--bg: red) {
  h1 {
    border: 10px dotted aqua;
  }
}
```

Result: the `<h1>` gets a beautiful dotted border.

If we put the color value in its own property and query the assignment of the `var()` function to the `--bg` property, the styles will be applied, as well.

```css
html {
  --color-red: red;
}

.card {
  --bg: var(--color-red);
}

@container style(--bg: var(--color-red)) {
  h1 {
    border: 10px dotted aqua;
  }
}
```

Here's where it gets really interesting: If we change the query back to `style(--bg: red)`, the styles still apply.

```css
html {
  --color-red: red;
}

.card {
  --bg: var(--color-red);
}

@container style(--bg: red) {
  h1 {
    border: 10px dotted aqua;
  }
}
```

Even if we never assign `--color-red` to `--bg`, but they have the same value, the styles still apply.

```css
html {
  --color-red: red;
}

.card {
  --bg: red;
}

@container style(--bg: var(--color-red)) {
  h1 {
    border: 10px dotted aqua;
  }
}
```

The _“simple”_ explanation is that style queries compare the equality of [computed values](http://localhost:8080/blog/2023/100daysof-day82/#computed-value) and not assignments. The computed value results from resolving value dependencies, which generally means absolutizing relative values. Both sides of the query are evaluated and resolved before the comparison.

So, in each example the actual comparison is something like:  

```css
/* Note: this is not valid syntax, it's just an
illustration of the underlying comparison. */
@container style("red": "red") {
  h1 {
    border: 10px dotted aqua;
  }
}
```