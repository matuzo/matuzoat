---
title: 'CSS Specificity Demo'
metadescription: >-
  An interactive demo that illustrates how specificity in CSS works
date: 2022-01-26T10:50:54.969Z
image: articles/sm_specificity.jpg
teaser: "I built an interactive demo to illustrate how specificity in CSS works."
tags:
  - blog
  - posts
  - css
pageclass: step0
---

Press the “Add selector” and “Remove selector” buttons to add or remove a selector in the list of declarations and see how the background color changes accordingly. Each selector will be added to the top of the list to prove that it has a higher specificity than the previous selector.

<div role="alert" class="u-vh"></div>

<button id="remove" disabled type="button">
  Remove selector
</button>

<button id="add" type="button">
  Add selector
</button>

<script>
  let step = 0;

  const messages = [
    'Selector: :where(body), background-color: gray',
    'Selector: body, background-color: red',
    'Selector: .body, background-color: blue',
    'Selector: body.body, background-color: green',
    'Selector: .body.body, background-color: orange',
    'Selector: #body, background-color: brown',
    'Selector: body#body, background-color: fuchsia',
    'Selector: .body#body, background-color: salmon',
    'Selector: #body#body, background-color: aqua',
    'Selector: #body:is(#body, #bla#bla), background-color: hotpink',
    'Selector: div with animated background-color, background-color: yellow',
    'Selector: body with !important, background-color: rebeccapurple'
  ]
  
  const remove = document.getElementById('remove');
  const add = document.getElementById('add');

  remove.addEventListener('click', () => {
    if (step > 0) {
      add.removeAttribute('disabled')
      step--;
      document.documentElement.className = `step${step}`
      document.querySelector('[role="alert"]').textContent = messages[step]
    }

    if (step === 0) {
      remove.setAttribute('disabled', 'disabled')
    }
  })

  add.addEventListener('click', () => {
    if (step < messages.length) {
      remove.removeAttribute('disabled')
      step++;
      document.documentElement.className = `step${step}`
      document.querySelector('[role="alert"]').textContent = messages[step]
    }
    
    if (step ===  messages.length - 1) {
      add.setAttribute('disabled', 'disabled')
    }
  })
</script>

<style>
  button {
    background: #80d2db;
    border: 2px solid #153a51;
    color: #153a51;
    padding: 0.7em 0.8em 0.5em;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: bold;
  }

  button:not([disabled]):hover {
    background: #153a51;
    color: #fff;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  pre[class*="language-"] {
    margin-top: 0;
    padding: 1rem;
    border: none;
  }

  pre[class*="language-"]:not(:last-of-type) {
    margin-bottom: 0;
  }

  header {
    background: #efefef;
  }

  .banner {
    background: #d9dddf;
  }

  main {
    background: #fafafa;
  }

  pre[class*="language-"] {
    display: none;
  }

  @keyframes bg {
    to {
      background: yellow;
    }
  }

  .step11 body { background: rebeccapurple !important; }
  .step10 body { animation: bg 0s forwards; }
  .step9 #body:is(#body, #bla#bla) { background: hotpink; }
  .step8 #body#body { background: aqua; }
  .step7 .body#body { background: salmon; }
  .step6 body#body { background: fuchsia; }
  .step5 #body { background: brown; }
  .step4 .body.body { background: orange; } 
  .step3 body.body { background: green; }
  .step2 .body { background: blue; }
  .step1 body { background: red; }
  .step0 :where(body) { background: #efefef; }

  .step0 pre[class*="language-"]:nth-last-of-type(1),
  .step1 pre[class*="language-"]:nth-last-of-type(-n+2),
  .step2 pre[class*="language-"]:nth-last-of-type(-n+3),
  .step3 pre[class*="language-"]:nth-last-of-type(-n+4),
  .step4 pre[class*="language-"]:nth-last-of-type(-n+5),
  .step5 pre[class*="language-"]:nth-last-of-type(-n+6),
  .step6 pre[class*="language-"]:nth-last-of-type(-n+7),
  .step7 pre[class*="language-"]:nth-last-of-type(-n+8),
  .step8 pre[class*="language-"]:nth-last-of-type(-n+9),
  .step9 pre[class*="language-"]:nth-last-of-type(-n+10),
  .step10 pre[class*="language-"]:nth-last-of-type(-n+11),
  .step11 pre[class*="language-"]:nth-last-of-type(-n+12) {
    display: block;
  }

  body {
    transition: background 0.5s;
  }

</style>



```css
/* !important overwrites everything */
body {
  background: rebeccapurple !important;
}
```

```css
/* Animation declarations take precedence over normal
 declarations */
body {
  animation: bg 0s forwards;
}

@keyframes bg {
  to {
    background: yellow;
  }
}
```

```css
/* any selector with higher specificity, even if it doesn't 
match any element, inside :is() overwrites id + id */
#body:is(#body, #bla#bla) {
  background: hotpink;
}
```

```css
/* id + id overwrites id + class */
#body#body {
  background: aqua;
}
```

```css
/* id + class overwrites id + tag */
.body#body {
  background: salmon;
}
```

```css
/* id + tag overwrites id */
body#body {
  background: fuchsia;
}
```

```css
/* id overwrites classes */
#body {
  background: brown;
}
```

```css
/* class + class overwrites tag + class */
.body.body {
  background: orange;
}
```

```css
/* tag + class overwrites class */
body.body {
  background: green;
}
```

```css
/* class overwrites tag */
.body {
  background: blue;
}
```

```css
/* tag selector overwrites universal :where() selector */
body {
  background: red;
}
```

```css
/* universal :where() selector */
:where(body) {
  background: #efefef;
}
```

## Resources

* [Demo on CodePen](https://codepen.io/matuzo/pen/dyZyrRw?editors=1100)
* [Cascade Sorting Order](https://www.w3.org/TR/css-cascade-5/#cascade-origin)
* [:where() on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:where)
* [specificity animation hack](https://codepen.io/t_afif/pen/QWOWKXY)
* [SpeciFISHity](https://specifishity.com/)