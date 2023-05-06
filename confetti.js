// Nombre de confettis à afficher
const confettiCount = 1000;

// Couleurs et formes des confettis
const confettiColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
const confettiShapes = ["circle", "square"];

// Fonction pour créer un confetti
function createConfetti() {
  const confetti = document.createElement("div");
  const size = Math.random() * 10 + 5;
  const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
  const color = confettiColors[Math.floor(Math.random() * confettiColors.length)];

  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  confetti.style.backgroundColor = color;
  confetti.style.position = "fixed";
  confetti.style.zIndex = "9999";
  confetti.style.top = "-50px";
  confetti.style.left = `${Math.random() * 100}vw`;

  if (shape === "circle") {
    confetti.style.borderRadius = "50%";
  } else {
    confetti.style.borderRadius = "0";
  }

  document.body.appendChild(confetti);
  animateConfetti(confetti);
}

// Fonction pour animer un confetti
function animateConfetti(confetti) {
  const duration = Math.random() * 3000 + 2000;
  const horizontalSpeed = Math.random() * 2 - 1;
  const verticalSpeed = Math.random() * 0.5 + 0.5;

  confetti.animate(
    [
      { transform: `translate(0, 0)`, opacity: 1 },
      {
        transform: `translate(${horizontalSpeed * duration}%, ${
          verticalSpeed * duration
        }px)`,
        opacity: 0
      }
    ],
    {
      duration: duration,
      easing: "linear"
    }
  );

  setTimeout(() => {
    confetti.remove();
  }, duration);
}

// Crée et anime les confettis
for (let i = 0; i < confettiCount; i++) {
  setTimeout(createConfetti, Math.random() * 5000);
}

// Fonction pour afficher le texte arc-en-ciel
function displayRainbowText() {
  const container = document.createElement("div");
  container.classList.add("rainbow-text-container");

  const textElement = document.createElement("div");
  textElement.classList.add("rainbow-text");

  const line1 = document.createElement("span");
  line1.innerText = "BRAVO, VOUS ÊTES\n";
  textElement.appendChild(line1);

  const line2 = document.createElement("span");
  line2.innerText = "LE PREMIER VISITEUR";
  textElement.appendChild(line2);

  container.appendChild(textElement);
  document.body.appendChild(container);

  // Fait disparaître le texte en fondu après 5 secondes
  setTimeout(() => {
    container.classList.add("fadeOut");
  }, 5000);

  // Supprime le texte après 7 secondes
  setTimeout(() => {
    container.remove();
  }, 7000);
}

// Affiche le texte arc-en-ciel lors du chargement de la page
window.addEventListener("load", () => {
  displayRainbowText();
});