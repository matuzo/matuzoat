---
title: "Can I change the role of a custom element?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Yes.'
date: 2023-09-11T10:30:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_live-region.jpg
layout: "layouts/wcfaq.njk"
order: 12
---

You can change the generic role of a custom element just like you would with any other element.

```js
class TheNav extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })

    this.shadow.innerHTML = `
    <ul>
      <li>
        <a href="#">Home</a>
      </li>
    </ul>
    `
  }

}

customElements.define("the-nav", TheNav)
```

```html
<the-nav role="navigation" aria-label="Main"></the-nav>
```

You can also set the role in JavaScript.

```js
class TheNav extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" })

    this.shadow.innerHTML = `
    <ul>
      <li>
        <a href="#">Home</a>
      </li>
    </ul>
    `
  }

  connectedCallback() {
    this.setAttribute('role', 'navigation')
    this.setAttribute('aria-label', 'Main')
  }

}

customElements.define("the-nav", TheNav)

```

Is that a good idea? Probably not, but it’s possible.