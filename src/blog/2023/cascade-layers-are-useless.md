---
title: "Cascade Layers are useless*"
metadescription: '* if you don‘t understand the problems they solve'
teaser: '\*if you don‘t understand the problems they solve and use them in combination with other solutions that tackle the same challenges albeit less elegantly and with the downside of limiting you in taking full advantage of selectors, one of the coolest features in CSS, and if you ignore the fact that they can help you organise and manage your own and third-party code.'
date: 2023-06-21T10:55:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_cascade-useless.jpg
---
I've heard several people say they've tried Cascade Layers but didn't see any changes, so they dropped them again. That can also easily happen to you when you structure your CSS in layers for the first time. I can explain why.

Let's say we have three layers (base, components, and utility) and three rules, one in each layer. It doesn't matter whether you have 3, 30, or 300 rules. The underlying principle I'm trying to explain applies regardless of the size of your CSS.

```html
<label for="email">
  E-Mail
</label>
<input type="email" class="form__input--error u-no-shadow" aria-invalid="true" required id="email">
```


```css
@layer base {
  input {
    --_border-color: #000;

    border: 3px solid var(--_border-color);
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.4);
   }
}

@layer components {
  .form__input--error {
    --_border-color: #F00;
  }
}

@layer utility {
  .u-no-shadow {
    box-shadow: none !important;
  }
}
```

<style>
  label {
    display: block;
    font-weight: bold;
  }

  input {
    display: block;
    padding: 0.4em;
  }
  
  @layer base {
  .demo1 input {
    --_border-color: #000;
    border: 3px solid var(--_border-color);
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.4);
 }
}

@layer components {
  .demo1 .form__input--error {
    --_border-color: #F00;
  }
}

@layer utility {
  .demo1 .u-no-shadow {
    box-shadow: none !important;
  }
}

.demo2   input {
    --_border-color: #000;
    border: 3px solid var(--_border-color);
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.4);
 }

 .demo2   .form__input--error {
    --_border-color: #F00;
  }

  .demo2   .u-no-shadow {
    box-shadow: none !important;
  }

  .demo3 input[type="text"],
.demo3 input[type="email"] {
  --_border-color: #000;

  border: 3px solid var(--_border-color);
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.4);
}

.demo3 [aria-invalid="true"] {
  --_border-color: #F00;
}

.demo3 .u-no-shadow {
  box-shadow: none;
}

@layer base {
  .demo4 input[type="text"],
  .demo4 input[type="email"] {
    --_border-color: #000;

    border: 3px solid var(--_border-color);
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.4);
  }
}

@layer components {
  .demo4 [aria-invalid="true"] {
    --_border-color: #F00;
  }
}

@layer utility {
  .demo4 .u-no-shadow {
    box-shadow: none;
  }
}

</style>

You can see how the input field has a red border and no shadow.

<div data-sample="demo" class="demo1">
<label for="email">
  E-Mail
</label>
<input type="email" class="form__input--error u-no-shadow" size="30" required aria-invalid="true" id="email">
</div>

If we remove the layers, the input field still looks the same.


```css
input {
  --_border-color: #000;

  border: 3px solid var(--_border-color);
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.4);
}

.form__input--error {
  --_border-color: #F00;
}

.u-no-shadow {
  box-shadow: none !important;
}
```

<div data-sample="demo" class="demo2">
<label for="email2">
  E-Mail
</label>
<input type="email" class="form__input--error u-no-shadow" size="30" required aria-invalid="true" id="email2">
</div>

Strange, right? Now the question arises what the actual purpose of cascade layers is.   
Let's have a look at the [spec](https://drafts.csswg.org/css-cascade-5/#layering) (emphasis mine):

> Authors can create layers to represent element defaults, third-party libraries, themes, components, overrides, and other styling concerns—and are able to re-order the cascade of layers in an explicit way, **without altering selectors or specificity within each layer, or relying on order of appearance to resolve conflicts across layers**.

Aha! Now it makes much more sense why we don’t see any difference. If you analyse the CSS, you’ll know that we’ve altered selectors and specificity so that we don’t have any conflicts with the order of appearance.

We deliberately keep the specificity of our reset and base styles low to avoid issues with our component styles.

```css
input { }
```

We ensure that the specificity in our components is larger than in our base styles, and we keep the specificity flat (single-class selectors only).

```css
.form__input--error { }
```

We use `!important` to ensure that certain styles will <s>always</s> most of the time have precedence over other styles.

```css
.u-no-shadow {
  box-shadow: none !important;
}
```

That’s fine, but it’s a hack because we’re restricting ourselves from using one of the most valuable features in CSS: selectors. 
CSS offers many practical ways of selecting elements. The complexity of the Cascade shouldn’t keep us from using them.  
Cascade Layers allow us to be more expressive with our selectors without worrying too much about their specificity. If we rewrite the CSS and use more explicit base styles, semantic selectors in our component styles, and no `!important` in our utilities, we get this:

```css
input[type="text"],
input[type="email"] {
  --_border-color: #000;

  border: 3px solid var(--_border-color);
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.4);
}

[aria-invalid="true"] {
  --_border-color: #F00;
}

.u-no-shadow {
  box-shadow: none;
}
```

<div data-sample="demo" class="demo3">
<label for="email3">
  E-Mail
</label>
<input type="email" class="u-no-shadow" size="30" required aria-invalid="true" id="email3">
</div>

We're running into specificity issues. The colour of the border should be red, and there should be no shadow.  
That's where Cascade Layers can help. Our rules are scoped to each layer, and layers defined later in the document have precedence over layers defined earlier, regardless of the selectors used.

```css
@layer base {
  input[type="text"],
  input[type="email"] {
    --_border-color: #000;

    border: 3px solid var(--_border-color);
    box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.4);
  }
}

@layer components {
  [aria-invalid="true"] {
    --_border-color: #F00;
  }
}

@layer utility {
  .u-no-shadow {
    box-shadow: none;
  }
}
```

<div data-sample="demo" class="demo4">
<label for="email4">
  E-Mail
</label>
<input type="email" class="u-no-shadow" size="30" required aria-invalid="true" id="email4">
</div>

Tools like Cascade Layers and the `:where()` pseudo-class enable us to write more expressive CSS and use the language’s full range of selectors. For these tools to show their power, you can’t just drop them into your stylesheets and hope for magic to happen, you have to adapt how you think about the Cascade and how you write CSS.