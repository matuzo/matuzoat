---
title: 'Eines meiner Lieblingswerkzeuge für Barrierefreiheit-Checks: Die Tabulator-Taste.'
meta:
  description: Using the keyboard only will tell you a lot about the accessiblity of your website.
  image: sm_tab.png
date: 2020-02-20T06:41:15.944Z
intro: ''
teaser: >-
  Ich bin seit etwa einem Jahr angestellt und viele Dinge sind anders als bei meiner freiberuflichen Tätigkeit zuvor. Eine interessante Neuerung ist, dass ich regelmäßig die Zugänglichkeit von Tools Dritter bewerten muss. Dabei bleibt normalerweise keine Zeit für eine vollständige Prüfung, ich muss mir so schnell wie möglich einen guten Überblick über die Qualität eines Produkts verschaffen können.
tags:
  - blog
  - a11y
permalink: blog/de/testing-with-tab/index.html
---

*Hinweis: Das ist eine Übersetzung des englischsprachigen Originals: “[One of my favourite accessibility testing tools: The Tab Key.](/blog/testing-with-tab)”.*

<hr>

Ich habe bereits [6 Dinge geteilt, die ich bei jeder von mir erstellten Website überprüfe](/blog/beyond-automatic-accessibility-testing-6-things-i-check-on-every-website-i-build/), aber jetzt möchte ich mich auf eines der effektivsten Prüfwerkzeuge konzentrieren: Die Tabulator-Taste.

Nehmen wir an, du hast es geschafft, beim Lighthouse Accessibility Audit 100 Punkte zu erreichen. [Das bedeutet nicht unbedingt, dass deine Website barrierefrei ist](/blog/building-the-most-inaccessible-site-possible-with-a-perfect-lighthouse-score/), du hast nur den Grundstein für die eigentlichen Tests gelegt. Ein nächster Schritt könnte darin bestehen, die Maus wegzulegen und nur noch die Tastatur zur Navigation auf deiner Website zu verwenden.

Das Verwenden der Tabulator-Taste verrät dir folgendes über deine Website:

## 1. Focus Styles

Wenn du <kbd>Tab</kbd> drückst, siehst du dann, welches Element auf der Seite hervorgehoben ist? Nein? Verwende `:focus{ }`, `:focus-within{ }` oder `:focus-visible{ }`, um Elemente in ihrem Fokuszustand zu stylen.

<figure class="figure">
  <span class="content__image-wrapper">
     <img class="content__image" src="https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_800/v1582178732/articles/tabkey/tab_a11y_carie.png" alt="Ein fokussierter Link mit einer Hintergrundfarbe und einem gepunkteten Outline.">
  </span>

  <figcaption>Schöne und deutlich sichtbare Fokus-Styles auf <a href="https://cariefisher.com/">Carie Fishers Website</a>.</figcaption>
</figure>

```css
a:focus {
  background-color: #b426ff;
  outline: 5px solid #ea3bcb;
}
```

### Erfahre mehr über Fokus-Styles

- [Focusing on Focus Styles](https://css-tricks.com/focusing-on-focus-styles/)
- [:focus on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus)
- [:focus-within on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)
- [focus visible polyfill](https://github.com/WICG/focus-visible)

## 2. Interaktive Elemente

Kannst du interaktive Elemente wie Links, Buttons, Formularelemente oder Video-Steuerelemente erreichen?
Nein? Verbessere dein HTML. Du verwendest vermutlich nur `<div>`, `<span>`, `<svg>`,  usw., wo du `<input>`, `<button>` oder `<a>` verwenden solltest.

Benutze keine `div`s für Buttons. Diese Fake-Buttons sind für Tastatur-, Switch Device und Screen Reader-Benutzer:innen nicht zugänglich.

```html
<div class="btn" onclick="send()">Senden</div>
```

Viel besser:

```html
<button class="btn" onclick="send()">Senden</button>
```

### Erfahre mehr über Links und Buttons

- [#3 image-buttons on HTMHell](https://www.htmhell.dev/3-image-buttons/)
- [The Links vs. Buttons Showdown ](https://www.youtube.com/watch?v=8XjwDq9zG4I)

## 3. Echte Buttons

Du kannst einen Button erreichen, aber es passiert nichts, wenn du <kbd>Enter</kbd> oder <kbd>Space</kbd> drückst? Es handelt sich vermutlich immer noch nicht um einen echten `<button>` oder `<input type="button">`. Man kann Fake-Buttons mit der Tastatur zugänglich machen und ihre Semantik ändern, aber man bekommt die richtigen Key Events automatisiert nur mit echten `<button>`s.


```html
<div class="btn" tabindex="0" role="button" onclick="send()">Senden</div>
```

Viel besser:

```html
<button class="btn" onclick="send()">Senden</button>
```

### Erfahre mehr über Buttons

- [Just use button -- A11ycasts #05](https://www.youtube.com/watch?v=CZGqnp06DnI)
- [The Button Cheat Sheet](https://www.buttoncheatsheet.com/)

## 4. Skip-Links

Musst du dich durch viele Elemente durchtabben, bevor du einen bestimmten Teil der Benutzeroberfläche, beispielsweise den Hauptinhalt, erreichen kannst? Dann solltst du Skip-Links ergänzen. Diese erlauben es Benutzer:innen direkt zu wichtigen Stellen der Seite zu springen.

<figure class="figure">
  <span class="content__image-wrapper">
     <img class="content__image" src="https://res.cloudinary.com/dp3mem7or/image/upload/c_scale,w_800/v1582178732/articles/tabkey/tab_a11y_tatiana.png" alt="A skip link shows up in the top left corner when focused.">
  </span>

  <figcaption>Der Skip-Link auf <a href="https://tatianamac.com/">Tatiana Macs website</a>.</figcaption>
</figure>

### Erfahre mehr über Skip-Links

- [“Skip Navigation” Links](https://webaim.org/techniques/skipnav/)

## 5. Focus Management

Wenn du eine Button drückst und ein Modal/Dialog erscheint, kannst du dann direkt auf dessen Inhalt zugreifen? Nein? Wahrscheinlich muss hier der Fokus via JavaScript vom Button auf das Modal versetzt werden.

```js
function showModal() {
  ...
  // Das zuletzt fokussierte Element speichern
  lastFocusedElement = document.activeElement;

  var modal = document.getElementById(modalID);
  modal.focus();
  ...
}


function closeModal() {
  ...
  // Fokus wieder auf das zuletzt fokussierte Element setzen.
  lastFocusedElement.focus();
  ...
}
```

- [Writing JavaScript with accessibility in mind](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9#7a0c)

## 6. Infinite Scrolling

Gibt es einen Footer, aber du kannst ihn nicht erreichen indem Du <kbd>TAB</kbd> drückst, weil auf dieser Seite Inifinite Scrolling implementiert wurde? Dann verbrenne es, verbrenne es mit Feuer!

Nein, im Ernst. Inifinite Scrolling ist normalerweise eine schlechte Praxis. Eine bessere Alternative könnte ein „Weitere Einträge laden“-Button sein.

### Erfahre mehr über Infinite Scrolling

- [Infinite Scrolling and Accessibility (It’s Usually Bad)](http://www.webaxe.org/infinite-scrolling-and-accessibility/)

## 7. Off-Screen Elemente

Nicht sichtbare Elemente müssen richtig ausgeblendet werden. `height: 0`, `transform: translateX(-100%)`, etc. entfernen Elemente nicht aus der Tab-Reihenfolge, `display: none;` oder `visibility:hidden` schon.

<div class="skip-link-container">
<a href="#codepen1-skip" class="skip-link skip-link--inline">Demo-CodePen überspringen</a>
</div>

<p class="codepen" data-height="300" data-theme-id="6054" data-default-tab="result" data-user="matuzo" data-slug-hash="yxrRGz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Inaccessible hiding">
  <span>See the Pen <a href="https://codepen.io/matuzo/pen/yxrRGz">
  Inaccessible hiding</a> by Manuel Matuzovic (<a href="https://codepen.io/matuzo">@matuzo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

<h2 id="codepen1-skip">8. DOM Reihenfolge</h2>

Springt der Fokusindikator wild auf der Seite umher, wenn du `Tab` drückst? Meistens liegt das daran, dass die visuelle Reihenfolge nicht mit der DOM-Reihenfolge übereinstimmt. Versuche die visuelle Umordnung von Inhalten zu vermeiden und verwende keine höheren Werte als `0` im `tabindex`-Attribut.

### Erfahre mehr über DOM Reihenfolge

- [Source Order Matters](https://adrianroselli.com/2015/09/source-order-matters.html)

## 9. Benutzerdefiniere JS-Komponeten

Sind nur Teile deiner JS-Komponenten über die Tastatur zugänglich? Werfe einen Blick auf die [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/), um zu erfahren, wie du gängige Pattern korrekt erstellst und für alle zugänglich machst.

## Die Tabulator-Taste ist ein fabelhaftes Werkzeug

Du musst keine Software erlernen, um mit Zugänglichkeitstests zu beginnen. Die Tabulator-Taste wird dir viel über die Qualität deiner Website verraten. Es gibt noch mehr, was überprüft gehört, aber das Testen mit der Tastatur bringt dich der Erstellung einer inklusiven Website einen Schritt näher.

Dieser Beitrag basiert auf einem [Twitter-Thread](https://twitter.com/mmatuzo/status/1090932098456801281).

<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
