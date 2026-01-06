const inputElement = document.querySelector(".search-icon-box input");
const tnSmLogo = document.querySelector(".tn-small-logo");
const tnBigLogo = document.querySelector(".tn-big-logo");
const cardsContainer = document.querySelector(".cards-container");
const background = document.querySelector("body");
icon = $(".icon");
inputElement.value = "";
var serchOpened = false;

window.onload = function() {
  document.querySelector("nav").classList.add("nav-loaded");
  document.querySelector(".tn-big-logo").classList.add("tn-loaded");
};

document.querySelectorAll(".icon")[0].addEventListener("click", function() {
  inputElement.classList.remove("invisible");
  $(".icon1 path").removeClass("icon-hover-in");
  $(".icon1 path").addClass("icon-hover-out");
  serchOpened = true;
  tnSmLogo.classList.remove("tn-small-logo-visible");
  if (!inputElement.classList.contains("invisible")) {
    inputElement.focus();
    inputElement.addEventListener("focusout", function handleFocusOut() {
      serchOpened = false;
      setTimeout(() => {
        inputElement.classList.add("invisible");
        tnSmLogo.classList.add("tn-small-logo-visible");
      }, 400);
      clearTimeout(handleFocusOut);
      inputElement.removeEventListener("focusout", handleFocusOut);
    });

    document.addEventListener("keydown", function handleKeyDown(event) {
      const userInput = inputElement.value;
      if (event.key === "Enter") {
        serchOpened = false;
        inputElement.blur();
        window.location.href = `https://www.google.com/search?q=${userInput}`;
        document.removeEventListener("keydown", handleKeyDown);
      }

      if (event.key === "Escape") {
        serchOpened = false;
        inputElement.value = "";
        inputElement.blur();
        document.removeEventListener("keydown", handleKeyDown);
      }
    });
  }
});

var scrolledDown = false;
var isScrolling = false;

document.addEventListener("wheel", function handleWheel(event) {

  if (isScrolling === true) {
      return;
  }

  else {
      scrolling(event)         
  }

});

function scrolling(event){
  if (scrolledDown === false) {
      if (event.deltaY > 0) {
          if(tnBigLogo.classList.contains("tn-loaded")) {
              tnBigLogo.classList.remove("tn-loaded");
              tnBigLogo.classList.add("tn-slide-out");
              cardsContainer.classList.add("cards-slide-in");
              background.classList.add("background-blur-in");
              setTimeout(() => {
                  $(".card").addClass("cards-fade-in");
              }, 500);
          }
          if(tnBigLogo.classList.contains("tn-slide-in")) {
              tnBigLogo.classList.remove("tn-slide-in");
              tnBigLogo.classList.add("tn-slide-out");
              cardsContainer.classList.add("cards-slide-in");
              cardsContainer.classList.remove("cards-slide-out");
              background.classList.add("background-blur-in");
              background.classList.remove("background-blur-out");
              setTimeout(() => {
                $(".card").removeClass("cards-fade-out");
                $(".card").addClass("cards-fade-in");
              }, 500);
          }
          isScrolling = true;
          scrolledDown = true;
          setTimeout(() => {
              isScrolling = false;
          }, 1000);
      } 
      }
      if (scrolledDown === true) {
          if (event.deltaY < 0) {
              if(tnBigLogo.classList.contains("tn-slide-out")) {
                  $(".card").removeClass("cards-fade-in");
                  $(".card").addClass("cards-fade-out");

                  setTimeout(() => {
                    $(".card").removeClass("cards-fade-out");
                    $(".card").removeClass("card-hover-close");
                    $(".card").removeClass("card-hover-open");
                  }, 1000);

                      tnBigLogo.classList.remove("tn-slide-out");
                      tnBigLogo.classList.add("tn-slide-in");
                      cardsContainer.classList.remove("cards-slide-in");
                      cardsContainer.classList.add("cards-slide-out");
                      background.classList.remove("background-blur-in");
                      background.classList.add("background-blur-out");
                      $("body").css("background-image", 'url("./images/background-mountain.png")');
                      
              }
              isScrolling = true;
              scrolledDown = false;
            }
            setTimeout(() => {
              isScrolling = false;
          }, 1000);
      }       
}

var cardOpened = false;
var mouseOnCard1 = false;
var mouseOnCard2 = false;
var mouseOnCard3 = false;

$(".card").on("mouseenter", function() {
  var cardHovered = this.classList[1];

  if (cardHovered === "card-montagne") {
    mouseOnCard1 = true;
    setTimeout(() => {
      if (mouseOnCard1) {
        openCard(this);
        console.log("mouseOnCard1: open");
      }
    }, 200);
  }

  if (cardHovered === "card-laghi") {
    mouseOnCard2 = true;
    setTimeout(() => {
      if (mouseOnCard2) {
        openCard(this);
        console.log("mouseOnCard2: open");
      }
    }, 200);
  }

  if (cardHovered === "card-paesini") {
    mouseOnCard3 = true;
    setTimeout(() => {
      if (mouseOnCard3) {
        openCard(this);
        console.log("mouseOnCard3: open");
      }
    }, 200);
  }
});

// Add event listener for "not hovering" event
$(".card").on("mouseleave", function() {
  var cardHovered = this.classList[1];

  if (cardHovered === "card-montagne") {
    mouseOnCard1 = false;
    setTimeout(() => {
      if (!mouseOnCard1) {
        closeCard(this);
        console.log("mouseOnCard1: close");
      }
    }, 800);
  }

  if (cardHovered === "card-laghi") {
    mouseOnCard2 = false;
    setTimeout(() => {
      if (!mouseOnCard2) {
        closeCard(this);
        console.log("mouseOnCard2: close");
      }
    }, 800);
  }

  if (cardHovered === "card-paesini") {
    mouseOnCard3 = false;
    setTimeout(() => {
      if (!mouseOnCard3) {
        closeCard(this);
        console.log("mouseOnCard3: close");
      }
    }, 800);
  }
});

function openCard(card) {
  card.classList.add("card-hover-open");
  card.classList.remove("card-hover-close");
  var cardName ="." + card.classList[1];
  $(cardName +" h1").addClass("text-fade-out");
  $(cardName +" h1").removeClass("text-fade-in");
  $(cardName +" h2").addClass("text-fade-in");
  $(cardName +" h2").removeClass("text-fade-out");
  $(cardName +" p").addClass("text-fade-in");
  $(cardName +" p").removeClass("text-fade-out");
  $("body").css("background-image", "url("+$(cardName + " img").attr("src")+")");
}

function closeCard(card) {
  card.classList.add("card-hover-close");
  card.classList.remove("card-hover-open");
  var cardName ="." + card.classList[1];
  $(cardName +" h1").addClass("text-fade-in");
  $(cardName +" h1").removeClass("text-fade-out");
  $(cardName +" h2").addClass("text-fade-out");
  $(cardName +" h2").removeClass("text-fade-in");
  $(cardName +" p").addClass("text-fade-out");
  $(cardName +" p").removeClass("text-fade-in");
}

$(".icon").on("mouseenter", function mouseOverIcon() {
  if (serchOpened === false) {
    var iconHovered = "." + this.classList[1] + " path";
    $(iconHovered).addClass("icon-hover-in");
    $(iconHovered).removeClass("icon-hover-out");
  }
});

$(".icon").on("mouseleave", function MouseNotOverIcon() {
  if (serchOpened === false) {
    var iconHovered = "." + this.classList[1] + " path";
    $(iconHovered).addClass("icon-hover-out");
    $(iconHovered).removeClass("icon-hover-in");
  }
});










