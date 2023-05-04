  const confettiCount = 1000;
  const confettiColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  const confettiShapes = ['circle', 'square', 'triangle'];

  function createConfetti() {
    const confetti = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
    const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = color;
    confetti.style.position = 'fixed';
    confetti.style.zIndex = '9999';
    confetti.style.top = '-20px';
    confetti.style.left = `${Math.random() * 100}vw`;

    if (shape === 'circle') {
      confetti.style.borderRadius = '50%';
    } else if (shape === 'square') {
      confetti.style.borderRadius = '0';
    } else {
      confetti.style.width = '0';
      confetti.style.height = '0';
      confetti.style.borderLeft = `${size}px solid transparent`;
      confetti.style.borderRight = `${size}px solid transparent`;
      confetti.style.borderBottom = `${size * 2}px solid ${color}`;
      confetti.style.backgroundColor = 'transparent';
    }

    document.body.appendChild(confetti);
    animateConfetti(confetti);
  }

  function animateConfetti(confetti) {
    const duration = Math.random() * 6000 + 4000;
    const horizontalSpeed = (Math.random() * 2 - 1) * 3;
    const verticalSpeed = Math.random() * 0.5 + 0.5;

    confetti.animate(
      [
        { transform: `translate(0, 0)`, opacity: 1 },
        { transform: `translate(${horizontalSpeed * duration}%, ${verticalSpeed * duration}px)`, opacity: 0 }
      ],
      {
        duration: duration,
        easing: 'linear',
      }
    );

    setTimeout(() => {
      confetti.remove();
    }, duration);
  }

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(createConfetti, Math.random() * 5000);
  }

function displayRainbowText() {
  const container = document.createElement('div');
  container.classList.add('rainbow-text-container');

  const textElement = document.createElement('div');
  textElement.classList.add('rainbow-text');

  const line1 = document.createElement('span');
  line1.innerText = 'BRAVO, VOUS ÊTES\n';
  textElement.appendChild(line1);

  const line2 = document.createElement('span');
  line2.innerText = 'LE PREMIER VISITEUR';
  textElement.appendChild(line2);

  container.appendChild(textElement);
  document.body.appendChild(container);

  setTimeout(() => {
    container.classList.add('fadeOut');
  }, 5000);

  setTimeout(() => {
    container.remove();
  }, 7000);
}

window.addEventListener('load', () => {
  displayRainbowText();
});
