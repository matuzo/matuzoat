---
title: "Pros and cons of using Shadow DOM and style encapsulation"
metadescription: 'Screen reader and browser support tests for the aria-haspopup attribute.'
teaser: 'When I started to work with web components, I compared different options and decided to go with [lit](https://lit.dev). I knew the extra performance cost would pay off quickly, and it fit into my performance budget. I’m still happy with my decision.'
date: 2023-08-23T10:40:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_shadowdom.jpg
---

<style>
  .pro {
    color: green;
  }

  .con {
    color: red;
  }
</style>

I was new to web components and lit, so I had to consult the docs quite often. On the [page about Shadow DOM](https://lit.dev/docs/components/shadow-dom/) it says: 

<div class="quote">
<blockquote>

Rendering into children and not shadow DOM is generally not recommended. Your element will not have access to DOM or style scoping, and it will not be able to compose elements into its internal DOM.

<blockquote>
</div>

<p>To affirm that, the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM">Using shadow DOM</a> page on MDN says:</p>

<div class="quote">
<blockquote>

An important aspect of web components is encapsulation — being able to keep the markup structure, style, and behavior hidden and separate from other code on the page so that different parts do not clash, and the code can be kept nice and clean.

<blockquote>
</div>

That confirmed my perception of how web components work: they go hand in hand with Shadow DOM. I thought that's the USP (unique selling point), so I used it in almost every component I built.   

Nearly a year later, after fighting many problems and annoyances, I wondered whether Shadow DOM was actually that useful. So I [posted this on Mastodon](https://front-end.social/@matuzo/110904820573072435):

<div class="quote">
<blockquote>

After almost a year working with web components I'm starting to doubt the usefulness of style encapsulation and shadow DOM in general.

Styling and some accessibility stuff is so much easier without…

<blockquote>
</div>

To my surprise, many people replied that they agreed, default to light DOM, and only opt-in when it makes sense. I'm glad because it confirmed my feeling and encouraged me to rethink and restructure some of the components I built. Shadow DOM has its justification but does not always have to be the first choice.

To help you make similar decisions, I summarized my pros and cons of Shadow DOM and style encapsulation. Please note that I'm writing this from the perspective of someone who, first and foremost, cares about accessibility and well-structured, semantic HTML. For me, JavaScript is an optional add-on and not the foundation of my code. That implies that I might not have to solve the same problems as others who primarily work with JS-heavy websites. That might also explain why my list of cons is longer than the list of pros.

Here's a collection on CodePen with [all the demos in this post](https://codepen.io/collection/zxJjoj).

<h2>Overview</h2>

<ol>
  <li>
    <a href="#pro-style-encapsulation"><span class="pro">Pro:</span> Style encapsulation</a>
  </li>
  <li>
    <a href="#pro-dom-encapsulation"><span class="pro">Pro:</span> DOM encapsulation</a>
  </li>
  <li>
    <a href="#pro-slots"><span class="pro">Pro:</span> Slots</a>
  </li>
  <li>
    <a href="#con-style-encapsulation"><span class="con">Con:</span> Style “encapsulation”</a>
  </li>
  <li>
    <a href="#con-styling-slotted-content"><span class="con">Con:</span> Styling slotted content</a>
  </li>
  <li>
    <a href="#con-styling-nested-slotted-content"><span class="con">Con:</span> Styling nested slotted content</a>
  </li>
  <li>
    <a href="#con-selecting-slotted-content"><span class="con">Con:</span> Selecting slotted content</a>
  </li>
  <li>
    <a href="#con-broken-references"><span class="con">Con:</span> Broken references</a>
  </li>
  <li>
    <a href="#con-javascript-dependency"><span class="con">Con:</span> JavaScript dependency</a>
  </li>
  <li>
    <a href="#con-fouce"><span class="con">Con:</span> FOUCE (Flash of unstyled custom element)</a>
  </li>
  <li>
    <a href="#con-forms-behave-differently"><span class="con">Con:</span> Forms behave differently</a>
  </li>
  <li>
    <a href="#con-missing-global-styles"><span class="con">Con:</span> Missing global styles</a>
  </li>
  <li>
    <a href="#con-debugging-a11y"><span class="con">Con:</span> Debugging with accessibility testing tools</a>
  </li>
  <li>
    <a href="#con-debugging-a11y2"><span class="con">Con:</span> Debugging with DevTools</a>
  </li>
</ol>

<h2 id="pro-style-encapsulation"><span class="pro">Pro:</span> Style encapsulation</h2>

When you build components that others use in environments where you have no access or control over light DOM styles, style encapsulation can be immensely helpful. You provide devs who work with your components with one or more JS files that contain all the structure and styles needed to make your custom element display and work just as you intended. If there are new versions of a component, they don't have to worry too much about the structure and the classes used because everything's neatly hidden in its own DOM. They only have to replace the JavaScript files.


[Egor, for example, replied](https://front-end.social/@dutchcelt@mastodon.social/110914690188092126) to my post on Mastodon:

<div class="quote">
<blockquote>

I almost can’t work without them when creating a library of components, and I have no access to the document(light dom) styles. I’m working on a project requiring components in React, Angular, and Blazor.  Web Components make that possible.  

<blockquote>
</div>

In cases like that, when you work on a design system and don't know who's using your components, combined with which external stylesheets, and in which environment, style encapsulation makes a lot of sense.

Here's an example: a paragraph in light DOM and one in shadow DOM of a web component. 

```html
<p>
  Hello World!
</p>

<cus-tom>
  Hello encapsulated World!
</cus-tom>
```

```css
p {
  border: 4px dotted aqua;
}
```

The paragraph within the component is not affected by global styles and comes with its own styles that don't affect the outside.

<div data-sample="demo" class="demo1">
<p>
  Hello World!
</p>

<cus-tom>
  Hello encapsulated World!
</cus-tom>
</div>

<script>
class Custom1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      p {
        font-family: Comic Sans MS;
      }
    `
    
    let content = document.createElement('p');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom', Custom1);
</script>
<style>
  .demo1 p {
    border: 4px dotted aqua;
  }
</style>

You only pass text to the web component and it returns a styled paragraph.

```js
class Custom1 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      p {
        font-family: Comic Sans MS;
      }
    `
    
    let content = document.createElement('p');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom', Custom1);
```

<h2 id="pro-dom-encapsulation"><span class="pro">Pro:</span> DOM encapsulation</h2>

Similar to style encapsulation, with Shadow DOM, you also get DOM encapsulation, which can be helpful.

In the following demo, you can see how it says there are only three buttons on the page, but there are actually four. It's just that one is in the shadow DOM of the custom component. The click event handler attached to the document also only affects the buttons in the light DOM.

<div data-sample="demo" class="demo2">
  <p>There are <span>0</span> buttons!</p>

  <button>Click me</button>
  <button>Click me</button>
  <cus-tom2></cus-tom2>
  <button>Click me</button>
</div>

<script>
class Custom2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
     const button = document.createElement('button')
     button.textContent = 'Click me'

     button.addEventListener('click', e => {
       alert('in the shadow ohoh')
     })
    
    this.shadowRoot.append(button)
  }
}

customElements.define('cus-tom2', Custom2);

const demo = document.querySelector('.demo2')
const buttons = demo.querySelectorAll('button')
demo.querySelector('span').textContent = buttons.length

demo.addEventListener('click', e => {
  if (e.target.closest('button')) {
    alert('light')
  }
})
</script>


```html
<p>There are <span>0</span> buttons!</p>

<button>Click me</button>
<button>Click me</button>
<cus-tom2></cus-tom2>
<button>Click me</button>
```

```js
// simple web component with a button attached to the shadow DOM
class Custom2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
     const button = document.createElement('button')
     button.textContent = 'Click me'
     button.addEventListener('click', e => {
       alert('in the shadow ohoh')
     })
    
    this.shadowRoot.append(button)
  }
}

customElements.define('cus-tom2', Custom2);

// Get all buttons on the page 
const buttons = document.querySelectorAll('button')
// Update the amount of buttons
document.querySelector('span').textContent = buttons.length

// Attach a click event to all buttons
document.addEventListener('click', e => {
  if (e.target.closest('button')) {
    alert('light')
  }
})
```

It's worth noting that nodes are scoped to your component even without Shadow DOM. For example, `this.querySelectorAll('button')` only returns all the buttons inside your component.

<h2 id="pro-slots"><span class="pro">Pro:</span> Slots</h2>

You can define a web component without shadow DOM and pass content from the light DOM.

```js
class Custom3 extends HTMLElement {
  constructor() {
    super();
  }
}

customElements.define('cus-tom3', Custom3);
```

```html
<cus-tom3>
  <h3>That's my heading</h3>
  <p>That's my content!</p>
</cus-tom3>
```

<div data-sample="demo" class="demo3">
<cus-tom3>
  <h3>That's my heading</h3>
  <p>That's my content!</p>
</cus-tom3>
</div>

That's fine, but with shadow DOM you have more control over slotted content regarding its position in the DOM. Being able to create named slots is one of my favorite features.

```html
<cus-tom4>
  <p slot="content">That's my content!</p>
  <h3 slot="heading">That's my heading</h3>
  <p slot="content">That's even more content!</p>
</cus-tom4>
```

```js
class Custom4 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
      <slot name="heading"></slot>
      <p>Other content</p>
      <slot name="content"></slot>
    `
  }
}

customElements.define('cus-tom4', Custom4);
```

See how I messed up the order of the content in light DOM. As long as JavaScript works, it doesn't matter because you can define the order of how slots are rendered. You can also add other elements in between or pass content multiple times into a single slot.

<div data-sample="demo" class="demo4">

<cus-tom4>
  <p slot="content">That's my content!</p>
  <h3 slot="heading">That's my heading</h3>
  <p slot="content">That's even more content!</p>
</cus-tom4>

</div>

<script>
  class Custom4 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
      <slot name="heading"></slot>
      <p>Other content</p>
      <slot name="content"></slot>
    `
  }
}

customElements.define('cus-tom4', Custom4);
</script>

<h2 id="con-style-encapsulation"><span class="con">Con:</span> Style “encapsulation”</h2>

Styles within a web component are contained; they can't affect elements on the outside. Styles from the outside also don't affect elements within the Shadow DOM, with two exceptions: inheritable properties and custom properties.

```html
<div>
  <cus-tom5>
    Hello World!
  </cus-tom5>
</div>
```

```css
/* Styles don't apply */
p {
  border: 10px solid aqua;
}

/* Styles apply */
div {
  --background: black;
  color: red;
}
```

<div data-sample="demo" class="demo5">
<div>
  <cus-tom5>
    Hello World!
  </cus-tom5>
</div>
</div>


<script>
  class Custom5 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      p {
        background: var(--background, transparent);
      }
    `
    
    let content = document.createElement('p');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom5', Custom5);
</script>

<style>
.demo5  p {
  border: 10px solid aqua;
}

/* Styles apply */
.demo5 div {
  --background: black;
  color: red;
}
</style>




Selecting and styling all paragraphs on the page doesn't affect the encapsulated paragraph. Still, it inherits the value of the color property from its parent div in light DOM, and it also reads its custom properties.


```js
class Custom5 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      p {
        background: var(--background, transparent);
      }
    `
    
    let content = document.createElement('p');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom5', Custom5);
```

Don't get me wrong. Inheritance is a good thing. If web components couldn't consume custom properties from the outside, I would've thrown them out of the window months ago. It's just that style encapsulation in web components isn't 100% encapsulation. To prevent inheritable properties from leaking in, you must providently reset them. Also, it would help if you prefixed your custom properties to avoid clashes with other properties on the page.

<h2 id="con-styling-slotted-content"><span class="con">Con:</span> Styling slotted content</h2>

In the following component, I'm slotting a paragraph. All paragraphs in the light DOM have global styles applied to them. In my component, I'm trying to overwrite some of them, but my rules have no effect.

```html
<cus-tom6>
  <p>Hello World!</p>
</cus-tom6>
```

```css
p {
  color: red;
  border: 10px solid red;
}
```

```js
class Custom6 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      ::slotted(p) {
        color: blue;
        border-color: blue;
      }
    `
    
    let content = document.createElement('div');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom6', Custom6);
```

<div data-sample="demo" class="demo6">
<cus-tom6>
  <p>Hello World!</p>
</cus-tom6>
</div>

<style>
:is(.demo6, .demo7) p {
  color: red;
  border: 10px solid red;
}
</style>

<script>
  class Custom6 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      ::slotted(p) {
        color: blue;
        border-color: blue;
      }
    `
    
    let content = document.createElement('div');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom6', Custom6);

class Custom7 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      ::slotted(p) {
        color: blue !important;
        border-color: blue !important;
      }
    `
    
    let content = document.createElement('div');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom7', Custom7);
</script>

The explanation is that we're dealing with two different contexts: the document and the component. For normal rules, declarations from the outer context have precedence over rules from the inner context. For important rules, it's reversed. That means to overwrite styles from the outer context, you must use `!important`, which is annoying.

```js
style.textContent= `
  ::slotted(p) {
    color: blue !important;
    border-color: blue  !important;
  }
`
```

<div data-sample="demo" class="demo7">
<cus-tom7>
  <p>Hello World!</p>
</cus-tom7>
</div>

<h2 id="con-styling-nested-slotted-content"><span class="con">Con:</span> Styling nested slotted content</h2>

You cannot style nested slotted content. With `::slotted()`, you can only select elements on the first level. In the following example, we can only style the `<ul>`, not the `<li>`.

```html
<cus-tom8>
  <ul>
    <li>
      Hello World
    </li>
  </ul>
</cus-tom8>
```

```js
class Custom8 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      ::slotted(ul) {
        border: 10px solid red;
      }
      
      ::slotted(li) {
        border: 10px solid blue;
      }
      
      ::slotted(ul li) {
        border: 10px solid blue;
      }
      
      ::slotted(ul) li {
        border: 10px solid blue;
      }
      
      ::slotted(ul) ::slotted(li) {
        border: 10px solid blue;
      }
    `
    
    let content = document.createElement('div');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom8', Custom8);
```

<div data-sample="demo" class="demo8">
<cus-tom8>
  <ul>
    <li>
      Hello World
    </li>
  </ul>
</cus-tom8>
</div>

<script>
class Custom8 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      ::slotted(ul) {
        border: 10px solid red;
      }
      
      ::slotted(li) {
        border: 10px solid blue;
      }
      
      ::slotted(ul li) {
        border: 10px solid blue;
      }
      
      ::slotted(ul) li {
        border: 10px solid blue;
      }
      
      ::slotted(ul) ::slotted(li) {
        border: 10px solid blue;
      }
    `
    
    let content = document.createElement('div');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom8', Custom8);
</script>


<h2 id="con-selecting-slotted-content"><span class="con">Con:</span> Selecting slotted content</h2>

You're limited in what you can do with the `::slotted()` pseudo-element. For example, combinators don't work. 

```js
class Custom9 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      ::slotted(p + p) {
        border: 10px solid red;
      }
      
      ::slotted(p) + ::slotted(p) {
        border: 10px solid red;
      }
     `
    
    let content = document.createElement('div');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom9', Custom9)
```

```html
<cus-tom9>
  <p>Hello World</p>
  <p>Hello World</p>
</cus-tom9>
```

<div data-sample="demo" class="demo9">
<cus-tom9>
  <p>Hello World</p>
  <p>Hello World</p>
</cus-tom9>
</div>

<script>
  class Custom9 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    let style = document.createElement('style');
    style.textContent= `
      ::slotted(p + p) {
        border: 10px solid red;
      }
      
      ::slotted(p) + ::slotted(p) {
        border: 10px solid red;
      }
     `
    
    let content = document.createElement('div');
    content.innerHTML = `<slot></slot>`
    
    this.shadowRoot.append(style)
    this.shadowRoot.append(content)
  }
}

customElements.define('cus-tom9', Custom9)
</script>

<h2 id="con-broken-references"><span class="con">Con:</span> Broken references</h2>

You can't reference an element in light DOM from shadow DOM or vice versa. That means that things like anchor links or aria references don't work.

The for-id relation, the `aria-labelledby` reference, and the anchor link in the following example don't work.

```html
<p>
  <a href="#name" id="skip">Jump to name</a>
</p>

<label for="name">Name:</label>
<cus-tom10></cus-tom10>
```

```js
class Custom10 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
      <input type="text" id="name">
      <h2 aria-labelledby="skip">Test</h2>
    `
  }
}

customElements.define('cus-tom10', Custom10);

```

<div data-sample="demo" class="demo9">
<p>
  <a href="#name" id="skip">Jump to name</a>
</p>

<label for="name">Name:</label>
<cus-tom10></cus-tom10>
</div>

<script>
class Custom10 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
      <input type="text" id="name">
      <h2 aria-labelledby="skip">Test</h2>
    `
  }
}

customElements.define('cus-tom10', Custom10);
</script>

[Cross-root ARIA](https://github.com/leobalter/cross-root-aria-delegation/blob/main/explainer.md) might fix some of these issues in the future.

<h2 id="con-javascript-dependency"><span class="con">Con:</span> JavaScript dependency</h2>

Firefox doesn't support [declarative Shadow DOM](https://developer.chrome.com/en/articles/declarative-shadow-dom/) (yet), and if you don't use it and don't work with light DOM, it means that JavaScript is a dependency for rendering anything on the screen. That might not be a concern for every one, but it's not an option for me.

<h2 id="con-fouce"><span class="con">Con:</span> FOUCE (Flash of unstyled custom element)</h2>

JavaScript being a dependency means that your components must wait until JavaScript is loaded before they can be rendered. That <s>may</s> will result in flash of unstyled content (FOUC) and/or layout shifts.

Many suggest this horrible hack: Hide the element until it's defined.

```css
:not(:defined) {
  visibility: hidden;
}
```

That's not a solution, that's a workaround.

<h2 id="con-forms-behave-differently"><span class="con">Con:</span> Forms behave differently</h2>

I didn’t know that elements inside shadow DOM in a form can cause problems until I read Simon MacDonald’s post [“Shadow DOM: Not by Default”](https://begin.com/blog/posts/2023-08-18-shadow-dom-not-by-default).

For example, in the following form, only the input field in light DOM is associated with the form.

<div data-sample="demo" class="demo9">
<form>
  <p>
    <label for="name">Name</label>
    <input type="text" name="name" id="Name" value="johanna">
  </p>
  
  <cus-tom11></cus-tom11>
  
  <button>Send</button>
</form>
</div>

```html
<form>
  <p>
    <label for="name">Name</label>
    <input type="text" name="name" id="Name" value="johanna">
  </p>
  
  <cus-tom11></cus-tom11>
  
  <button>Send</button>
</form>
```

```js
class Custom11 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
     <p>
      <label for="email">E-Mail</label>
      <input type="text" name="email" id="email" value="johanna@matuzo.at">
     </p>`
  }
}

customElements.define('cus-tom11', Custom11);

const form = document.querySelector('form')
form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form);
  for (let nv of data.entries()) {
    alert(`  ${ nv[0] }: ${ nv[1] }`);
  }
})
```

<script>
  class Custom11 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
     <p>
      <label for="email">E-Mail</label>
      <input type="text" name="email" id="email" value="johanna@matuzo.at">
     </p>`
  }
}

customElements.define('cus-tom11', Custom11);

const form = document.querySelector('form')
form.addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(form);
  for (let nv of data.entries()) {
    alert(`  ${ nv[0] }: ${ nv[1] }`);
  }
})
</script>

You can work around that issue using the [ElementInternals API](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) as described in the blog post [A Complete Introduction to Web Components in 2023](https://kinsta.com/blog/web-components/#ignored-inputs) by Craig Buckler. I'm not sure, though, if it's worth the effort. Let me quote [Simon Mcdonald](https://begin.com/blog/posts/2023-08-18-shadow-dom-not-by-default#why-not-just-use-the-shadow-dom-from-the-start%3F):


<div class="quote">
<blockquote>
There is a spec called Form Associated Custom Elements (FACE) that gives you the APIs to build web components that participate in forms. However, fixing a problem created by JavaScript by writing more JavaScript is like handing a drowning man a glass of water, IMHO.
</blockquote>
</div>

<h2 id="con-missing-global-styles"><span class="con">Con:</span> Missing global styles</h2>

Style encapsulation sounds great until you want certain styles to apply everywhere. For example, I always define focus styles globally, which are usually the same for every element.

Button two and three in the following example have default styles, while button one and four use custom styles.


<style>
  :focus-visible {
  outline: 2px solid; 
  outline-offset: 2px;
}
</style>

<div data-sample="demo" class="demo12">

<button class="button1">Button 1</button>
<cus-tom12></cus-tom12>
<button class="button4">Button 4</button>
</div>

<script>
  class Custom12 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
      <button class="button2">Button 2</button>
      <button class="button3">Button 3</button>
    `
  }
}

customElements.define('cus-tom12', Custom12);
</script>

```html
<button class="button1">Button 1</button>
<cus-tom12></cus-tom12>
<button class="button4">Button 4</button>
```

```js
class Custom12 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `
      <button class="button2">Button 2</button>
      <button class="button3">Button 3</button>
    `
  }
}

customElements.define('cus-tom12', Custom12);
````

```css
:focus-visible {
  outline: 2px solid; 
  outline-offset: 2px;
}
```



To get the same focus styles in shadow DOM as in light DOM, I have to repeat the global declarations in each component with interactive elements.


```css
:root {
  --site-focus-outline: 2px solid;
  --site-focus-offset: 2px;
}

:focus-visible {
  outline: var(--site-focus-outline);
  outline-offset: var(--site-focus-offset);
}
```


```js
class Custom12 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `   
    <style>
      :focus-visible {
        outline: var(--site-focus-outline);
        outline-offset: var(--site-focus-offset);
      }
    </style>
    
    <button class="button2">Button 2</button>
    <button class="button3">Button 3</button>
      `
  }
}

customElements.define('cus-tom12', Custom12);
```

<h2 id="con-debugging-a11y"><span class="con">Con:</span> Debugging with accessibility testing tools</h2>

Not all accessibility testing tools support shadow DOM. For example, Wave flags zero errors, but there are at least three. 

```js
class Custom13 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    this.shadowRoot.innerHTML = `   
    <img src="#test">
    
    <button></button>
    <button aria-hidden="true">Click</button>
      `
  }
}

customElements.define('cus-tom13', Custom13);
```

<img src="/images/shadow-dom-debugging4.webp" alt="Browser version of wave showing 0 errors" width="1200" height="680" loading="lazy">

<h2 id="con-debugging-a11y2"><span class="con">Con:</span> Debugging with DevTools</h2>

I like to use the live expression feature in Chrome's Dev Tools to debug keyboard accessibility issues by logging `document.activeElement`.

When I focus a button in light DOM, it returns the focused button.

<img src="/images/shadow-dom-debugging.webp" alt="Focus on button 1. Dev tools logs button.button1" width="1200" height="352" loading="lazy">

When I focus a button in shadow DOM, it returns the parent component.

<img src="/images/shadow-dom-debugging1.webp" alt="Focus on button 2. Dev tools logs cus-tom12" width="1200" height="313" loading="lazy">

To workaround that I have to create a second live expression that logs `document.activeElement.shadowRoot.activeElement`.

<img src="/images/shadow-dom-debugging2.webp" alt="Focus on button 2. Dev tools logs cus-tom12 and button.button2" width="1200" height="384" loading="lazy">

That's okay, but you get an annoying error when focusing an element without a shadow root.
<img src="/images/shadow-dom-debugging3.webp" alt="Focus on button 1. Dev tools logs button.button1 and Uncaught TypeError: Cannot read properties of null…" width="1200" height="384" loading="lazy">

I understand that most of the cons described in this post are not critical issues, and there are ways to work around them. The thing is, it's just a lot of stuff we have to consider, and we could avoid that by simply not using Shadow DOM. Sounds easier than it is. I don't know; time will tell. I will keep you posted! :)

A big thank you to Egor, Dave, and Simon for their feedback!

<h2>Further reading</h2>

* [Eschewing Shadow DOM](https://every-layout.dev/blog/eschewing-shadow-dom/) by Heydon Pickering
* [Shadow DOM: Not by Default](https://begin.com/blog/posts/2023-08-18-shadow-dom-not-by-default) by Simon MacDonald
* [The CSS Cascade, a deep dive](https://youtu.be/zEPXyqj7pEA) by Bramus Van Damme 
* [How Shadow DOM and accessibility are in conflict](https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/) by Alice Boxhall
* [Shadow Themes](https://dutchcelt.nl/posts/shadow-themes/) by Egor Kloos
* [A Complete Introduction to Web Components in 2023](https://kinsta.com/blog/web-components/#ignored-inputs) by Craig Buckler
* [Shadow DOM and accessibility: the trouble with ARIA](https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/) by Nolan Lawson