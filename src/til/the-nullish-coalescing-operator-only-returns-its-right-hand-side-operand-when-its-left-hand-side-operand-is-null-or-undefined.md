---
title: The nullish coalescing operator (??) only returns its right-hand side
  operand when its left-hand side operand is null or undefined.
link: https://codepen.io/matuzo/pen/YzwJRaN?editors=1012
date: 2020-07-17T04:30:02.585Z
no: 36
---
```js
const maxAttempts = 3;

const login = (attempts) => {
 console.log(`You have ${attempts ?? maxAttempts} attempts left.`)
}

login(2); // logs 2 attempts
login(); // logs 3 attempts
login(0); // logs 3 attempts
```