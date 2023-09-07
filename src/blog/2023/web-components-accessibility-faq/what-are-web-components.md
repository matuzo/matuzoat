---
title: "What are web components?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Before we get into accessibility, let’s first answer an important question so that we are all on the same page: What are web components?


Web components are a set of web platform APIs that allow you to build your own fully-featured DOM elements.'
date: 2023-09-07T07:30:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_what.jpg
layout: "layouts/wcfaq.njk"
---

They’re based on four core concepts:

### Custom Elements

[Custom Elements](https://html.spec.whatwg.org/multipage/custom-elements.html) lay the foundation for web components because they allow you to define custom elements in JavaScript. 

Of course, you don't need an API to come up with you own element. You could create a custom element without JavaScript. Write a *star-wars* start- and end tag, select it in CSS, style it, and you're good to go. 

```html
<star-wars>Luke Skywalker</star-wars>
```

```css
star-wars {
  display: block;
}
```

You can create an undefined custom element like that, but there isn't much you can do with it. The advantages of defining them are that you can inform the parser how to construct an element properly and how elements of that class should react to changes and events.

In the following example, you create a **StarWars** class and define a custom element called `<star-wars>` with the **StarWars** class as the constructor. That’s all you need to define and *upgrade* (promote it to a proper, defined element) the custom element.

```jsx
class StarWars extends HTMLElement {
  constructor() {
    super();
  
  }
}

customElements.define('star-wars', StarWars);
```

In the class, you can run different code in different stages in the component's lifecycle. For example, you can do something when the component is connected or disconnected or when an attribute changes. 

```html
<star-wars character="Luke"></star-wars>
```

Every time the `character` attribute changes in this component, you call the [Star Wars API](https://swapi.dev/) to get information about the provided character.

<script>
class StarWars extends HTMLElement {
  static observedAttributes = ["character"];

  constructor() {
    super();
    this._character = null;
  }

  connectedCallback() {
    console.log("connected");
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._character = newValue;
    this._getCharacter();
  }

  async _getCharacter() {
    console.log(`New Character: ${this._character}`);
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${this._character}`
    );
    const characters = await response.json();
    const character = characters.results[0];
    this.innerHTML = `<dl>
        <dt>Name</dt> 
        <dd>${character.name}</dd>
        <dt>Hair color</dt>
        <dd>${character.hair_color}</dd>
        <dt>Eye color</dt>
        <dd>${character.eye_color}</dd>
      </dl>
      `;
  }
}
customElements.define("star-wars", StarWars);

</script>

<style>
  dl {
    display: grid;
    grid-template-columns: 6rem 1fr;
    gap: 0 1rem;
  }

  dt {font-weight: bold}
  dd {margin: 0}
</style>

```jsx
class StarWars extends HTMLElement {
  static observedAttributes = ["character"];

  constructor() {
    super();
    this._character = null;
  }

  connectedCallback() {
    console.log("connected");
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._character = newValue;
    this._getCharacter();
  }

  async _getCharacter() {
    console.log(`New Character: ${this._character}`);
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${this._character}`
    );
    const characters = await response.json();
    const character = characters.results[0];
    this.innerHTML = `<dl>
        <dt>Name</dt> 
        <dd>${character.name}</dd>
        <dt>Hair color</dt>
        <dd>${character.hair_color}</dd>
        <dt>Eye color</dt>
        <dd>${character.eye_color}</dd>
      </dl>
      `;
  }
}

customElements.define("star-wars", StarWars);
```

<div data-sample="demo">
  <star-wars character="Luke"></star-wars>
</div>

That's all you need to create a web component, but there are other APIs that you may eventually need.

### Shadow DOM

The Shadow DOM API allows you to attach an encapsulated “shadow” DOM subtree to a custom element, which is rendered separately from the main document DOM. This allows you to isolate this subtree and encapsulate styling and scripting within a component to avoid collision with the rest of the document. 
In the following example, you attach a shadow in the constructor. Then you create a button, and you don’t append it to the element directly (`this`) but to its newly created shadow DOM (`this.shadowRoot`).

```jsx
class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    const button = document.createElement("button");
    button.textContent = "Click me";

    this.shadowRoot.append(button);
  }
}

customElements.define("the-button", CustomButton);
```

The opposite of the shadow DOM is the light DOM. That’s basically the good ol’ DOM you’re used to working with. If we add three native buttons and your new custom button that encapsulates a native button to the light DOM and log `document.querySelectorAll(‘button’).length`, we get 3. We see four buttons, but only three of them are available in the light root of the document.

```html
<button>Click me</button>
<button>Click me</button>
<my-button></my-button>
<button>Click me</button>

<script>
  console.log(document.querySelectorAll('button').length) // => 3
</script>
```

And if you add a rule to the global stylesheets, only buttons in light DOM will be affected.

```css
button {
  border: 4px solid;
}
```

If you run `this.querySelectorAll('*')` in the component, you get zero elements, and if you run `this.shadowRoot.querySelectorAll('*')` you get one element (the button).

```jsx
connectedCallback() {
  console.log(this.querySelectorAll('*').length) // => 0
  console.log(this.shadowRoot.querySelectorAll('*').length) // => 1
}
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="WNLojby" data-preview="true" data-user="matuzo" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/matuzo/pen/WNLojby">
  Shadow DOM: DOM encapsulation</a> by Manuel Matuzovic (<a href="https://codepen.io/matuzo">@matuzo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

### ES Modules

If you want to, you can turn your component file into a module and export the Class. Now, you can import it in another file.

```jsx
class TheModule extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.textContent = "A module";
  }
}

customElements.define("the-module", TheModule);

export { TheModule };
```

```jsx
<script type="module">
  import { TheModule } from './the-module.js';
</script>

<the-module></the-module>
```

### HTML Templates

Creating HTML elements in JavaScript can be tedious and confusing, especially in larger components. [HTML template](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element) enables you to write reusable chunks of markup that are not rendered in the DOM but can still be referenced using JavaScript.

In the following example, you have a `<the-template>` custom element and a template with the id `a-template`.

```jsx
<the-template></the-template>

<template id="a-template">
  <h2>Coming from a template</h2>
</template>
```

In the component code, you clone the template content and append it to the component's shadow root. This allows you to write HTML in HTML and use it in your JavaScript code.

```jsx
class TheTemplate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let template = document.getElementById("a-template");
    let templateContent = template.content;
    this.shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

customElements.define("the-template", TheTemplate);
```

<div data-sample="demo">
<the-template></the-template>

<template id="a-template">
  <h2>Coming from a template</h2>
</template>
</div>

<script>
  class TheTemplate extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    let template = document.getElementById("a-template");
    let templateContent = template.content;
    this.shadowRoot.appendChild(templateContent.cloneNode(true));
  }
}

customElements.define("the-template", TheTemplate);
</script>

I'd say that's a enough for an intro to web components. Now you hopefully roughly know what they are.

<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
