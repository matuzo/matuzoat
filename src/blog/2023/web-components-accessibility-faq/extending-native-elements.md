---
title: "Can I create a custom element based on a native element?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Yes, but it’s implemented in all major browsers except Safari, which [has no plan to support it](https://github.com/WebKit/standards-positions/issues/97).'
date: 2023-09-11T10:30:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_live-region.jpg
layout: "layouts/wcfaq.njk"
order: 13
---

Usually, when you write the constructor class for a Web Component you extend it from `HTMLElement`:

```js
class EnhancedButton extends HTMLElement { }
```

You can also extend from a native HTML element to gain all its features (DOM properties, methods, accessibility). 
To do that, you have to do three things:

Pick the correct [DOM interface](https://html.spec.whatwg.org/multipage/indices.html#element-interfaces) and extend from it instead of HTMLElement.

```js
class EnhancedButton extends HTMLButtonElement { }
```

In the `define()` function, pass a third parameter that specifies which element you're extending.

```js
customElements.define('enhanced-button', EnhancedButton, {extends: 'button'});
```

Use the new button variation.

```html
<button is="enhanced-button">Click</button>
```

or

```js
let button = document.createElement('button', {is: 'enhanced-button'});
button.textContent = 'Click';
```

or

```js
let button = new EnhancedButton();
button.textContent = 'Click';
```


Here's an example:

<figure>

```js
class EnhancedButton extends HTMLButtonElement {
  constructor() {
    super();

    this._expanded = false;
    this.setAttribute('aria-expanded', this._expanded);
    this.addEventListener('click', this._toggle);
  }

  _toggle()  {
    this._expanded = !this._expanded
    this.setAttribute('aria-expanded', this._expanded);
  }
}

customElements.define('enhanced-button', EnhancedButton, {extends: 'button'});
```

<figcaption>Extending from the HTMLButtonElement DOM interface. The enhanced button toggle <code>aria-expanded</code> on click.</figcaption>
</figure>

<figure>

```html
<button is="enhanced-button">Yo</button>
<div hidden>Yo!</div>
```

<figcaption>Turning a regular button into an enhanced button.</figcaption>
</figure>

<figure>

```css
[is="enhanced-button"][aria-expanded="true"] + [hidden] {
  display: block;
}
```

<figcaption>Show the next element sibling if <code>aria-expanded</code> is true.</figcaption>
</figure>

<style>
[is="enhanced-button"][aria-expanded="true"] + [hidden] {
  display: block;
}
</style>

<div data-sample="demo"><button is="enhanced-button">Yo</button><div hidden>Yo!</div></div>

<script>
  class EnhancedButton extends HTMLButtonElement {
  constructor() {
    super();

    this._expanded = false;
    this.setAttribute('aria-expanded', this._expanded);
    this.addEventListener('click', this._toggle);
  }

  _toggle()  {
    this._expanded = !this._expanded
    this.setAttribute('aria-expanded', this._expanded);
  }
}

customElements.define('enhanced-button', EnhancedButton, {extends: 'button'});
</script>