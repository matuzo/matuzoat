---
title: 'Highlighting columns in HTML tables'
permalink: blog/highlighting-columns/index.html
metadescription: 'The col element allows us to style columns in tables.'
date: 2021-03-20T06:58:54.969Z
teaser: 'The `col` element allows us to style columns in tables.'
tags:
  - blog
  - posts
  - html
image: articles/sm_tables.png
---

In the past, I’ve used the `colgroup` and `col` elements to define max-widths for columns in tables when I didn’t want to rely on the default algorithm for distribution of widths, usually when building templates for e-mail newsletters.

<h3>A simple table with dummy content</h3>

```html
<table>
  <thead>
    <tr>
      <th>First column</th>
      <th>Second column</th>
      <th>Third column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>First cell</td>
      <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, dolor delectus. Modi accusamus id magni.</td>
      <td>Last cell</td>
    </tr>
  </tbody>
</table>
```

<style>
td, th {
  border: 1px solid #aaa;
  padding: 0.2rem;
}
</style>

<table>
  <thead>
    <tr>
      <th>First column</th>
      <th>Second column</th>
      <th>Third column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>First cell</td>
      <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, dolor delectus. Modi accusamus id magni.</td>
      <td>Last cell</td>
    </tr>
  </tbody>
</table>

<h3>A simple table with dummy content and a fixed width for the first and last column</h3>

```html
<table>
  <colgroup>
    <col width="150">
    <col>
    <col width="150">
  </colgroup>
  <thead>
   …
</table>
```

<table>
  <colgroup>
    <col width="150">
    <col>
    <col width="150">
  </colgroup>
  <thead>
    <tr>
      <th>First column</th>
      <th>Second column</th>
      <th>Third column</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>First cell</td>
      <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, dolor delectus. Modi accusamus id magni.</td>
      <td>Last cell</td>
    </tr>
  </tbody>
</table>

### Styling columns

The other day I looked up [colgroup on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup) because something didn’t work the way I expected it to work. I found the solution to my problem, but the demo at the beginning of the page also caught my attention. The author adds a class to the `col` element, which does nothing with the `col` element itself, at least not visually, because the element doesn’t get rendered on the page, but it applies the styles from the class to all the cells in the column.  
Why is this interesting? Well, there are no columns in HTML tables, only rows and cells and the `col` element allows us to style columns anyway.

<style>
   .heading-table {
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%;
      max-width: 55ch;
   }

   .heading-table caption {
      font-size: 1.1em;
      text-align: left;
      font-weight: bold;
      margin-bottom: 0.5em;
   }

   .heading-table a:link,
   .heading-table a:visited {
      color: #000;
   }

   .heading-table .highlight,
   .heading-table col:target {
      background: #dedede;
   }
</style>

```css
.highlight {
   background: #dedede;
}
```

```html
<table>
  <caption>Frequency and average use of heading elements.</caption>
  <colgroup>
    <col>
    <col class="highlight">
    <col>
  </colgroup>
   <thead>
      <tr>
         <th>Heading</th>
         <th>Occurrences</th>
         <th>Average per page</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td><code>h1</code></td>
         <td>10,524,810</td>
         <td>1.66</td>
      </tr>
   …
```

<table class="heading-table">
  <caption>Frequency and average use of heading elements.</caption>
  <colgroup>
    <col>
    <col class="highlight">
    <col>
  </colgroup>
    <thead>
      <tr>
        <th>Heading</th>
        <th>Occurrences</th>
        <th>Average per page</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>h1</code></td>
        <td>10,524,810</td>
        <td>1.66</td>
      </tr>
      <tr>
        <td><code>h2</code></td>
        <td>37,312,338</td>
        <td>5.88</td>
      </tr>
      <tr>
        <td><code>h3</code></td>
        <td>44,135,313</td>
        <td>6.96</td>
      </tr>
      <tr>
        <td><code>h4</code></td>
        <td>20,473,598</td>
        <td>3.23</td>
      </tr>
      <tr>
        <td><code>h5</code></td>
        <td>8,594,500</td>
        <td>1.36</td>
      </tr>
      <tr>
        <td><code>h6</code></td>
        <td>3,527,470</td>
        <td>0.56</td>
      </tr>
      <tr>
        <td><code>h7</code></td>
        <td>30,073</td>
        <td>0.005</td>
      </tr>
      <tr>
        <td><code>h8</code></td>
        <td>9,266</td>
        <td>0.0015</td>
      </tr>
    </tbody>
  </table>
</table>

That’s pretty cool, but what’s even better is that we can let users decide which column they want to highlight and they can even share a link to the table with a specific column highlighted.

We can do that by adding `id`s to the `col` elements and styling them differently, if the `id` matches the URL’s fragment (#myid).

```css
col:target {
  background: #dedede;
}
```

```html
<table>
  <caption>Frequency and average use of heading elements.</caption>
  <colgroup>
    <col id="table1-heading">
    <col id="table1-occurrences">
    <col id="table1-average">
  </colgroup>
    <thead>
      <tr>
        <th><a href="#table1-heading">Heading</a></th>
        <th><a href="#table1-occurrences">Occurrences</a></th>
        <th><a href="#table1-average">Average per page</a></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>h1</code></td>
        <td>10,524,810</td>
        <td>1.66</td>
      </tr>
      <tr>
        <td><code>h2</code></td>
        <td>37,312,338</td>
        <td>5.88</td>
      </tr>
      <tr>
        <td><code>h3</code></td>
        <td>44,135,313</td>
        <td>6.96</td>
      </tr>
      <tr>
        <td><code>h4</code></td>
        <td>20,473,598</td>
        <td>3.23</td>
      </tr>
      <tr>
        <td><code>h5</code></td>
        <td>8,594,500</td>
        <td>1.36</td>
      </tr>
      <tr>
        <td><code>h6</code></td>
        <td>3,527,470</td>
        <td>0.56</td>
      </tr>
      <tr>
        <td><code>h7</code></td>
        <td>30,073</td>
        <td>0.005</td>
      </tr>
      <tr>
        <td><code>h8</code></td>
        <td>9,266</td>
        <td>0.0015</td>
      </tr>
    </tbody>
  </table>
</table>
```

Click on any of the table headings and refresh the page to see it in action.

<table class="heading-table">
  <caption>Frequency and average use of heading elements.</caption>
  <colgroup>
    <col id="table1-heading">
    <col id="table1-occurrences">
    <col id="table1-average">
  </colgroup>
    <thead>
      <tr>
        <th><a href="#table1-heading">Heading</a></th>
        <th><a href="#table1-occurrences">Occurrences</a></th>
        <th><a href="#table1-average">Average per page</a></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>h1</code></td>
        <td>10,524,810</td>
        <td>1.66</td>
      </tr>
      <tr>
        <td><code>h2</code></td>
        <td>37,312,338</td>
        <td>5.88</td>
      </tr>
      <tr>
        <td><code>h3</code></td>
        <td>44,135,313</td>
        <td>6.96</td>
      </tr>
      <tr>
        <td><code>h4</code></td>
        <td>20,473,598</td>
        <td>3.23</td>
      </tr>
      <tr>
        <td><code>h5</code></td>
        <td>8,594,500</td>
        <td>1.36</td>
      </tr>
      <tr>
        <td><code>h6</code></td>
        <td>3,527,470</td>
        <td>0.56</td>
      </tr>
      <tr>
        <td><code>h7</code></td>
        <td>30,073</td>
        <td>0.005</td>
      </tr>
      <tr>
        <td><code>h8</code></td>
        <td>9,266</td>
        <td>0.0015</td>
      </tr>
    </tbody>
  </table>
</table>

Notes on accessibility: 1. I’m not sure if using links in table headings is the best idea. At least, they need better labels to provide users with context. 2. This technique only highlights columns visually, not semantically. 


<small>
   Data from: <a href="https://almanac.httparchive.org/en/2020/markup#headings">https://almanac.httparchive.org/en/2020/markup#headings</a>
</small>

