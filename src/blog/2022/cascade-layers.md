---
title: 'Cascade Layers: First Contact'
metadescription: >-
  A first quick look at CSS Cascade Layers.
date: 2022-01-28T10:50:54.969Z
image: articles/sm_cascadelayers.jpg
teaser: "Earlier this week I learned about [CSS Cascade Layers](https://www.w3.org/TR/css-cascade-5/#layering) and now I’m all hyped up because I really like the concept. I’m eager to find out how we can use them to improve and rethink the architecture of our styles."
tags:
  - blog
  - posts
  - css
pageclass: step0
---

I will not explain how CSS Cascade Layers work because Bramus and Stephanie have already done that and they did it much better than I ever could. I just want to get my feet wet and share my first impressions. If you’re new to the topic, read their articles first.

* [Getting Started With CSS Cascade Layers](https://www.smashingmagazine.com/2022/01/introduction-css-cascade-layers/) by Stephanie Eckles
* [The Future of CSS: Cascade Layers (CSS @layer)](https://www.bram.us/2021/09/15/the-future-of-css-cascade-layers-css-at-layer/) by Bramus van Damme

While I’m writing this blog post, I’m looking at a large site I’ve been working on and I’m trying to find scenarios in which cascade layers could’ve been useful.

## Overly specific base styles

If you have a layer for base styles and another for your components, you don’t have to worry about selectors with high specificity in the base layer anymore.

```css
@layer base, components;

@layer base {
  ul[class] {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  input[type="text"] {
    border: 1px solid #000;
  }
}

@layer components {
  .nav {
    margin-left: 40px;
  }
  
  .error {
    border: 2px dashed #F00;
  }
}
```

Rules in `.nav` and `.error` overwrite rules in `ul[class]` and `input[type="text"]` even though the specificity of the latter is higher.

Try it yourself:

* [“Base Styles with Cascade Layers” on CodePen](https://codepen.io/matuzo/pen/mdqJqGo)
* [“Base Styles without Cascade Layers” on CodePen](https://codepen.io/matuzo/pen/LYOVOqB)

Hint: You have to enable support for Cascade Layers in your browser, they’re still [behind a flag](https://caniuse.com/css-cascade-layers).

## Third party styles

One of the third-party tools we’re using uses highly specific selectors. In some places we’re overwriting rules and we either have to use selectors with the same specificity 🤢 or `!important` 🤮.

I imagine having a dedicated layer for third party styles could make sense. Within this layer, you nest other layers, one or more for the styles you import and another one for your custom overwrites.

```css
@layer base, third-party, components;

@layer base {
  /* Base styles */
}

@layer third-party {
  @layer slider {
    .slider.slider-horizontal > .slider-item {
      background: #fefefe;
      padding: 10px;
      border: 1px solid #000;
    }
  }
  /* 
    In reality 3rd party styles would probabaly live in separate files
    @import url(slider.css) layer(third-party); 
  */
  
  @layer overwrites {
    .slider-item {
      border-color: #F00;
    }
  }
}

@layer components {
  /* Component styles */
}
```

* [“3rd party styles with Cascade Layers” on CodePen](https://codepen.io/matuzo/pen/NWwqwVx)

## Utility classes

Having a dedicated layer for utility classes feels way more intuitive than having to apply `!important` to each rule in a utility class.

```html
<ul id="list" class="u-df">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

```css
@layer base, components, utility;

@layer base {
  /* Base styles */
}

@layer components {
  #list {
    display: block;
    list-style-type: none;
    padding: 0;
  }
}


@layer utility {
  .u-df {
    display: flex;
  }
}
```

[“Utility classes with Cascade Layers” on CodePen](https://codepen.io/matuzo/pen/JjOdMKe)

## Conclusion

This all makes sense to me in theory, but I guess we’ll see how useful layers will be in reality once support gets better and more people begin experimenting. Either way, I’m really stoked about the progress happening with layers and new selectors like `:is()` and [:where()](/blog/2022/heres-what-i-didnt-know-about-where/). Super useful stuff that will make the lives of those specialized in CSS easier. I don’t believe that it will make everyone’s lives easier because with features like these CSS becomes more powerful, but this also increases its complexity. Mastering CSS is already pretty hard, but it will take even more in the future to become really good at writing CSS.