---
title: console.count() logs the number of times that this particular call to count() has been called.
link: https://codepen.io/matuzo/pen/RwjgWQY?editors=0010
date: 2022-02-16T17:45:34.386Z
---
```js
const letters = "availabilities".split("");
letters.forEach(letter => {
  if (letter === 'i') {
    console.count(`Letter ${letter}`)
  }
})

/* Output:

Letter i: 1
Letter i: 2 
Letter i: 3 
Letter i: 4
*/
```