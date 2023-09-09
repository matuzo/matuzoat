---
title: "Can I enhance a custom element progressively?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Yes!'
date: 2023-09-07T08:30:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_pe.jpg
layout: "layouts/wcfaq.njk"
order: 4
---

[As already mentioned](/blog/2023/web-components-accessibility-faq/what-are-web-components/#custom-elements), you can create a custom element without JavaScript and select and style it in CSS. That means you can define default styles for your custom element and style elements in light DOM. As soon as the web component is defined, encapsulated styles within the component will be added on top.

```css
the-message {
  display: block;
  border: 4px var(--border-style, solid) var(--border-color, currentColor);
  padding: 1em;
}
```

```html
<the-message type="warning">
  A message to you, Rudy.
</the-message>
```

Click the “Define” button to define this undefined custom element and see how component styles enhance the default styling.

<style>
  the-message {
    display: block;
    border: 4px var(--border-style, solid) var(--border-color, currentColor);
    padding: 1em;
  }

  [data-sample="undefined custom element"]::after {
    background-color: #b06811;
  }
</style>

<button class="define">Define</button>

<div data-sample="undefined custom element">

<the-message type="warning">
  A message to you, Rudy.
</the-message>

</div>

```js
class TheMessage extends HTMLElement {
  static observedAttributes = ["type", "text"];

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this._attachStyles();

    const slot = document.createElement('slot')
    this.shadowRoot.appendChild(slot);
  }

  _attachStyles() {
    const style = document.createElement("style");
    style.textContent = `
      :host([type="warning"]) {
      --border-style: dotted;
      --border-color: orange;
      }
    `;

    this.shadowRoot.appendChild(style);
  }
}
```


<script>
class TheMessage extends HTMLElement {
	static observedAttributes = ["type", "text"];

	constructor() {
		super();

		this.attachShadow({ mode: "open" });
		this._attachStyles();

		const slot = document.createElement('slot')
		this.shadowRoot.appendChild(slot);
	}

	_attachStyles() {
		const style = document.createElement("style");
		style.textContent = `
			:host([type="warning"]) {
        --border-style: dotted;
        --border-color: orange;
			}
		`;

		this.shadowRoot.appendChild(style);
	}
}

document.querySelector('.define').addEventListener('click', e => {
  customElements.define("the-message", TheMessage);
  document.querySelector('[data-sample]').dataset.sample = "defined custom element"
})

</script>

Are you wondering where the background color is coming from? Keep reading! :)

## The :defined pseudo-class

You can use the `:defined` pseudo-class to apply styles to a custom element only when it's (not) defined for even more control over progressive enhancement.

```css
/* Applies only when the custom element is not defined */
the-message:not(:defined) {
  background-color: #e4fcff; /* light blue */
}

/* Applies only when the custom element is defined */
the-message:defined {
  background-color: #ffebcf; /* light orange */
}
```
<style>
the-message:not(:defined) {
  background-color: #e4fcff;  
}

the-message:defined {
  background-color: #ffebcf;  
}
</style>