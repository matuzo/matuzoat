---
title: 'Parents counting children in CSS'
metadescription: 'Using :has() to select parent elements that have a specific number of children.'
date: 2022-08-29T09:38:54.969Z
image: articles/sm_parenthas.jpg
teaser: "The other day I was driving home when suddenly it hit me: We can use `:has()` to determine how many children a parent element has."
tags:
  - blog
  - posts
  - css
---

You might be thinking that Heydon Pickering already solved that 7 years ago in [Quantity Queries for CSS](https://alistapart.com/article/quantity-queries-for-css/), but that's not what I'm talking about.

```css
/*  Quantity Queries for CSS by Heydon Pickering */
/* Three or more items */
li:nth-last-child(n+3),
li:nth-last-child(n+3) ~ li {
  background: red;
}
```

What I mean is that now we can style the parent element and other children differently depending on the number of items present anywhere in the parent element.


<div class="post" style="border: 10px dotted hotpink; padding: 1rem;">

<p>
  <strong>Note</strong>: <code>:has()</code> is only available in Safari or behind a flag in Firefox and Chrome.
</p>

</div>


The following code checks if there are at least 3 list items in the list and adds a border to the parent if that's the case.
```css
ul:has(li:nth-child(3)) {
  border: 1px solid red;
}
````


<style>
.demo:has(li:nth-child(3)) {
  border: 1px solid red;
}
</style>

<ul class="demo">
  <li>A</li>
  <li>B</li>
</ul>

(*↑ no border*)

<ul class="demo">
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>

(*↑ red border*)

<ul class="demo">
  <li>A</li>
  <li>B</li>
  <li>C</li>
  <li>D</li>
</ul>

(*↑ red border*)

We can adapt the selector a bit and only apply the styling if there are exactly three list items. 

```css
ul:has(li:nth-child(3):last-child) {
  border: 1px solid blue;
}
````

<style>
.demo2:has(li:nth-child(3):last-child) {
  border: 1px solid blue;
}
</style>

<ul class="demo2">
  <li>A</li>
  <li>B</li>
  <li>C</li>
</ul>

(*↑ blue border*)

<ul class="demo2">
  <li>A</li>
  <li>B</li>
  <li>C</li>
  <li>D</li>
</ul>

(*↑ no border*)

## A demo

I’ve built a demo to illustrate what can be done. If you click on the element, start typing and press Enter, the parent element tells you how many items you should add.

<style>

.list {
  --color: black;
  
  color: var(--color);
}

.list ul {
  border: 3px solid var(--color);
  padding: 0;
  color: #000;
  list-style: none;
  counter-reset: count;
}

.list li {
  counter-increment: count;
  margin: 0;
  padding: 0.3rem 0.5rem 0.2rem 4.5ch;
  height: 2.8rem;
  position: relative;
}

.list li::before {
  content: counter(count);
  display: inline-block;
  background: #000;
  color: #fff;
  padding: 0.5rem;
  margin-right: 1rem;
  width: 4ch;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  box-sizing: border-box;
}

.list:focus-within {
  --color: rgb(11, 103, 162);
}

.list::before {
  content: attr(data-default);
}

.list:focus-within::before {
  content: attr(data-empty-focus);
}

.list:has(li:nth-child(2)) {
  --color: rebeccapurple;
}

.list:has(li:nth-child(3)) {
  --color: rgb(255, 111, 0);
}

.list:has(li:nth-child(4) > :first-child) {
  --color: rgb(203, 157, 0);
}

.list:has(li:nth-child(4)) {
  --color: rgb(76, 113, 32);
}

.list:has(li:nth-child(5)) {
  --color: red;
}


.list:has(li:nth-child(2))::before {
  content: attr(data-great-choice)
}

.list:has(li:nth-child(3) > :first-child)::before,
.list:has(li:nth-child(3))::before{
    content: attr(data-half);
}

.list:has(li:nth-child(4):last-child)::before {
    content: attr(data-done);
}

.list:has(li:nth-child(4) > :first-child)::before {
    content: attr(data-one-more);
}

.list:has(li:nth-child(5))::before {
    content: attr(data-too-much);
}

.list:has(li:nth-child(5))::before {
    content: attr(data-too-much);
}

.list:has(li:nth-child(5) > :first-child)::before {
    content: attr(data-almost-too-much);
}

.list.list:has(li:nth-child(4)) button {
  opacity: 1;
}

.list:has(li:nth-child(4) > :first-child) button{
  opacity: 0;
}

.list.list:has(li:nth-child(5)) button {
  opacity: 0;
}

.list:has(li:nth-child(5) > :first-child) button {
  opacity: 1;
}

.list button {
  opacity: 0;
  transition: opacity .3s;
  background: #0080dd;
  font-family: inherit;
  padding-inline: 1.2rem;
  border: 0;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  padding-block: 0.8rem 0.5rem;
  letter-spacing: 1px;
}

:focus-visible {
  outline: 2px solid transparent;
}

</style>

<div class="list"
     data-default="Please add exactly 4 items!"
     data-great-choice="Fantastic choice! What's next?"
     data-empty-focus="Add the first item!"
     data-half="Great! We're half way there!"
     data-one-more="Just one more, you can do it!"
     data-done="Perfect! 🎉 Please submit your selection!"
     data-almost-too-much="No! 😱 That's too much! Don't even start typing!"
     data-too-much="I said that's too much! 🤬"
>
  
  <ul contenteditable>
    <li></li>
  </ul>
  
  <button type="button">
    Submit
  </button>
</div>

Pretty awesome, right? [Try it on CodePen.](https://codepen.io/matuzo/pen/YzaoRLJ)

## Use cases

I can image that this can be useful in content builders in CMS. You can use CSS to give users visual feedback depending on the number of items they have added to a block or component.

<div class="post" style="border: 10px dotted hotpink; padding: 1rem;">

<p style="margin-bottom: 1.5rem">
  <strong>Disclaimer:</strong> This is not tested and not production-ready. Only use this technique for progressive enhancement and only with proper testing. You shouldn’t use it to communicate important information, because changes may only be reflected visually and not semantically.
</p>


<p>Safari is the only browser that supports <code>:has()</code> at the moment. No, it won't stay like that. Other browsers will follow soon.</p>

<p>This solution might break, it's just a fun experiment. Don't use it in production.</p>

<p>I've extended this disclaimer and I've added a pink, dotted border because some people missed it before.</p>

</div>