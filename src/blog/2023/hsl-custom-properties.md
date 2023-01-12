---
title: 'CSS color functions and custom properties'
date: 2023-01-12T09:38:54.969Z
teaser: "I know I’m really late to the party, but I finally understood why people find color functions like `hsl()`, `hwb()`, or `lab()` so appealing."
tags:
  - blog
  - posts
  - css
---

There are many reasons, but one of them is that in combination with custom properties, working with color functions is so much easier, cleaner, and understandable compared to working with hex colors or `rbg()`.

Here's an example. Let's say we have a simple status component.

<style>
:is(.sample1, .sample2) [role="status"] {
  --background: rgb(211 232 248);
  
  background-color: var(--background);
  padding: 1rem;
  margin-block-end: 1em;
}

.sample2 [role="status"] {
  --border-color: rgb(122 186 235);

  border: 2px solid var(--border-color);
}

.sample3 [role="status"] {
  --background-color: hsl(206deg 74% 90%);
  --border-color: hsl(206deg 74% 70%);
  
  background-color: var(--background-color);
  border: 2px solid var(--border-color);

  padding: 1rem;
  margin-block-end: 1em;
}

.sample4 [role="status"] {
  --h: 206deg;
  --s: 74%;
  
  --background-color: hsl(var(--h) var(--s) 90%);
  --border-color: hsl(var(--h) var(--s) 70%);
  
  background-color: var(--background-color);
  border: 2px solid var(--border-color);

  padding: 1rem;
  margin-block-end: 1em;
}

.sample4 .warning {
  --h: 40deg;
}

.sample4 .error {
  --h: 0deg;
}
</style>

```css
[role="status"] {
  --background-color: rgb(211 232 248);
  
  background-color: var(--background-color);
  padding: 1rem;
  margin-block-end: 1em;
}
```

```html
<div role="status">
  <strong>Information:</strong> You're logged in as “Tyler Durden”.
</div>
```

<div data-role="demo" class="sample1">
<div role="status">
  <strong>Information:</strong> You're logged in as “Tyler Durden”.
</div>
</div>

If I wanted to add a border to the component with a slightly darker variation of the background color, I would usually take the color picker in dev tools and just pick a random darker color.

```css
[role="status"] {
  --border-color: rgb(122 186 235);

  border: 2px solid var(--border-color);
}
```

<div data-role="demo" class="sample2">
<div role="status">
  <strong>Information:</strong> You're logged in as “Tyler Durden”.
</div>
</div>

That's fine, but with `hsl()` it's way more intuitive. Instead of picking a random color, I use the background color and I just reduced the `l` value (lightness) from 90% to 70%.

```css
[role="status"] {
  --background-color: hsl(206deg 74% 90%);
  --border-color: hsl(206deg 74% 70%);
  
  background-color: var(--background-color);
  border: 2px solid var(--border-color);

  padding: 1rem;
  margin-block-end: 1em;
}
```

<div data-role="demo" class="sample3">
<div role="status">
  <strong>Information:</strong> You're logged in as “Tyler Durden”.
</div>
</div>

To avoid repetition, I store the `h` (hue) and `s` (saturation) value in custom properties. 

```css
[role="status"] {
  --h: 206deg;
  --s: 74%;
  
  --background-color: hsl(var(--h) var(--s) 90%);
  --border-color: hsl(var(--h) var(--s) 70%);
}
```

What’s great about that is that creating variations of this component in different colors is now super easy. All I have to do is change the `h` value.

```css
.warning {
  --h: 40deg;
}

.error {
  --h: 0deg;
}
```

```html
<div role="status" class="warning">
  <strong>Warning:</strong> Your free trial is ending in 4 days.
</div>

<div role="status" class="error">
  <strong>Error:</strong> Your username and password don't match.
</div>
```

<div data-role="demo" class="sample4">
  <div role="status" class="warning">
    <strong>Warning:</strong> Your free trial is ending in 4 days.
  </div>

  <div role="status" class="error">
    <strong>Error:</strong> Your username and password don't match.
  </div>
</div>

You don’t even need the classes.

```html
<div role="status" style="--h: 40deg;">
  <strong>Warning:</strong> Your free trial is ending in 4 days.
</div>

<div role="status" style="--h: 0deg;">
  <strong>Error:</strong> Your username and password don't match.
</div>
```

Theoretically, here's the final CSS code.

```css
[role="status"] {
  --h: 206deg;
  --s: 74%;
  
  --background-color: hsl(var(--h) var(--s) 90%);
  --border-color: hsl(var(--h) var(--s) 70%);
  
  background-color: var(--background-color);
  border: 2px solid var(--border-color);

  padding: 1rem;
  margin-block-end: 1em;
}

.warning {
  --h: 40deg;
}

.error {
  --h: 0deg;
}
```