---
title: "Can I access a live region in light DOM from shadow DOM?"
metadescription: 'The most important questions regarding web component accessibility'
teaser: 'Yes.'
date: 2023-09-07T13:00:54.969Z
tags:
  - blog
  - posts
  - html
  - wcfaq
image: articles/sm_wca11y_live-region.jpg
layout: "layouts/wcfaq.njk"
order: 11
---
There's nothing much to say except that accessing the document from within a component's shadow DOM is possible.

```html
<the-button></the-button>
<output></output>
```

```js
class TheButton extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "open" })

    const button = document.createElement("button")
    button.textContent = 'Random name'
    button.addEventListener('click', this._updateLiveRegion)
    
    this.shadow.append(button)
  }
  
  _updateLiveRegion( ) {
    const names = ['Luffy', 'Nami', 'Zoro', 'Usopp', 'Sanji']
    const randomName = names[Math.floor(Math.random() * names.length)]
    document.querySelector('output').textContent = randomName
  }
}

customElements.define("the-button", TheButton)
```

<div data-sample="demo">

<the-button></the-button>
<output></output>

</div>

<script>
class TheButton extends HTMLElement {
	constructor() {
		super()
		this.shadow = this.attachShadow({ mode: "open" })

		const button = document.createElement("button")
		button.textContent = 'Random name'
		button.addEventListener('click', this._updateLiveRegion)
		
		this.shadow.append(button)
	}
	
	_updateLiveRegion( ) {
    const names = ['Luffy', 'Nami', 'Zoro', 'Usopp', 'Sanji']
    const randomName = names[Math.floor(Math.random() * names.length)]
    document.querySelector('output').textContent = randomName
	}
}

customElements.define("the-button", TheButton)
</script>