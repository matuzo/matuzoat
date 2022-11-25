---
title: 'Day 45: the specificity of ::slotted() content'
date: 2022-11-25T09:38:54.969Z
image: articles/sm_100days-day45.jpg
intro: "It’s time to get me up to speed with modern CSS. There’s so much new in CSS that I know too little about. To change that I’ve started [#100DaysOfMoreOrLessModernCSS](/blog/2022/100-days-of-more-or-less-modern-css/). Why more or less modern CSS? Because some topics will be about cutting-edge features, while other stuff has been around for quite a while already, but I just have little to no experience with it."
teaser: "When you pass an element to a web component through a `<slot>`, you can select that element using the `::slotted()` pseudo-element and apply additional styles."
tags:
  - blog
  - posts
  - css
  - 100daysofmoreorlessmoderncss
codepen: https://codepen.io/matuzo/pen/wvXpYyL
layout: "layouts/100days.njk"
caniuse: "hwb()"
reading:
  - title: "Day 10: global styles and web components"
    url: /blog/2022/100daysof-day10
  - title: "Day 18: inheritable styles and web components"
    url: /blog/2022/100daysof-day18
  - title: "Day 28: custom properties and web components"
    url: /blog/2022/100daysof-day28
---
Let's take the following component. There's a paragraph in the shadow DOM and another paragraph coming from the light DOM, passed through a `<slot>`, and there's a global style turning the background color of paragraphs aqua.

```css
p {
  background-color: aqua;
}
```

```js
class SlotComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    
    const content = document.createElement('div')
    content.innerHTML = `
      <p>not slotted</p>
      <slot></slot>
    `
    this.shadowRoot.appendChild(content)
  }
}

customElements.define('slot-component', SlotComponent);
```

```html
<slot-component>
  <p>slotted</p>
</slot-component>
```

<style>
  .sample p {
  background-color: aqua;
}
</style>

<script>
  class SlotComponent extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      
      const content = document.createElement('div')
      
      content.innerHTML = `
        <p>not slotted</p>
        <slot></slot>
      `
      
      this.shadowRoot.appendChild(content)
    }
  }

customElements.define('slot-component', SlotComponent);

class SlotComponent2 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const styles = document.createElement('style')
    styles.innerHTML = `
      p {
        background-color: salmon;
      }
    `
    this.shadowRoot.appendChild(styles)
    
    const content = document.createElement('div')
    content.innerHTML = `
      <p>not slotted</p>
      <slot></slot>
    `
    this.shadowRoot.appendChild(content)
  }
}

customElements.define('slot-component2', SlotComponent2);

class SlotComponent3 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const styles = document.createElement('style')
    styles.innerHTML = `
      p {
        background-color: salmon;
      }
        
      ::slotted(p) {
        background-color: red;
      }
    `
    this.shadowRoot.appendChild(styles)
    
    const content = document.createElement('div')
    content.innerHTML = `
      <p>not slotted</p>
      <slot></slot>
    `
    this.shadowRoot.appendChild(content)
  }
}

customElements.define('slot-component3', SlotComponent3);

class SlotComponent4 extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});

    const styles = document.createElement('style')
    styles.innerHTML = `
      p {
        background-color: salmon;
      }
        
      ::slotted(p) {
        background-color: red !important;
      }
    `
    this.shadowRoot.appendChild(styles)
    
    const content = document.createElement('div')
    content.innerHTML = `
      <p>not slotted</p>
      <slot></slot>
    `
    this.shadowRoot.appendChild(content)
  }
}

customElements.define('slot-component4', SlotComponent4);
</script>

<div class="sample">

<slot-component>
  <p>slotted</p>
</slot-component>

</div>

The global styles only apply to the slotted paragraph. We've already learned why in [“Day 10: global styles and web components”](/blog/2022/100daysof-day10/).

If you add styles to the shadow DOM, you can see how these styles only apply to the paragraph inside the shadow DOM, but not to the slotted paragraph.

```js
const styles = document.createElement('style')
styles.innerHTML = `
  p {
    background-color: salmon;
  }
`
this.shadowRoot.appendChild(styles)
```

<div class="sample">

<slot-component2>
  <p>slotted</p>
</slot-component2>

</div>

If you want to style slotted content from within the component, you can use the `::slotted()` pseudo-element.

```js
const styles = document.createElement('style')
styles.innerHTML = `
  p {
    background-color: salmon;
  }
    
  ::slotted(p) {
    background-color: red;
  }
`
this.shadowRoot.appendChild(styles)
```

<div class="sample">

<slot-component3>
  <p>slotted</p>
</slot-component3>

</div>

As you can see, the background color didn't change. That's because by slotting content you're not moving it from the light DOM to the shadow DOM. The nodes physically stay where they are, they're just reflected inside the web component. This also means that global document styles still apply. By using `::slotted()` we can add additional styles, but by default these styles have lower specificity than global document styles.  
That changes if we add `!important` to the mix.

```js
const styles = document.createElement('style')
styles.innerHTML = `
  p {
    background-color: salmon;
  }
    
  ::slotted(p) {
    background-color: red !important;
  }
`
this.shadowRoot.appendChild(styles)
```

<div class="sample">

<slot-component4>
  <p>slotted</p>
</slot-component4>

</div>