---
title: "Can I create an ARIA reference to an element in shadow DOM?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'No.'
date: 2023-09-07T13:30:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_aria.jpg
layout: "layouts/wcfaq.njk"
order: 10
---

Element IDs are scoped within a shadow root. An element in light DOM can't reference an element in shadow DOM or the other way around.

```js
class TheHint extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })

    const paragraph = document.createElement("p")
    paragraph.id = 'hint'
    paragraph.textContent = "Format: DD.MM.YYYY"

    this.shadow.append(paragraph)
  }
}

customElements.define("the-hint", TheHint)

// => result <the-hint><p id="hint">Format: DD.MM.YYYY</p></the-hint>
```

That doesn't work:

```html
<label for="date">Birthday</label>
<input type="date" id="date" aria-describedby="hint">
<the-hint>
  #shadowRoot
  | <p id="hint">
  | Format: DD.MM.YYYY
  | </p>
  #shadowRoot
</the-hint>
```

[IDREF attribute reflection](https://github.com/whatwg/html/pull/7934) and [ARIA mixins](https://w3c.github.io/aria/#ARIAMixin) can solve this issue, but there are constraints.

### ARIA mixins

Every ARIA attribute that refers to other elements by their IDs (`aria-labelledby`, `aria-describedby`, `aria-controls`, etc.) has a corresponding property on DOM elements that you can set or get via JavaScript: For example, `ariaDescribedByElements` for `aria-describedby` or `ariaLabelledByElements` for `aria-labelledby`.

What's great about that is that instead of `input.setAttribute('aria-describedby', 'hint')`, you can now do `input.ariaDescribedByElements = [hint.shadowRoot.querySelector('#hint')]`. You don't reference the id, but the element itself.

That sounds like a solution, but ARIA Mixins are currently only supported in Chrome Canary and WebKit Nightly, and they only work if the referenced element is in the same shadow root as the target element or the referenced element is in a parent, grandparent, or ancestor shadow root of the target element.

The following example won't work because they're not in the same shadow root or in a ancestor relationship:

```html
<label for="date">Birthday</label>
<input type="date" id="date">
<the-hint>
  #shadowRoot
  | <p id="hint">
  | Format: DD.MM.YYYY
  | </p>
  #shadowRoot
</the-hint>
```

```js
const input = document.querySelector('#date')
const hint = document.querySelector('the-hint')
input.ariaDescribedByElements = [hint.shadowRoot.querySelector('#hint')]
```

When support improves, ARIA mixins can solve some problems, but they're not a universal solution. That's the only real option we have at the moment but two **proposals** could solve this issue: [Cross-root ARIA delegation](https://github.com/leobalter/cross-root-aria-delegation/blob/main/explainer.md) and [Cross-root ARIA reflection](https://github.com/Westbrook/cross-root-aria-reflection/blob/main/cross-root-aria-reflection.md).

## Cross-root ARIA delegation

The idea behind Cross-root ARIA Delegation is that you can set a new option to `attachShadow()` called `delegatesAriaAttributes` (similar to `delegatesFocus`), which enables ARIA attributes set on a custom element to be forwarded to elements inside of its shadow root.

<figure>

```js
const template = document.getElementById('template1');

class XFoo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ 
      mode: "open", 
      delegatesAriaAttributes: "aria-label aria-describedby"
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define("x-foo", XFoo);
```

<figcaption>

`delegatesAriaAttributes` delegates `aria-label` and `aria-describedby` from the host to elements inside its shadow tree.

</figcaption>
</figure>

<figure>

```html
<span id="foo">Description!</span>
<template id="template1">
  <input id="input" delegatedariaattributes="aria-label aria-describedby" />
  <section delegatedariaattributes="aria-label">Another target</section>
</template>
<x-foo aria-label="Hello!" aria-describedby="foo"></x-foo>
```


<figcaption>

ARIA attributes applied to the parent delegated to its children.


</figcaption>
</figure>

## Cross-root ARIA reflection

The idea behind Cross-root ARIA Reflection is that you can set new options to `attachShadow()` for ARIA attributes (`reflects*`) (similar to `delegatesFocus`), which enables you to make elements inside a shadow root available as a target for relationship attributes.

<figure>

```js
const template = document.getElementById('template1');
class XFoo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ 
      mode: "open", 
      reflectsAriaControls: true, 
      reflectsAriaActivedescendent: true
    });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
customElements.define("x-foo", XFoo);
```

<figcaption>

`reflectsAriaControls` reflects `aria-controls` and `reflectsAriaActivedescendent` reflects `aria-activedescendent` from the host to element to elements inside its shadow tree.
</figcaption>
</figure>

<figure>


```html
<input aria-controlls="foo" aria-activedescendent="foo">Description!</span>
<template id="template1">
  <ul reflectariacontrols>
    <li>Item 1</li>
    <li reflectariaactivedescendent>Item 2</li>
    <li>Item 3</li>
  </ul>
</template>
<x-foo id="foo"></x-foo>
```

<figcaption>

The host reflects its relationships with the `input` to selected elements in its shadow tree.


</figcaption>
</figure>

## Conclusion

If all your relationships for an element happen exclusively in light DOM or shadow DOM and you don't try to cross boundaries, working with ARIA is not a problem. That's not always possible, though. Without a doubt, there needs to be a solution to that problem. Alice Boxhall described it well.

<div class="quote">
  <blockquote>The contents of the shadow root is private to its light tree, but not to users. If a user can perceive a relationship between elements in the light tree and the shadow tree, but the author can't express that relationship in code, then the encapsulation provided by Shadow DOM is at odds with the semantics of the page, and so at odds with accessibility. This is a conundrum for Shadow DOM.</blockquote>
  <p><span aria-hidden="true">-</span>Alice Boxhall</p>
</div>

## Resources 

* [How Shadow DOM and accessibility are in conflict](https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/) by Alice Boxhall
* [Shadow DOM and accessibility: the trouble with ARIA](https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/) by Nolan Lawson
* [Cross-root ARIA Delegation explainer](https://github.com/leobalter/cross-root-aria-delegation/blob/main/explainer.md) by Nolan Lawson
* [Cross-root ARIA Reflection API explainer](https://github.com/Westbrook/cross-root-aria-reflection/blob/main/cross-root-aria-reflection.md) by Westbrook Johnson
