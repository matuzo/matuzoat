---
title: "Invalid at computed-value time"
date: 2023-04-18T08:46:54.969Z
image: articles/sm-invalid-custom-prop.jpg
teaser: "I rewatched [Lea Verous’s talk about custom properties](https://www.youtube.com/watch?v=ZuZizqDF4q8) recently and learned something I missed the first time I watched it."
tags:
  - blog
  - posts
  - css
---

A declaration of a custom property can be [invalid at computed-value time](https://www.w3.org/TR/css-variables-1/#invalid-variables), if its value is invalid. Depending on the property’s type, this results in the property being set to `unset`, so either the property’s inherited value or its initial value, depending on whether the property is inherited or not.

That’s confusing, I know; here’s an example to better understand why it’s essential to know that.

If we select a button and set its `border` and `background` to an invalid value, nothing happens to the button. The browser just throws away the entire declaration.


<style>
  .sample1 button {
button {
  border: bla;
  background: bla;
}
  }

  .sample2 button {
    --bla: bla;

    border: var(--bla);
    background: var(--bla);
  }
</style>

```css
button {
  border: bla;
  background: bla;
}
```

<div data-sample="demo" class="sample1">
  <button>test</button>
</div>


If we do the same but now put the invalid value in a custom property instead, the button looks different because the custom property is _invalid at computed-value time_ and falls back to `unset`, which for `background` and `border` means `initial` since they're not [inherited properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Inheritance#inherited_properties).

```css

button {
  --bla: bla;
  
  border: var(--bla);
  background: var(--bla);
}
```

<div data-sample="demo" class="sample2">
  <button>test</button>
</div>