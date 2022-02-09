(function () {
    let scrollbar = document.querySelector(".js-scrollbar");
    let backgroundContainer = document.querySelector(".concept-container");
    let parentContainer = document.querySelector(".container-element");
    let leftContents = document.querySelectorAll(".js-left > div");
    let rightContents = document.querySelectorAll(".js-right > div");
  
    let previousScrollValue = Math.round(scrollbar.value, 0);
    let currentScrollValue = previousScrollValue;
  
    // Factoriastion des actions de sortie d'éléments
    const step2Actions = (element) => {
      element[previousScrollValue].classList.add("js-hide");
      element[previousScrollValue].classList.remove("js-active");
      element[previousScrollValue].classList.remove("js-transitionOff");
  
      element[currentScrollValue].classList.remove("js-hide");
      element[currentScrollValue].classList.add("js-transitionOn");
    };
  
    // Factoriastion des actions de rentré d'éléments
    const step3Actions = (element) => {
      element[currentScrollValue].classList.remove("js-transitionOn");
      element[currentScrollValue].classList.add("js-active");
    };
  
    // Termine les animations
    const step3 = () => {
      step3Actions(leftContents);
      step3Actions(rightContents);
  
      previousScrollValue = currentScrollValue;
  
      parentContainer.removeEventListener("animationend", step3);
    };
  
    // Déclenche l'animation de rentré des éléments suivants
    const step2 = function () {
      step2Actions(leftContents);
      step2Actions(rightContents);
  
      parentContainer.removeEventListener("animationend", step2);
  
      // Permet de ne pas exécuter tout de suite la step3
      setTimeout(() => {
        parentContainer.addEventListener("animationend", step3);
      }, 0);
    };
  
    // Permet de réinitialiser les états des classes des éléments
    // en cas de rupture avant fin d'animation
    const reset = (container) => {
      container.forEach((element, i) => {
        element.classList.remove("js-transitionOff");
        element.classList.remove("js-transitionOn");
  
        if (i === currentScrollValue) {
          element.classList.add("js-active");
          element.classList.remove("js-hide");
        } else {
          element.classList.remove("js-active");
          element.classList.add("js-hide");
        }
      });
    };
  
    // Déclenche le changement de background-color
    const ColorChange = function (currentScrollValue) {
      switch (currentScrollValue) {
        case 0 :
          backgroundContainer.style.background = '#88bc86';
          break;
        case 1 :
          backgroundContainer.style.background = '#eae8ad';
          break;
        case 2 :
          backgroundContainer.style.background = '#C19F9F';
          break;
        case 3 :
          backgroundContainer.style.background = '#afccd3';
          break;
        default :
          backgroundContainer.style.background = '#CECDCD';
          console.log('Default color actived')
      }
    }

    // Déclenche l'animation de sortie des éléments courants
    const step1 = function (newScrollValue) {
      reset(leftContents);
      reset(rightContents);
  
      parentContainer.removeEventListener("animationend", step3);
      parentContainer.removeEventListener("animationend", step2);
  
      leftContents[previousScrollValue].classList.add("js-transitionOff");
      rightContents[previousScrollValue].classList.add("js-transitionOff");
  
      // Activation de la nouvelle div
      currentScrollValue = newScrollValue;
        
      ColorChange(currentScrollValue)

      parentContainer.addEventListener("animationend", step2);
    };
  
    scrollbar.addEventListener("input", (evt) => {
      const scrollValue = parseInt(evt.target.value, 10);
  
      step1(scrollValue);
    });
  })();
  