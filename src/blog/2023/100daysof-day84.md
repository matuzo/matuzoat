---
title: 'Day 84: value processing'
date: 2023-01-19T09:38:54.969Z
image: articles/sm_100days-day84.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "This post differs from most of the other posts because it’s not about modern CSS, but about CSS fundamentals. When I was writing about [custom properties](/blog/2022/100daysof-day1/) and especially about [container style queries](/blog/2022/100daysof-day80/), I realized that I had to understand some of the basics of the language first before I could comprehend how certain properties and rules worked."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/KKBvRjR
layout: "layouts/100days.njk"
reading:
  - title: "4. Value Processing"
    url: https://www.w3.org/TR/css-cascade-4/#value-stages
  - title: "2.1. Font family: the font-family property"
    url: https://w3c.github.io/csswg-drafts/css-fonts/#font-family-prop
  - title: "3.1.1. Preferred Size Properties: the width and height properties"
    url: https://www.w3.org/TR/css-sizing-3/#preferred-size-properties
  - title: "14. Resolving <color> Values"
    url: https://w3c.github.io/csswg-drafts/css-color/#resolving-color-values
  - title: "3.1. Line Colors: the border-color properties"
    url: https://w3c.github.io/csswg-drafts/css-backgrounds/#border-color
  - title: "3.2. Line Patterns: the border-style properties"
    url: https://w3c.github.io/csswg-drafts/css-backgrounds/#propdef-border-bottom-style
  - title: "Day 63: explicit defaulting with inherit, initial, unset, and revert"
    url: /blog/2022/100daysof-day63/
draft: true
---

The final value of a property in CSS is the result of a multi-step calculation. In this process, the actual value of a property can come from different sources and undergo adjustments.

## Declared Values

A property may have multiple declared values. Each property declaration applied to an element contributes a declared value.

```css
h1 {
  color: aqua;
}

#heading {
  color: rebeccapurple;
}

.heading {
  color: fuchsia;
}

```

The `color` property has 3 declared values. The cascade takes theses values and chooses a single “winning” value, the cascaded value.

## Cascaded Value

The cascaded value represents the result of the cascade. It’s the declared value with the highest specificity.

```css
#heading {
  color: rebeccapurple;
}
```

## Specified Value

Most times, the specified value equals the cascaded value. If the cascade doesn’t result in a value, the property must take their value from somewhere else. Inherited properties draw their value from their parent element. All other properties use their initial value.

If we take the `<h1>` as an example, we get the following values and origins for the `border-bottom-color`, `border-bottom-style`, `color`, `font-family`, and `width` properties. (These properties are just examples).

<table>
  <caption>h1 specified values</caption>

  <thead>
    <tr>
      <th>property</th>
      <th>value</th>
      <th>origin</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><code>border-bottom-color</code></td>
      <td>currentColor</td>
      <td>initial</td>
    </tr>
    <tr>
      <td><code>border-bottom-style</code></td>
      <td>none</td>
      <td>initial</td>
    </tr>
    <tr>
      <td><code>color</code></td>
      <td>rebeccapurple</td>
      <td>cascaded</td>
    </tr>
    <tr>
      <td><code>font-family</code></td>
      <td>Depends on the user agent</td>
      <td>inherited</td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td>auto</td>
      <td>initial</td>
    </tr>
  </thead>
</table>

## Computed value

A specified value can either be relative or absolute. Relative means relative to another value, like `50%`, `2em`, or `lighter`. Absolute is the opposite, for example, `200px`, `2mm`, or `bold`.

The computed value results from resolving value dependencies, which generally means absolutizing relative values. You can find how a property value is resolved in the property definition table of the property in the specification.

<table>
  <caption>h1 computed values</caption>

  <thead>
    <tr>
      <th>property</th>
      <th>specified value</th>
      <th>computed value</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><code>border-bottom-color</code></td>
      <td>currentColor</td>
      <td>rgb(102, 51, 153)</td>
    </tr>
    <tr>
      <td><code>border-bottom-style</code></td>
      <td>none</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>color</code></td>
      <td>rebeccapurple</td>
      <td>rgb(102, 51, 153)</td>
    </tr>
    <tr>
      <td><code>font-family</code></td>
      <td>Depends on the user agent</td>
      <td>Times (for example)</td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td>auto</td>
      <td>auto</td>
    </tr>
  </thead>
</table>

## Used value

In the previous chapter, I said that computing values _generally_ means absolutizing relative values. For example, `font-size: 1rem;` becomes `font-size: 16px;`, but that’s not true for every property. 

`width: 80%;` stays `width: 80%`. Per definition, the computed value of the width property is _“as specified”_. That’s because `width: 80%;` can’t be resolved into a length without knowing the layout of the element’s ancestors.

The used value takes the computed value and completes any remaining calculations to make it the absolute theoretical value used in the formatting of the document. For example, `width: 80%;` becomes `width: 420px`.


<table>
  <caption>h1 used values</caption>

  <thead>
    <tr>
      <th>property</th>
      <th>computed value</th>
      <th>used value</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><code>border-bottom-color</code></td>
      <td>rgb(102, 51, 153)</td>
      <td>rgb(102, 51, 153)</td>
    </tr>
    <tr>
      <td><code>border-bottom-style</code></td>
      <td>none</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>color</code></td>
      <td>rgb(102, 51, 153)</td>
      <td>rgb(102, 51, 153)</td>
    </tr>
    <tr>
      <td><code>font-family</code></td>
      <td>Times</td>
      <td>Times</td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td>auto</td>
      <td>1062.27px (for example)</td>
    </tr>
  </thead>
</table>

## Actual value

In principle, the _“used value”_ is ready, but the user agent may need to adjust the value in order to make use of it. For example, the font size of an element may need adjustment based on the presence of the `font-size-adjust` property, or floats may need to be converted to integers. 

<table>
  <caption>h1 actual values</caption>

  <thead>
    <tr>
      <th>property</th>
      <th>used value</th>
      <th>actual value</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td><code>border-bottom-color</code></td>
      <td>rgb(102, 51, 153)</td>
      <td>rgb(102, 51, 153)</td>
    </tr>
    <tr>
      <td><code>border-bottom-style</code></td>
      <td>none</td>
      <td>none</td>
    </tr>
    <tr>
      <td><code>color</code></td>
      <td>rgb(102, 51, 153)</td>
      <td>rgb(102, 51, 153)</td>
    </tr>
    <tr>
      <td><code>font-family</code></td>
      <td>Times</td>
      <td>Times</td>
    </tr>
    <tr>
      <td><code>width</code></td>
      <td>1062.27px</td>
      <td>1062px</td>
    </tr>
  </thead>
</table>