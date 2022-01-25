---
title: 'Here’s what I didn’t know about :where()'
metadescription: >-
  The where() pseudo-class might be more useful than originally thought.
date: 2022-01-25T10:50:54.969Z
image: articles/sm_where.jpg
teaser: "This is part 4 of my series [Here’s what I didn’t know about…](/blog/heres-what-i-didnt-know/) in which I try to learn new things about CSS. This time I'm trying to find out what I didn’t know about the `:where()` pseudo-class."
tags:
  - blog
  - posts
  - css
---

<hr>

Okay, I’ll be honest. When I heard about the `:where()` pseudo-class for the first time, I wasn’t impressed because reading a rule like the following hurt my brain. 

```css
:where(header, main, footer) p:hover {
  color: red;
}
```

It feels like using a shorthand property instead of longhand properties; fewer lines of code, but harder to process. I didn’t get the point, but a few days ago it clicked. 

Here’s what I didn’t know about `:where()`:

## You can use it to lower the specificity of a selector

I believe it was on [Andys](https://piccalil.li/) blog where I saw this smart rule:

```css
ul[class] {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

If a `<ul>` has no `class`, it’s probably a list in the true sense, so leave it untouched and display bullets. If the list has a class, it’s semantically still a list ([in most browsers](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html)), but it’s likely that it doesn’t look like one, so reset the styling. Yeah, I know, dangerous assumptions, but it worked well for me in the past. The only issue I had with this solution is the high specificity caused by the combination of a tag and a class selector. If I wanted to change one of the default properties using just a `class` selector, it wouldn’t work.

```html
<ul class="space">
  <li>HTML</li>
  <li>CSS</li>
  <li>JS</li>
</ul>
```

```css
ul[class] {
  margin: 0;
  padding: 0;
  list-style: none;
}

.space {
  /* This doesn't apply because ul[class]
   has higher specificity than .space */
  margin: 2rem;
}
```

Open [the first example on CodePen](https://codepen.io/matuzo/pen/BamayaR).

This is where `:where()` comes into play. No matter which selectors you pass to the pseudo-class, `:where()` will always have a specificity of 0.

```css
ul:where([class]) {
  margin: 0;
  padding: 0;
  list-style: none;
}

.space {
  /* This applies because .space has higher 
  specificity than ul:where([class]) */
  margin: 2rem;
}
```

Even though the selector contains a tag, a pseudo-class and an attribute, only the tag selector adds to the specificity.

Open [the second example on CodePen](https://codepen.io/matuzo/pen/podovex).

Another great example is input styling (thanks for the tip, [Christopher](https://twitter.com/ckirknielsen/status/1484962960632123397)).

```css
input:where([type="text"], 
            [type="email"],
            [type="password"]) {
  border: 2px solid #000;
}

[aria-invalid] {
  border-color: red;
}
```

or if you're a fan of the `:not()` selector:

```css
input:where(
  :not(
    [type="button"], 
    [type="reset"],
    [type="image"]
  )
) {
  border: 2px solid #000;
}
```

Open [the third example on CodePen](https://codepen.io/matuzo/pen/KKyKwor).

## `:where()` is a forgiving selector

If a list of selectors contains an invalid selector, none of the selectors will match.

```html
<button>
  Send
</button>
```

```css
/* The background color won't change on :hover or :focus
 because the invalid :touch pseudo-class makes the whole
list invalid  */
button:focus,
button:hover,
button:touch {
  background: red;
}
```

<style>
  .btn1:focus,
  .btn1:hover,
  .btn1:touch {
    background: red;
  }

  .btn2:where(:focus,
             :hover,
             :touch) {
  background: red;
}
</style>

<button class="btn1">
  Send
</button>

Open [example 4 on CodePen](https://codepen.io/matuzo/pen/eYeYmLq).

If you use `:where()` instead, `:focus` and `:hover` will still match.

```css
button:where(:focus,
             :hover,
             :touch) {
  background: red;
}
```

<button class="btn2">
  Send
</button>

Open [example 4 on CodePen](https://codepen.io/matuzo/pen/eYeYNNN).


## Conclusion

I haven’t used `:where()` in production yet, but considering that [browsers support](https://caniuse.com/mdn-css_selectors_where) is pretty great, I’m going to try it out soon. The only concern I still have is the cognitive overload selectors like `:where()` or `:not()` create.