---
title: "Is JavaScript a dependency?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'It depends.'
date: 2023-09-07T07:45:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_js.jpg
layout: "layouts/wcfaq.njk"
order: 2
---

Let’s say you have a message component that has a different styling based on its type (info, warning, or alert). If you pass the body of the message through an attribute to the component, similar to what we did with the [Star Wars component](/blog/2023/web-components-accessibility-faq/what-are-web-components/) earlier, and you use JavaScript to render the message, then JavaScript is a dependency.

```jsx
<the-message type="warning" text="That's a warning"></the-message>
```

<script>
  class TheMessage extends HTMLElement {
	static observedAttributes = ["type", "text"];

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this._attachStyles();
	}

	_attachStyles() {
		const style = document.createElement("style");
		style.textContent = `
			:host {
				--_border: blue;

				display: block;
				border: 4px solid var(--_border);
				padding: 0.5em;
			}

			:host([type="warning"]) {
				--_border: orange;
			}
		`;

		this.shadowRoot.appendChild(style);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === "text") {
			this.shadowRoot.append(newValue);
		}
	}
}

customElements.define("the-message", TheMessage);

class TheMessage2 extends HTMLElement {
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
			:host {
				--_border: blue;

				display: block;
				border: 4px solid var(--_border);
				padding: 0.5em;
			}

			:host([type="warning"]) {
				--_border: orange;
			}
		`;

		this.shadowRoot.appendChild(style);
	}
}

customElements.define("the-message2", TheMessage2);

</script>

<div data-sample="demo">
<the-message type="warning" text="That's a warning"></the-message>
</div>

You don’t have to do that, though. You can also pass content to the component by putting it between the start and end tags. That process is called slotting. The big advantage here is that content now lives in the document, as well. 

### Light DOM

If JavaScript doesn’t work, the text between the start and end tags will still be displayed because it’s part of the light DOM. Since the JavaScript code in the component doesn’t run, the component functions differently, and it might also look different, but the content is there!

```jsx
<the-message type="info">
  That's an info
</the-message>
```

<div data-sample="demo">
<the-message2 type="info">
  <p>That's an info</p>
</the-message2>
</div>

For me, someone who believes in progressive enhancement and that websites should work without JavaScript, that’s great news.

### JS only

If the component content needs JavaScript to run in the first place, you don’t have to bother with the light DOM. If you create a map component, for example, you don’t have to pass the entire iframe to the web component because the entire thing relies on JavaScript. You could pass coordinates, and the web component renders the map and embeds third-party styles and scripts.
In such a component, it makes sense to use shadow DOM to ensure that styles from the outside don’t interfere with component styles.

```jsx
<the-map lat="48.188009691340454" long="16.412904197976452"></the-map>
```

### Declarative Shadow DOM

A limitation of the shadow DOM is that it's rendered on the client entirely. [Declarative Shadow DOM](https://developer.chrome.com/en/articles/declarative-shadow-dom/) removes this limitation, bringing Shadow DOM to the server.

A Declarative Shadow Root is a `<template>` element with a `shadowrootmode` attribute. The HTML parser detects the template and applies it immediately as the shadow root of its parent element. This means that it's possible for a Custom Element to have a shadow root before it gets upgraded. You don't need JavaScript to attach a shadow subtree to the element.

```html
<the-message type="warning">
  <template shadowrootmode="open">
    <style>
      :host {
        --_border: blue;

        display: block;
        border: 4px solid var(--_border);
        padding: 0.5em;
      }

      :host([type="warning"]) {
        --_border: orange;
      }
    </style>

    <slot></slot>
  </template>

  <p>That's a warning</p>
</the-message>
```

You still want to upgrade your component so that you can make proper use of it.

```jsx
class TheMessage extends HTMLElement {
  static observedAttributes = ["type", "text"];

  constructor() {
    super();
  }
}

customElements.define("the-message", TheMessage);
```

<script>
class TheMessage3 extends HTMLElement {
  static observedAttributes = ["type", "text"];

  constructor() {
    super();
  }
}

customElements.define("the-message3", TheMessage3);
</script>

<div data-sample="demo">

<the-message3 type="warning">
<template shadowrootmode="open">
<style>:host { --_border: blue; display: block; border: 4px solid var(--_border); padding: 0.5em; } :host([type="warning"]) {--_border: orange;}
</style><slot></slot></template><p>That's a warning</p>
</the-message3>

</div>

That's pretty cool, right? So, what's the catch? [Firefox doesn't support Declarative Shadow DOM](https://caniuse.com/declarative-shadow-dom).

Disable JavaScript in your browser to see how it affects each component.