---
title: "O dialog focus, where art thou?"
metadescription: 'Quick keyboard tests for the dialog element.'
teaser: 'Here’s a job interview question for you: When you click a button and call the `showModal()` method to open a modal `<dialog>`, where does the focus go by default, and how can you move it elsewhere?'
date: 2023-07-17T09:09:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_dialogfocus.jpg
---
Don't know the answer? Neither did I, so I tested it.

<h2>OS/Browsers</h2>

macOs 13.4.1 Ventura  
Chrome 114  
Firefox 115  
Safari 16.5.1

Here’s a [Codepen with all demos](https://codepen.io/matuzo/pen/PoxOMYg?editors=1010) so you can follow along.

<h2>Demo 1: Dialog with no interactive element</h2>

```html
<button>demo 1</button>

<dialog>
  <h1>Demo 1</h2>
</dialog>
```

```js
document.addEventListener('click', e => {
  if (e.target.closest('button')) {
    e.target.nextElementSibling.showModal()
  }
})
```

Focus is on:

Chrome: **dialog**  
Firefox: **body**  
Safari: **body**  

<h2>Demo 2: Dialog with interactive elements</h2>

```html
<button>demo 2</button>

<dialog>
  <h1>Demo 2</h2>

  <button>First focusable element</button>
  <a href="#">Last focusable element</a>
</dialog>
```

Focus is on:

Chrome: **first focusable element**  
Firefox: **first focusable element**  
Safari: **first focusable element**  

<h2>Demo 3: Dialog with interactive elements and close button first</h2>

```html

<button>demo 3</button>

<dialog>
  <form method="dialog">
    <button>close</button>
  </form>
  
  <h1>Demo 3</h2>

  <button>First focusable element</button>
  <a href="#">Last focusable element</a>
</dialog>
```

Focus is on:

Chrome: **close button**  
Firefox: **close button**  
Safari: **first focusable element after close button**

<h2>Demo 4: Dialog with interactive elements and close button last</h2>

```html
<button>demo 4</button>

<dialog>  
  <h1>Demo 4</h2>

  <button>First focusable element</button>
  <a href="#">Last focusable element</a>

  <form method="dialog">
    <button>close</button>
  </form>
</dialog>
```

Focus is on:

Chrome: **first focusable element**  
Firefox: **first focusable element**  
Safari: **first focusable element** 

<h2>Demo 5: Dialog without interactive elements and autofocus on dialog</h2>

```html
<button>demo 5</button>

<dialog autofocus>
  <h1>Demo 5</h2>
</dialog>
```

Focus is on:

Chrome: **dialog**  
Firefox: **body**  
Safari: **body** 

<h2>Demo 6: Dialog with interactive elements and autofocus on dialog</h2>

```html
<button>demo 6</button>

<dialog autofocus>
  <h1>Demo 6</h2>
 
  <button>First focusable element</button>
  <a href="#">Last focusable element</a>
</dialog>
```

Focus is on:

Chrome: **first focusable element**  
Firefox: **first focusable element**  
Safari: **first focusable element** 

<h2>Demo 7: Dialog with autofocus on last interactive element</h2>

```html
<button>demo 7</button>

<dialog>
  <h1>Demo 7</h2>
 
  <button>First focusable element</button>
  <a href="#" autofocus>Last focusable element</a>
</dialog>
```

Focus is on:

Chrome: **last focusable element**  
Firefox: **last focusable element**  
Safari: **last focusable element** 

Okay, so far, so inconsistent. The specs says “The `tabindex` attribute must not be specified on dialog elements.”.

<div class="quote">
<blockquote>
  I won't do what you tell me.
</blockquote>
<p>– Rage Against the Machine</p>
</div>

<h2>Demo 8: Dialog with tabindex and no interactive element</h2>

```html
<button>demo 8</button>

<dialog tabindex="-1">
  <h1>Demo 8</h2>
</dialog>
```

Focus is on:

Chrome: **dialog**  
Firefox: **dialog**  
Safari: **dialog**  


<h2>Demo 9: Dialog with tabindex and interactive elements</h2>

```html
<button>demo 9</button>

<dialog tabindex="-1">
  <h1>Demo 9</h2>

  <button>First focusable element</button>
  <a href="#">Last focusable element</a>
</dialog>
```

Focus is on:

Chrome: **first focusable element**  
Firefox: **first focusable element**  
Safari: **first focusable element**  

<h2>Demo 10: Dialog with tabindex, autofocus, and interactive elements</h2>

```html
<button>demo 10</button>

<dialog tabindex="-1" autofocus>
  <h1>Demo 10</h2>

  <button>First focusable element</button>
  <a href="#">Last focusable element</a>
</dialog>
```

Chrome: **first focusable element**  
Firefox: **first focusable element**  
Safari: **first focusable element** 

<h2>Demo 11: Dialog with tabindex, <code>focus()</code>, and interactive elements</h2>

```html
<button>demo 11</button>

<dialog tabindex="-1">
  <h1>Demo 11</h2>

  <button>First focusable element</button>
  <a href="#">Last focusable element</a>
</dialog>
```

```js
dialog.showModal()
dialog.focus()
```

Focus is on:

Chrome: **dialog**  
Firefox: **dialog**  
Safari: **dialog**  

<h2>Conclusion</h2>

The answer is: It depends. It depends on several factors:

* The browser you're using.
* The presence of interactive elements.
* The presence of a dialog close button.
* The presence of the `autofocus` attribute.
* The presence of the `tabindex` attribute.

There was [a lot of discussion](https://www.scottohara.me/blog/2023/01/26/use-the-dialog-element.html) on how browsers should handle focus in modal dialogs. They finally concluded and summarized the rules in [the spec](https://html.spec.whatwg.org/#dialog-focusing-steps) earlier this year. If I read it right, Chrome is the only browser that follows most rules correctly at this point. Other browsers will likely follow soon.

Right now you get the most consistent behaviour when:

* you have interactive elements and do nothing
* you put the `autofocus` attribute on one of the interactive elements
* you put `tabindex=-1` on the dialog (and `focus()` it).

<h2>Updates</h2>

<time datetime="2023-07-20">20.7.2023</time>: Changed *body* to *first focusable element* for Chrome in demo 6 and demo 10. I had experimental web platform features enabled, which changed the current default behaviour.
