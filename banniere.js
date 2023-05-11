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

function toggleText(textId, buttonId) {
  const paragraph = document.getElementById(textId);
  const button = document.getElementById(buttonId);

  if (paragraph.classList.contains("hidden")) {
    paragraph.classList.remove("hidden");
    button.textContent = "Masquer le texte";
      if (button.classList.contains("animsens")) {
          button.classList.remove("animsens");
          button.classList.add("animsens1");
      }
  } else {
    paragraph.classList.add("hidden");
    button.textContent = "Afficher le texte";
      if (button.classList.contains("animsens1")) {
          button.classList.remove("animsens1");
          button.classList.add("animsens");
      }
   }
}

document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 100) {
            backToTopButton.style.display = "flex";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

document.addEventListener('touchstart', function() {

  let elements = document.querySelectorAll('.animcursor');

  for(let i = 0; i < elements.length; i++) {
    elements[i].classList.remove('animcursor');
    elements[i].classList.add('animsens');
  }
});
