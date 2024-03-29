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

function openModal(imageTheme, imagePosition) {
    const modal = document.getElementById("modal-" + imageTheme);
    const image = document.getElementById("modal-image-" + imageTheme);
    
    image.style.left = imagePosition;
    modal.classList.remove("hidden");
}

  function closeModal(imageTheme) {
    const modal = document.getElementById("modal-" + imageTheme);
    modal.classList.add("hidden");
  }

function scrollLeftTriangle(imageTheme, imageNumber) {
    const image = document.getElementById("modal-image-" + imageTheme);
    const imagePosition = parseInt(image.style.left);
    
    if (imagePosition == 0) {
        image.style.left = ((imageNumber - 1) * -110) + "%";
    } else {
        image.style.left = (imagePosition + 110) + "%";
    }
}

function scrollRightTriangle(imageTheme, imageNumber) {
    const image = document.getElementById("modal-image-" + imageTheme);
    const imagePosition = parseInt(image.style.left);
    
    if (imagePosition == (imageNumber -1) * -110) {
        image.style.left = 0;
    } else {
        image.style.left = (imagePosition - 110) + "%";
    }
}

function toggleText(textId, buttonId, webAdress) {
  const paragraph = document.getElementById(textId);
  const button = document.getElementById(buttonId);

  if (paragraph.classList.contains("hidden")) {
    paragraph.classList.remove("hidden");
    paragraph.classList.add("nohidden");
    button.textContent = "Masquer le texte";
  } else if (paragraph.classList.contains("nohidden")) {
    paragraph.classList.remove("nohidden");
    paragraph.classList.add("hidden");
    button.textContent = "Afficher le texte";
  }
  if (button.classList.contains("finger1")) {
      button.classList.remove("finger1");
      button.classList.add("finger2");
      if (textId.includes("trans")) {
          setTimeout(function() {
              button.classList.remove("finger2");
              button.classList.add("finger1");
              setTimeout(function() {
                  window.location.href = webAdress;
              }, 300);              
          }, 300);
      }
  } else if (button.classList.contains("finger2")) {
    button.classList.remove("finger2");
    button.classList.add("finger1");
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
});

document.addEventListener("touchstart", function() {
  function replaceElement(id) {
      let linkElement = document.getElementById(id);
      let newElement = document.createElement("p");
      let onclickValue = linkElement.getAttribute("onclick");

      newElement.id = linkElement.id;
      newElement.className = linkElement.className;
      newElement.setAttribute("onclick", onclickValue);
      newElement.innerHTML = linkElement.innerHTML;
      linkElement.parentNode.replaceChild(newElement, linkElement);
  }
  
  replaceElement("trans1")
  replaceElement("trans2")
  
  let elements = document.querySelectorAll(".cursor");

  for(let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("cursor");
    elements[i].classList.add("finger1");
  } 
});
