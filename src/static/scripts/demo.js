// Demos

const demos = document.querySelectorAll('.js-demo');
let demoObserver;

function demoAddButton(demo) {
  const controls = document.createElement('div');
  controls.classList.add('demo__controls');
  const button = document.createElement('button');
  const button_inner = document.createElement('span');
  button_inner.classList.add('btn__inner');
  button_inner.textContent = 'Replay animation';
  button.appendChild(button_inner);

  button.classList.add('btn');
  button.classList.add('demo__btn');

  button.addEventListener('click', function() {
    demo.classList.remove('demo--playing');
    setTimeout(() => {
      demo.classList.add('demo--playing');
    }, 600);
  });

  controls.appendChild(button);
  demo.appendChild(controls);
}

function demoVisible(entries) {
  for (let i = 0; i < entries.length; i++) {
    let entry = entries[i];
    if (entry.intersectionRatio === 1) {
      setTimeout(() => {
        entry.target.classList.add('demo--playing');

        demoObserver.unobserve(entry.target);
      }, 400);
    }
  }
}

function enhanceDemos() {
  if (demos.length) {
    for (let i = 0; i < demos.length; i++) {
      const demo = demos[i];
      demoAddButton(demo);

      demoObserver = new IntersectionObserver(demoVisible, {
        threshold: [1]
      });

      if (demo.classList.contains('demo--playing')) {
        continue;
      }

      demoObserver.observe(demo);
    }
  }
}

export default enhanceDemos;
