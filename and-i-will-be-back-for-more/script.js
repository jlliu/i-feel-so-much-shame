const params = new URLSearchParams(window.location.search);
const isHorizontal = params.get("horizontal");
const thisFrame = 1;
const maxFrames = 9;

if (isHorizontal == "true" || isHorizontal == null) {
  document.body.classList.add("horizontal");
} else {
  document.body.classList.add("vertical");
}

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let buttonDimensions = { width: 420, height: 264 };
let originalDimensions = { width: 1280, height: 720 };
let ratio = originalDimensions.width / originalDimensions.height;
let button = document.querySelector("button");

function resizeWindow() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  // let currentRatio = windowHeight / 720;

  let widthToHeight = windowWidth / windowHeight;
  //Window is wider than normal, width of button will scale
  if (widthToHeight > ratio) {
    let scaleRatio = windowWidth / originalDimensions.width;
    let newButtonWidth = scaleRatio * buttonDimensions.width;
    let newButtonHeight =
      newButtonWidth * (buttonDimensions.height / buttonDimensions.width);
    button.style.width = `${newButtonWidth}px`;
    button.style.height = `${newButtonHeight}px`;
  } else {
    let scaleRatio = windowHeight / originalDimensions.height;
    let newButtonHeight = scaleRatio * buttonDimensions.height;
    let newButtonWidth =
      newButtonHeight * (buttonDimensions.width / buttonDimensions.height);
    button.style.width = `${newButtonWidth}px`;
    button.style.height = `${newButtonHeight}px`;
  }
}

window.onresize = resizeWindow;

resizeWindow();

let random = Math.floor(Math.random() * 100);

let randomFrame = Math.floor(Math.random() * maxFrames) + 1;

button.addEventListener("click", function () {
  // Create a new iframe with another random image
  // You should split this page up into two iframes...
  let iframe1 = document.createElement("iframe");
  let iframe2 = document.createElement("iframe");

  if (isHorizontal == "true" || isHorizontal == null) {
    // If page is horizontal, make new ones vertical
    iframe1.src = `${thisFrame}/?randomNum=${random}&horizontal=false`;
    iframe2.src = `${randomFrame}/?randomNum=${random}&horizontal=false`;
    // iframe2.src = `/2/?randomNum=${random}&horizontal=false`;
  } else {
    iframe1.src = `${thisFrame}/?randomNum=${random}&horizontal=true`;
    iframe2.src = `${randomFrame}/?randomNum=${random}&horizontal=true`;
    // iframe2.src = `/2/?randomNum=${random}&horizontal=true`;
  }
  document.body.appendChild(iframe1);
  document.body.appendChild(iframe2);
});

// Needs to not only animate but hover...

// We need bg divs for this frame, with hover/ not hover, and each state

let bgDivs = [];

let versions = 3;

let hovering = "false";

for (var i = 1; i < versions + 1; i++) {
  let newDivDefault = document.createElement("div");
  newDivDefault.style.backgroundImage = `url(img/${thisFrame}/default/${i}.png)`;
  newDivDefault.dataset.num = i;
  newDivDefault.dataset.hover = false;
  bgDivs.push(newDivDefault);
  document.body.appendChild(newDivDefault);

  let newDivHover = document.createElement("div");
  newDivHover.style.backgroundImage = `url(img/${thisFrame}/hover/${i}.png)`;
  newDivHover.dataset.num = i;
  newDivHover.dataset.hover = true;
  bgDivs.push(newDivHover);
  document.body.appendChild(newDivHover);
}

//Cycle through divs while noting whether or not is hovering
let visibleNum = 1;
window.setInterval(function () {
  visibleNum++;

  //Cycle through frames
  bgDivs.forEach(function (div) {
    if (
      div.dataset.num == (visibleNum % versions) + 1 &&
      div.dataset.hover == hovering
    ) {
      div.style.visibility = "visible";
    } else {
      div.style.visibility = "hidden";
    }
  });
}, 180);

button.addEventListener("mouseenter", function () {
  hovering = "true";
});

button.addEventListener("mouseleave", function () {
  hovering = "false";
});
