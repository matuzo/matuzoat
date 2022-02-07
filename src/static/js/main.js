const getRandomInt = max => {
  return Math.floor(Math.random() * max);
}

const getRandomTIL = () => {
  if (document.querySelector("[data-random-til]")) {
    console.log("yes");
    const block = document.querySelector("[data-random-til]");

    fetch("/data/til.json")
      .then((response) => response.json())
      .then((data) => {
        const til = data[getRandomInt(data.length)]
        const link = block.querySelector('h3 a')
        const no = til.no
        link.textContent = `#${no} ${til.title}`
        console.log(`/til#${no}`)
        link.setAttribute('href', `/til#no${no}`)

        block.querySelector('.til-code').innerHTML = til.content
        block.dataset.randomTil = "loaded";
      });
  }
};

const DOMLoaded = () => {
  getRandomTIL();
};

document.documentElement.classList.replace('no-js', 'js')

document.addEventListener("DOMContentLoaded", DOMLoaded, false);