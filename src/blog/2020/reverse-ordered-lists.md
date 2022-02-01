---
title: 'Reverse ordered lists'
meta:
  description: >-
    Different ways of reversing the order of lists in HTML and CSS..
  image: sm_reverse.jpg
date: 2020-06-04T06:58:54.969Z
teaser: 'I’m working on a project where I have a list of items in reverse order. The list starts with the latest item and ends with the oldest. I wanted to express that both semantically and visually. I did some research and found interesting solutions, some of them good, others not so much.'
tags:
  - blog
  - css
  - html
---

The result should look a little like this.

3\. C  
2\. B  
1\. A

Let’s check out our options.

## The reversed attribute in HTML

The easiest and most straightforward solution is the `reversed` attribute in HTML.

```html
<ol reversed>
  <li>C</li>
  <li>B</li>
  <li>A</li>
</ol>
```

<style>
  .article-list {
    list-style-type: decimal;
  }

  .article-list li {
    margin-bottom: 0;
  }
</style>

<ol reversed class="article-list">
  <li>C</li>
  <li>B</li>
  <li>A</li>
</ol>

It reverses the order of the list marker semantically and visually; the list starts with 3. and ends with 1., and screen readers announce the list in <abbr title="Document Object Model">DOM</abbr> order together with the correct number. “3 C 2 B 1 A”

That’s how you do it, you can stop reading here, if you don’t need custom styling and it doesn’t bother you that the `reversed` attribute is [not supported in IE and old implementations of Edge](https://caniuse.com/#feat=ol-reversed).  
Keep reading, if you need more options, better browser support and more flexibility.

## The value attribute in HTML

Another approach, which yields the same result, is using the value attribute on the list items.

```html
<ol>
  <li value="3">C</li>
  <li value="2">B</li>
  <li value="1">A</li>
</ol>
```

<ol class="article-list">
  <li value="3">C</li>
  <li value="2">B</li>
  <li value="1">A</li>
</ol>

It's more verbose, but we also have more control over the list. You could do something like this:

```html
<ol>
  <li value="6">C</li>
  <li value="4">B</li>
  <li value="2">A</li>
</ol>
```

<ol class="article-list">
  <li value="6">C</li>
  <li value="4">B</li>
  <li value="2">A</li>
</ol>

You probably shouldn’t do this because skipping numbers may confuse your users, but it’s possible.

## Custom counter()s in CSS

There aren’t many options to style standard list items and [support for the `::marker` pseudo-element](https://caniuse.com/#feat=css-marker-pseudo) could be better. So, if we want to apply custom styling to our list markers, custom counters in CSS are an option.
To reverse the order of custom counters we have 2 things to do: Reset the counter to a value other than 0 and increment the counter with a negative number.

```html
<ol>
  <li>C</li>
  <li>B</li>
  <li>A</li>
</ol>
```

```css
ol {
  counter-reset: my-custom-counter 4;
  list-style: none;
}

ol li {
  counter-increment: my-custom-counter -1;
}

ol li::before {
  content: counter(my-custom-counter) '. ';
  color: #f23c50;
  font-size: 2.5rem;
  font-weight: bold;
}
```

<style>
.article-list-custom {
  counter-reset: my-custom-counter 4;
  padding-left: 20px;
  list-style: none;
}

.article-list-custom li {
  counter-increment: my-custom-counter -1;
}

.article-list-custom li::before {
  content: counter(my-custom-counter) ". ";
  color: #f23c50;
  font-size: 2.5rem;
  font-weight: bold;
}
</style>

<ol class="article-list article-list-custom">
  <li value="6">C</li>
  <li value="4">B</li>
  <li value="2">A</li>
</ol>

If we don’t know the exact number of items, we can move the `counter-reset` property into our HTML and let our back-end programming language or our static site generator do the counting.

```html
<ol
  style="counter-reset: my-custom-counter {% raw %}{{ items.length + 1 }}{% endraw %}"
>
  <li>C</li>
  <li>B</li>
  <li>A</li>
</ol>
```

```css
ol {
  list-style: none;
}

ol li {
  counter-increment: my-custom-counter -1;
}

ol li::before {
  content: counter(my-custom-counter) '. ';
}
```

## How not to do it

Some articles suggested reversing the order of both the list marker and the item itself in CSS using Flexbox or similar techniques. We shouldn’t do that because it only looks correct, but the <abbr title="Document Object Model">DOM</abbr> order stays the same. Changing order in CSS has no effect on <abbr title="Document Object Model">DOM</abbr> order.

```html
<ol>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ol>
```

```css
ol {
  display: flex;
  flex-direction: column-reverse;
}
```

<style>
  .article-list-flexbox {
    display: flex;
    flex-direction: column-reverse;
  }
</style>

<ol class="article-list article-list-flexbox">
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ol>

Visually we get what we wanted, but screen readers follow <abbr title="Document Object Model">DOM</abbr> order and announce the list in the order “ABC” and not “CBA”. Also, if you copy and paste the list, browsers might copy it in its original order “ABC”.

Before I wrap it up, here’s another incredibly creative solution I found on StackOverflow. The result is similar to the Flexbox solution, but there are even more drawbacks (e.g. it messes with scrolling).

```html
<ol>
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ol>
```

```css
ol {
  transform: rotate(180deg);
}

ol > li {
  transform: rotate(-180deg);
}
```

<style>
  .article-list-transform {
    transform: rotate(180deg);
    padding: 0 40px 0 0;
  }

  .article-list-transform > li {
    transform: rotate(-180deg);
}
</style>

<ol class="article-list article-list-transform">
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ol>

I have a lot of respect for desperate developers, but for the love of everything that’s important to you, please don’t do that.

## Got something to share?

That’s it, thanks for reading. ❤️ If you know of other approaches or if you have questions, find me on [Twitter](https://twitter.com/mmatuzo) or write me an [e-mail](mailto:manuel@matuzo.at).
