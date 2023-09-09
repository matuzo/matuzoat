---
title: "Can I connect a label in light DOM to an input in shadow DOM?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'It depends.'
date: 2023-09-07T11:55:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_label.jpg
layout: "layouts/wcfaq.njk"
order: 9
---
Let's say you have a web component that enhances the default functionality of the `<input>` element. Depending on how you build your component, providing an accessible name for the input field using the label element might not work.

### Light DOM: yes

Labelling works if you pass the element to the component via light DOM.

```html
<label for="email">E-Mail</label>
<the-input>
  <input type="email" id="email" />
</the-input>
```

### Declarative shadow DOM: yes

Labelling works if you use declarative shadow DOM.

```html
<label for="email">E-Mail</label>
<the-input>
  <template shadowrootmode="open">
    <slot></slot>
  </template>
  <input type="email" id="email" />
</the-input>
```

### Shadow DOM explicit labelling: no

Explicit labelling doesn’t work when the input is in the shadow DOM because element IDs are scoped to their shadow root.

```html
<label for="email">E-Mail</label>
<the-input></the-input>
```

```jsx
class TheInput extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<input type="email" id="email">`
  }
}

customElements.define("the-input", TheInput);
```

### Shadow DOM implicit labelling: no

Implicit labelling doesn’t work because the label element only labels labelable element descendants (`button`, `input` (if the type attribute is not in the hidden state), `meter`, `output`, `progress`, `select`, `textarea`, and form-associated custom elements).

```html
<label>
  E-Mail
  <the-input></the-input>
</label>
```

When I say no, I mean it shouldn't work as per spec and doesn't work with all browsers and screen readers. I'm saying that because, for whatever reason, implicit labelling of elements in Shadow DOM seems to work with VoiceOver on macOS.

### Form-associated custom elements: I guess!?

The [ElementInternals API](https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/) allows custom elements to participate in form submissions and validations.
`formAssociated = true` associates the element with a form and `this.internals` gives you access to internal information like associated labels.

You have access to associated labels in the `connectedCallback()` function. You could use it to provide an accessible name for the input field, but I'm not sure if that's how it's supposed to work, and it doesn't really connect the input with the label (clicking the label doesn't focus the input).

```jsx
class TheInput extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();

    this.internals = this.attachInternals();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<input type="email">`
  }

  connectedCallback() {
    console.log(this.internals.labels[0].textContent)
  }
}

customElements.define("the-input", TheInput);
```


**Conclusion:** Put the label and the form field in light DOM or both in shadow DOM, but don't mix contexts.