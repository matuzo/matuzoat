---
title: 'Day 26: using combinators in :has()'
date: 2022-10-31T09:38:54.969Z
image: articles/sm_100days-day26.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "You [already know](/blog/2022/100daysof-day6/) that the `:has()` pseudo-class allows you to check whether a parent element contains certain children, but you can also make this selector more specific, or check other relations the element might have."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/zYjgBKa
layout: "layouts/100days.njk"
caniuse: ":has()"
reading:
  - title: "Day 6: the :has() pseudo-class"
    url: /blog/2022/100daysof-day6/
  - title: "Day 8: nesting :has()"
    url: /blog/2022/100daysof-day8/
  - title: "Day 16: the specificity of :has()"
    url: /blog/2022/100daysof-day16
  - title: "Day 50: :has(:not()) vs. :not(:has())"
    url: /blog/2022/100daysof-day50/
  - title: "Day 91: a previous sibling selector with :has()"
    url: /blog/2023/100daysof-day91/
  - title: ":has(): the family selector"
    url: https://developer.chrome.com/blog/has-m105/#how-to-use-has
---
## Child combinators

You can check whether an element contains a specific *direct* child element. 

For example, if you have a `fieldset` and you want to make sure that it contains a `legend` and that this `legend` is actually a direct child item of the `fieldset`, [which is important](/blog/2022/divs-are-bad/), you could use the child combinator (`>`) in your `:has()` pseudo-class.

<style>
  fieldset:not(:has(> legend)) {
    border: 10px solid red;
  }
</style>

```css
fieldset:not(:has(> legend)) {
  border: 10px solid red;
}
```

```html
<fieldset>  
  <div>
    <legend>Letters</legend>
  </div>
  <input type="radio" name="letters" id="a">
  <label for="a">a</label>
  
  <input type="radio" name="letters" id="b">
  <label for="b">b</label>
  </div>
</fieldset>
```

<div data-sample="demo">
<fieldset>  
  <div>
    <legend>Letters</legend>
  </div>
  <input type="radio" name="letters" id="a">
  <label for="a">a</label>
  
  <input type="radio" name="letters" id="b">
  <label for="b">b</label>
  </div>
</fieldset>
</div>

## Next-sibling combinators

`:has()` is not just a parent selector, you can select elements based on other relations, too. By using the next-sibling combinator, you can check whether an element has a specific next sibling element, and style it accordingly.

```css
h2 {
  margin-block-end: 0.7em; 
}

h2:has(+ time) {
  margin-block-end: 0;
}
```

The `<h2>` has a block end margin of `0.7em` by default, but when its next sibling is a `<time>` element, the margin is 0.

<style>
  h2:where(.demo) {
    line-height: 1;
    margin-block-end: 0.7em; 
  }

  h2:has(+ time) {
    margin-block-end: 0;
  }
</style>

<div data-sample="demo - h2 followed by p">
<article>
  <h2 class="demo">Heading</h2>
  <p>Teaser text</p>
</article>
</div>

<div data-sample="demo - h2 followed by time">
<article>
  <h2 class="demo">Heading</h2>
  <time>31.10.2022</time>
  <p>Teaser text</p>
</article>
</div>