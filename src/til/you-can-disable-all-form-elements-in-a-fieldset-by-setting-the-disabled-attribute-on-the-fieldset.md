---
title: >-
  You can disable all form elements in a fieldset by setting the disabled
  attribute on the fieldset.
link: 'https://codepen.io/matuzo/pen/gObjOzj?editors=1000'
date: 2020-01-14T11:49:12.237Z
no: 28
---
```html
<form>
  <fieldset disabled>
    <legend>Login</legend>
    <div>
      <label for="username">Username</label><br>
      <input type="text" id="username">
    </div>    
    
    <div>
      <label for="email">E-Mail</label><br>
      <input type="email" id="email">
    </div>
  </fieldset>
</form>
```