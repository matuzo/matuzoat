let observer;

function loadImage(image) {
  const src = image.dataset.src;
  return fetchImage(src).then(() => {
    image.classList.add('lazyloaded');
    image.src = src;
    image.removeAttribute('data-src');
  });
}

function fetchImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    if (url) {
      image.src = url;
    }
    image.onload = resolve;
    image.onerror = reject;
  });
}

function imageVisible(entries) {
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    if (entry.intersectionRatio > 0) {
      const image = entry.target;
      loadImage(image);
      image.classList.remove('lazy');

      observer.unobserve(image);
    }
  }
}

function lazyLoad(images) {
  if (images.length) {
    observer = new IntersectionObserver(imageVisible, {
      rootMargin: '100px 0px'
    });

    for (let i = 0; i < images.length; i++) {
      let image = images[i];
      if (image.classList.contains('lazyloaded')) {
        continue;
      }

      observer.observe(image);
    }
  }
}

export default lazyLoad;
