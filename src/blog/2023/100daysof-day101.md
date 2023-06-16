---
title: "Day 101: scoping"
date: 2023-06-16T10:47:54.969Z
image: articles/sm_100days-day101.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "Similar to container queries or cascade layers, we have another new impactful feature in CSS: scoping."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
layout: "layouts/100days.njk"
codepen: https://codepen.io/matuzo/pen/abQNozb
reading:
  - title: "2.5. Scoping Styles: the @scope rule"
    url: https://drafts.csswg.org/css-cascade-6/#scoped-styles
  - title: "Scoped CSS is Back"
    url: https://keithjgrant.com/posts/2023/04/scoped-css-is-back/
  - title: "An introduction to @scope in CSS"
    url: https://fullystacked.net/posts/scope-in-css/
---

Let's start nice and easy by reading the [spec](https://drafts.csswg.org/css-cascade-6/#scoped-styles).

> A scope is a subtree or fragment of a document, which can be used by selectors for more targeted matching. 

_More targeted matching_ sounds great. We can use the `@scope` rule to scope styles of a child to a parent selector.

```html
<div class="wrapper">
  <div class="card">
    <div class="content">
      the cascade is unavoidable
    </div>
  </div>
</div>
```

```css
@scope(.card) { 
  .content {
    border: 5px solid red;
  }
}
```

Okay, cool, but we could do that already, right? By combining selectors, we can scope a child to a parent.

```css
.card .content {
  border: 5px solid red;
}
```

The biggest difference in this simple example is that the cascade prioritizes declarations with a more proximate scoping root, regardless of specificity or source order.  
The background color will be blue in the following example because of the order of appearance.

```css
.card .content {
  background-color: green;
}

.wrapper .content {
  background-color: blue;
}

/* -> blue */
```

In the following example, it's green because before the order of appearance can say anything, scope proximity compares declarations that appear in style rules with different scoping roots and picks the declaration with the fewest generational or sibling-element hops between the scoping root (`.card` or `.wrapper`) and the scoped style rule subject (`.content`). In other words: the cascade prioritizes declarations with a more proximate scoping root.

```css
@scope (.card) {
  .content {
    background: green;
  }
}

@scope (.wrapper) {
  .content {
    background: blue;
  }
}

/* -> green */
```

There's more to proximity than that, but we'll save that for another day.

That's not everything. `@scope` allows us to define scope limits, which I'll cover on another day. That's where it gets really interesting, but before we can talk about that, here are a couple of things to note:

<ol>

<li>
Selectors within a scoped style rule can only match elements that are in scope, but this applies only to the subject (the actual selector that matches the element). Any other selector in the selector list can be out of scope.

  ```css
  @scope(.card) { 
    /* 
      `.content` (the subject) must be in scope
      `body` is not in scope and doesn't have to
    */
    body & .content {
      border: 5px solid red;
    }
  }
  ```
</li>
<li>
Selectors within a scope block are relative to the scope.

  ```css
  @scope(.card) { 
    /* 
      works with the markup structure at the beginning 
      of this post because it selects `.card .content` 
    */
    .content {
    }

    /* 
      doesn't work because it selects 
      `.card .card .content` 
    */
    .card .content {

    }
  }
  ```

</li>
<li> 

Unlike Nesting, selectors within an scoped style rule do not acquire the specificity of any parent selector(s) in the `@scope` prelude.

  ```css
  @scope(.card) { 
    /* the specificity of .content is (0, 1, 0) */
    .content {
    }
  }
  ```

</li>
</ol>

To try out `@scope` you have to download [Chrome Canary](https://www.google.com/chrome/canary/) and enable the `Experimental Web Platform features
` flag in chrome://flags/.