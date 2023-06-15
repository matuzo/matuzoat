---
title: "Syntax podcast episode 623: “Nothing in CSS” errata"
metadescription: 'My comments on their podcast episode about 0, no, none, hidden, etc. in CSS and HTML.'
teaser: 'I just listened to the Syntax podcast for the first time because they were discussing topics near and dear to my heart, HTML and CSS. The episode is called “Nothing in CSS - 0 vs 0px, no, none, hidden, initial and unset”, and they’re talking about all the things that can be 0, none, or hidden in CSS and HTML. Super interesting stuff, but unfortunately, they got some things wrong. The don‘t have a comment section, so I’m commenting on the episode here in case someone else gets confused by their misinformation.'
date: 2023-06-12T11:28:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_syntax-errata.jpg
---

**Disclaimer:** I don't want to shame them; we're all humans and make mistakes, but their podcast reaches many people, and I feel like I can't keep their statements uncommented.


## 4:15 visibility hidden and screen readers

Wes said, as opposed to `display: none` <q><code>visibility: hidden</code> is not hidden from screen readers</q> and he suggested to add `aria-hidden="true"` to make sure these elements are hidden from screen readers.  
You don't have to add the attribute because <code>visibility: hidden</code> already removes an element from the accessibility tree.

![Dev Tools accessibility panel showing that a visibility: hidden element is not exposed to the accessibility tree](/images/syntax-errata.jpg)

## 4:35 opacity: 0

Wes then continued and said, <q>If you put <code>opacity: 0</code>, [...], that's kinda the same thing as <code>visibility: hidden</code>.</q>.  
Not really, they're different because an element with `opacity` set to `0` is still accessible to screen readers. Also, interactive items within an element with `visibility` set to `hidden` are not focusable. On the other hand, items within an element with `opacity` set to `0` are.

```css
div:focus-within {
  visibility: visible !important;
  opacity: 1 !important; 
}
```

```html
<!-- div never visible because the button is not focusable -->
<div style="visibility: hidden">
  <button>nope</button>
</div>

<!-- div visible when the button is focused -->
<div style="opacity: 0">
  <button>yep</button>
</div>
```

## 10:30 ghost spaces

Wes suggests two solutions to get around the “issue” where you have two images and want them to be in one line visually but without the _ghost space_, or how I like to call them: _space_, that gets added automatically.

1. **Remove the space in HTML.**  
  I’d consider that a bad practice because you shouldn’t rely on the position of your tags within your document for styling.
1. **Set the font size of a parent element to 0 and reset it on the element**  
  Setting the font size to 0 solely for layout purposes is also a bad practice. That can confuse anyone else who works on the same code base and mess with accessibility and inheritance.

If you want to align elements horizontally, use Flexbox.

## 11:45 border

Scott said that `border: 0` and `border: none` are effectively doing the same thing.  
That's not entirely true. `border` is a shorthand property, and `border: 0` sets the `border-width` property to `0` while `border: none` sets the `border-style` property to `none`.

## 14:10 none and 0 in color functions

Scott explains how there's no difference between using 0 or none in color functions. I'm not a color expert, but what he said sounded wrong, so I did what they should've done; I read the specs. 
0 represents the amount 0, while none represents a missing color component. A [missing component](https://www.w3.org/TR/css-color-4/#missing) behaves as a zero value unless you interpolate it. Let me just quote the spec here:

<blockquote>
“In the course of converting the two colors to the interpolation color space, any missing components will be replaced with the value 0.  
Thus, the first stage in interpolating two colors is to classify any missing components in the input colors, and compare them to the components of the interpolation color space. If any analogous missing components are found, they will be carried forward and re-inserted in the converted color before linear interpolation takes place.”
</blockquote>

<blockquote>
“If a color with a carried forward missing component is interpolated with another color which is not missing that component, the missing component is treated as having the other color’s component value.”
</blockquote>

In the following example, you can see how `.none` and `.zero` are different. `.none` and `.value` are the same because `.none` uses the h color component from `--color-a`.

<style>
.none0 {
  display: flex;
  min-block-size: 100px;
  
  --color-a: oklch(78.3% 0.108 200);
  --color-b-l: 39.2%;
  --color-b-c: 0.4;
}

.none0 > * {
  flex-grow: 1;
}

.none {
  background-color: color-mix( in oklch, var(--color-a), oklch(var(--color-b-l) var(--color-b-c) none));
}

.zero {
  background-color: color-mix( in oklch, var(--color-a), oklch(var(--color-b-l) var(--color-b-c) 0));
}

.value {
  background-color: color-mix( in oklch, var(--color-a), oklch(var(--color-b-l) var(--color-b-c) 200));
}
</style>


```css
.none0 {
  --color-a: oklch(78.3% 0.108 200);
  --color-b-l: 39.2%;
  --color-b-c: 0.4;
}

.none {
  background-color: color-mix( in oklch, var(--color-a), oklch(var(--color-b-l) var(--color-b-c) none));
}

.zero {
  background-color: color-mix( in oklch, var(--color-a), oklch(var(--color-b-l) var(--color-b-c) 0));
}

.value {
  background-color: color-mix( in oklch, var(--color-a), oklch(var(--color-b-l) var(--color-b-c) 200));
}
```

```html
<div class="none0">
  <div class="none"></div>
  <div class="zero"></div>
  <div class="value"></div>
</div>
```

<div class="none0">
  <div class="none"></div>
  <div class="zero"></div>
  <div class="value"></div>
</div>

## 23:40 unset and initial

Scott explains unset and initial like that: 

<blockquote>

`unset` will revert to the inherited value and it will ignore anything set directly on the element itself, where `initial` will revert back to the browser default itself.

</blockquote>

He explains it some more and then they summarize it by saying that `unset` inherits a value and `initial` reverts to the default browser styles. Both statements are wrong.

It's true that `unset` resets a property to its inherited value, but only if the property naturally inherits from its parent. If not, it uses its initial value.

`initial` sets the value of the property to its _initial value_. Each property has an _initial value_, defined in the property’s definition table. For example, if you look at the [color property in the specification](https://w3c.github.io/csswg-drafts/css-color/#the-color-property), you see that the defined initial value in the definition table is [CanvasText](https://w3c.github.io/csswg-drafts/css-color/#css-system-colors).  
**The initial value is not the default value of the property** defined in the user agent (browser). For example, the default margin of the body in most (all?) browsers is `8px`, but the initial value of the margin property is `0`.

I explain that in detail in [Day 63: explicit defaulting with inherit, initial, unset, and revert](/blog/2022/100daysof-day63/).

## 29:40 role=none

Scott and Wes tried to explain what `role=none` does by explaining what `role=button` does.

Wes said <q>I know that this is just a regular old div and this is just ignored by screen readers…</q>

The div is not ignored by screen readers, it just has no semantic meaning. Screen reader users can still read the text. A div is not very different to a paragraph.  
He continues with:

<q>…but if I put a role equals button, it will show the browsers and screen readers ‘okay, this is something that's clickable and should be focusable‘.</q>

I found that statement confusing. To be clear: `role=button` doesn't add any interactivity; it only gives the element a semantic role. You need `tabindex="0"` to make it focusable.

They also use `input` as an example of an element where you might want to use `role=none`, but according to the spec [user agents must ignore `role=none` and `role=presentation` on interactive elements](https://www.w3.org/TR/wai-aria/#conflict_resolution_presentation_none).

## 30:34 honeypot technique and screen readers

Scott and Wes discussed whether `role=none` would be a good fit for the honey pot technique in forms.

You don't want to use `role=none` for hiding form inputs because it has no effect when applied to the element directly. Applied to a parent, it probably doesn't do what you expect. Instead, you want `aria-hidden="true"` because this removes an element from the accessibility tree, but you must not use `aria-hidden="true"` on interactive elements or elements that contain interactive elements.  
Long story short: don't use either, and maybe also avoid the honeypot technique.

## 32:30 boolean, keyword and enumerated attributes

Wes said <q>With all HTML attributes, except for ARIA attributes, the simple existence of the attribute will make it true.</q>.  

That's only true for boolean attributes in HTML, not keyword and enumerated attributes. Here's an example:

```html
<div contenteditable="false">Not editable</div>
```

You can read more about that in Hidde's post [Boolean attributes in HTML and ARIA: what's the difference?](https://hidde.blog/boolean-attributes-in-html-and-aria-whats-the-difference/).

## Bonus

Since I'm already doing this, I thought I'd add some general comments.

### 4:48 visiblity: hidden transition

Scott said <q>You can't really fade-in <code>visibility: hidden</code></q>. That's true, but it is animatable, meaning you can combine it with `transform` or `opacity`.

### 27:55 user-scaleable: no

It's true that `user-scaleable: no` [prevents users from zooming](https://www.matuzo.at/blog/2022/please-stop-disabling-zoom/), but only on some mobile browsers.


