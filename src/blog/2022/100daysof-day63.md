---
title: 'Day 63: explicit defaulting with inherit, initial, unset, and revert'
date: 2022-12-21T09:38:54.969Z
image: articles/sm_100days-day63.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "There are several CSS-wide property values you can use to specify a particular defaulting behavior for a property explicitly."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/LYBEzMB
layout: "layouts/100days.njk"
reading:
  - title: "3.2. Foreground Color: the color property"
    url: https://w3c.github.io/csswg-drafts/css-color/#the-color-property
  - title: "6.2. System Colors"
    url: https://w3c.github.io/csswg-drafts/css-color/#css-system-colors
  - title: "border-width"
    url: https://w3c.github.io/csswg-drafts/css-backgrounds/#border-width
  - title: "border-style"
    url: https://w3c.github.io/csswg-drafts/css-backgrounds/#border-style
  - title: "border-color"
    url: https://w3c.github.io/csswg-drafts/css-backgrounds/#border-color
  - title: "15.2 The CSS user agent style sheet and presentational hints"
    url: https://html.spec.whatwg.org/multipage/rendering.html#the-css-user-agent-style-sheet-and-presentational-hints
---

Okay, okay, I know, these keywords aren't new at all, except for `revert` maybe which is newish, but if I want to write about `revert-layer`, which is brand new, I need a basic understanding of all keywords. Also, I had the feeling that most of you, like me, don't know what all of these keywords do, and I was right. At least, if you want to trust this [poll on Mastodon](https://front-end.social/@matuzo/109547583525926042).

## Our baseline

We'll work with the following example. We have a `<div>` with a `1px solid green` border, a `red` text color, and a `10px` margin. Nested in the div is a `<h2>` with a `blue` text color.

<style>
  [data-sample] div {
    border: 1px solid green;
    color: red;
    margin: 10px;
  }

  [data-sample] h2 {
    color: blue;
  }

  [data-sample] .inherit {
    border: inherit;
    color: inherit;
    margin: inherit;
  }

  [data-sample] .initial {
    border: initial;
    color: initial;
    margin: initial;
  }

  [data-sample] .unset {
    border: unset;
    color: unset;
    margin: unset;
  }

  [data-sample] .revert {
    border: revert;
    color: revert;
    margin: revert;
  }
</style>

```html
<div>
  <h2>standard</h2>
</div>
```

```css
div {
  color: red;
  border: 1px solid green;
  margin: 10px;
}

h2 {
 color: blue;
}
```

<div data-sample="demo">

<div>
  <h2>Feliz Navidad</h2>
</div>

</div>

Now, let's apply keywords to the `border`, `color`, and `margin` property on the `<h2>` and see what happens. 

## inherit

```css
h2 {
  border: inherit;
  color: inherit;
  margin: inherit;
}
```

`inherit` is pretty straight-forward. The `<h2>` inherits all defined properties from its parent element.

<div data-sample="demo">

<div>
  <h2 class="inherit">Feliz Navidad</h2>
</div>

</div>

<table>
  <caption>h2 inherit keyword: property values</caption>

  <thead>
    <tr>
      <th>property</th>
      <th>value</th>
      <th>origin</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><code>border-color</code></td>
      <td>green</td>
      <td>parent</td>
    </tr>
    <tr>
      <td><code>border-style</code></td>
      <td>solid</td>
      <td>parent</td>
    </tr>
    <tr>
      <td><code>border-width</code></td>
      <td>1px</td>
      <td>parent</td>
    </tr>
    <tr>
      <td><code>color</code></td>
      <td>red</td>
      <td>parent</td>
    </tr>
    <tr>
      <td><code>margin</code></td>
      <td>10px</td>
      <td>parent</td>
    </tr>
  </thead>
</table>


## initial

```css
h2 {
  border: initial;
  color: initial;
  margin: initial;
}
```

`initial` sets the value of the property to its _initial value_. Each property has an _initial value_, defined in the property’s definition table. For example, if you look at the [color property in the specification](https://w3c.github.io/csswg-drafts/css-color/#the-color-property), you see that the defined initial value in the definition table is [CanvasText](https://w3c.github.io/csswg-drafts/css-color/#css-system-colors).  
**The initial value is not the default value of the property** defined in the user agent (browser). For example, the default margin of the body in most (all?) browsers is `8px`, but the initial value of the margin property is `0`.

<div data-sample="demo">

<div>
  <h2 class="initial">Feliz Navidad</h2>
</div>

</div>

<table>
  <caption>h2 initial keyword: property values</caption>

  <thead>
    <tr>
      <th>property</th>
      <th>value</th>
      <th>origin</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><code>border-color</code></td>
      <td>currentColor</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>border-style</code></td>
      <td>none</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>border-width</code></td>
      <td>medium</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>color</code></td>
      <td>canvasText</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>margin</code></td>
      <td>0</td>
      <td>initial value</td>
    </tr>
  </thead>
</table>



## unset

```css
h2 {
  border: unset;
  color: unset;
  margin: unset;
}
```

`unset` resets a property to its inherited value if the property naturally inherits from its parent, and to its initial value if not. In our example, it inherits the `color` from the parent `<div>` and sets the `border` and `margin` to its initial value.

<div data-sample="demo">

<div>
  <h2 class="unset">Feliz Navidad</h2>
</div>

</div>

<table>
  <caption>h2 unset keyword: property values</caption>

  <thead>
    <tr>
      <th>property</th>
      <th>value</th>
      <th>origin</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><code>border-color</code></td>
      <td>currentColor</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>border-style</code></td>
      <td>none</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>border-width</code></td>
      <td>medium</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>color</code></td>
      <td>red</td>
      <td>parent</td>
    </tr>
    <tr>
      <td><code>margin</code></td>
      <td>0</td>
      <td>initial value</td>
    </tr>
  </thead>
</table>



## revert

```css
h2 {
  border: revert;
  color: revert;
  margin: revert;
}
```

`revert` resets a property to its inherited value if the property naturally inherits from its parent. In our example, it inherits the `color` from the parent `<div>`. If the property is not an inheritable property, `revert` rolls back the cascaded value to a previous level. If there are user-agent or user default styles, it sets the property to the default value. In our example, it sets the `margin` of the `<h2>` to its user-agent default value of `0.83em`. If there are no default styles, it sets the value to its initial value. This applies to the `border` properties in our example.



<div data-sample="demo">

<div>
  <h2 class="revert">Feliz Navidad</h2>
</div>

</div>

<table>
  <caption>h2 revert keyword: property values</caption>

  <thead>
    <tr>
      <th>property</th>
      <th>value</th>
      <th>origin</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><code>border-color</code></td>
      <td>currentColor</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>border-style</code></td>
      <td>none</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>border-width</code></td>
      <td>medium</td>
      <td>initial value</td>
    </tr>
    <tr>
      <td><code>color</code></td>
      <td>red</td>
      <td>parent</td>
    </tr>
    <tr>
      <td><code>margin</code></td>
      <td>0.83em</td>
      <td>user-agent default</td>
    </tr>
  </thead>
</table>

