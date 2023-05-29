---
title: "Deleted files in a freshly cloned git repo"
metadescription: 'Forbidden characters in file names mess with git repos on Windows.'
teaser: 'The other day someone emailed me and told me that they tried to clone the [HTMHell repo](https://github.com/matuzo/HTMHell), but they only got an empty folder (except for the hidden .git folder), and all files were deleted as if they cloned the repo and immediately moved all files into the trash.'
date: 2023-05-29T12:38:54.969Z
tags:
  - blog
  - posts
  - html
image: articles/sm_gitfiles.jpg
---

<style>
  li {
    margin: 0 !important;
  }
</style>

I couldn't reproduce the issue on my Mac, but I had the same problem on my Windows machine. This [post on StackOverflow](https://stackoverflow.com/a/61079472) suggested that it was related to using forbidden characters in file names. 


<div class="highlight">

  Forbidden characters in file names on Windows:

  * &lt; (less than)
  * &gt; (greater than)
  * : (colon)
  * " (double quote)
  * / (forward slash)
  * \ (backslash)
  * | (vertical bar or pipe)
  * ? (question mark)
  * &ast; (asterisk)

</div>

I reviewed the files and found an image named _30-bullet-"list".png_. I have a node script that automatically creates the social media preview images for blog posts and uses the title as the file name. I forgot to take care of special characters.

I tweaked the script and renamed the file, and – voilà – cloning now works as expected on Windows.

Edit: [Tane added on social media](https://front-end.social/@tanepiper@tane.codes/110450742495407620) that he had an issue raised once on one of his repos because he was using an emoji in a filename and it broke on OSX.

Conclusion: Don't use special characters, spaces, or emojis in your file names.