---
title: "Day 102: selecting the scoping root"
date: 2023-09-01T11:18:54.969Z
image: articles/sm_100days-day102.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "There are different ways of selecting the scoping root inside a `@scope` rule."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
  - 100days-scoping
layout: "layouts/100days.njk"
codepen: https://codepen.io/matuzo/pen/PoXzOOP
reading:
  - title: "2.5. Scoping Styles: the @scope rule"
    url: https://drafts.csswg.org/css-cascade-6/#scoped-styles
tag: scoping
---
When you use the `:scope` pseudo-class in a stylesheet, it matches the `:root` element.

```css
:root {
  border: 10px solid red;
}

:scope {
  border-color: blue;
}

/* -> 10px blue border on the <html> element */
```

When you use it inside a scope rule, it matches the rule's scoping root.

```html
<div class="wrapper">
  <div class="content">
      the cascade is unavoidable
  </div>
</div>
```

```css
@scope (.wrapper) {
  :scope {
    border: 5px solid red;
  }
}

/* -> 5px red border on the .wrapper element */
```

Selectors inside a scope rule can only match elements that are in scope. Selecting `.content` within the `.wrapper` scope works:

```css
@scope (.wrapper) {
  .content {
    background: aqua;
  }
}

/* That's like writing .wrapper .content {} */
```

Selecting `.wrapper .content` within the `.wrapper` scope doesn't work:

```css
@scope (.wrapper) {
  .wrapper .content {
    background: aqua;
  }
}

/* That's like writing .wrapper .wrapper .content {} */
```

You can use `:scope` instead of `.wrapper`. That works because it doesn't match an element with the class `.wrapper` inside of `.wrapper`, but the scoping root itself.


```css
@scope (.wrapper) {
  :scope .content {
    background: aqua;
  }
}

/* That's like writing .wrapper .content {} */
```

Instead of `:scope`, you can also use `&`.

```css
@scope (.wrapper) {
  & {
    border: 5px solid orange;
  }

  & .content {
    background: aqua;
  }
}

/* 
  -> 5px orange border on the .wrapper element 
  and aqua background on .content.
*/
```

There are two differences between `:scope` and `&` in this context. They're only evident if you have a list of scoping roots.

The first difference in specificity. `:scope` has the specificity of a pseudo-class. `&` takes on the specificity of the most specific selector in the selector list of scoping roots. In the following example `:scope` overrules `&` because `&` has the specificity of a tag selector.

```html
<section id="section">
  <h2>
    <span>yo!</span>
  </h2>
  
  <p>
    <span>yo!</span>
  </p>
</section>
```

```css
@scope (section, p) {
  :scope {
    border: 10px solid green;
  }
  
  & {
    border: 10px solid red;
  }
}

/* -> 10px green border on section and p */
```

If you scope the section via its id instead of the tag, `&` takes on the specificity of an id selector and thus overrules `:scope`.


```css
@scope (#section, p) {
  & {
    border: 10px solid red;
  }
  
  :scope {
    border: 10px solid green;
  }
}

/* -> 10px red border on the section and p */
```

The second difference is that `:scope` only matches the scoping root itself. `&` can match any element that is matched by the selector list. 

```html
<section>
  <h2>
    <span>yo!</span>
  </h2>
  
  <p>
    <span>yo!</span>
  </p>
</section>
```

```css
@scope (section, p) {
  :scope span { background: fuchsia; }
  /* 
    section span { }
    p span { }

    -> fuchsia background on span within h2 and p 
  */
  
  :scope & span { background: aqua; }
  /* 
    section p span { }

    -> aqua background only on span within p 
  */

  :scope :scope span { background: red }
  /* 
    Doesn't match any element because `@scope (section, p)` only
    defines multiple scopes, it doesn't nest them. 
  */
}
```

Essentially, that means that `:scope` can only match a scoping root and `&` can match an element in the selector list, regardless of whether it's considered a scoping root in that context. At least, that's how I interpret it. The spec is still pretty fucking hard to read.

To try out `@scope` you have to download [Chrome Canary](https://www.google.com/chrome/canary/) and enable the `Experimental Web Platform features` flag in chrome://flags/.