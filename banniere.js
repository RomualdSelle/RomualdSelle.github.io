function fadeInOutText() {
    const text1 = document.getElementById("text1");
    const text2 = document.getElementById("text2");
    const text3 = document.getElementById("text3");

    setTimeout(() => {
      text1.classList.add("fadeOut");
      setTimeout(() => {
        text1.classList.add("hidden");
        text2.classList.remove("hidden");
        text2.classList.add("fadeIn");
      }, 3000);
    }, 1000);

    setTimeout(() => {
      text2.classList.add("fadeOut");
      setTimeout(() => {
        text2.classList.add("hidden");
        text3.classList.remove("hidden");
        text3.classList.add("fadeIn");
      }, 3000);
    }, 5000);
  }

  window.addEventListener("load", fadeInOutText);

  function openModal(imageSrc) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modalImage");

    modalImage.src = imageSrc;
    modal.classList.remove("hidden");
  }

  function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden");
  }

function toggleText() {
  const paragraph = document.getElementById("philosophy-paragraph");
  const button = document.getElementById("toggle-button");

  if (paragraph.classList.contains("hidden")) {
    paragraph.classList.remove("hidden");
    button.textContent = "Masquer le texte";
  } else {
    paragraph.classList.add("hidden");
    button.textContent = "Afficher le texte";
  }
}