const thisFrame = 50;
let buttonDimensions = { width: 256, height: 100 };

const userAgentString = navigator.userAgent;
const isChrome = navigator.userAgent.indexOf("Chrome") > -1;
const isMobile =
  navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) !== null;
let workaroundFlow = !isChrome || isMobile;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

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

button.addEventListener("click", function () {
  if (!workaroundFlow) {
    let iframe = document.createElement("iframe");
    iframe.src = `/and-i-go-to-meet-it/${thisFrame + 1}/`;
    document.body.appendChild(iframe);
    versions = 1;
    clearInterval(animationInterval);
  } else {
    window.location.href = `/and-i-go-to-meet-it/${thisFrame + 1}/`;
  }
});

// Needs to not only animate but hover...

// We need bg divs for this frame, with hover/ not hover, and each state

let bgDivs = [];
let versions = 3;
let hovering = "false";

for (var i = 1; i < versions + 1; i++) {
  let newDivDefault = document.createElement("div");
  newDivDefault.style.backgroundImage = `url(/and-i-go-to-meet-it/img/${thisFrame}/default/${i}.jpeg)`;
  newDivDefault.dataset.num = i;
  newDivDefault.dataset.hover = false;
  bgDivs.push(newDivDefault);
  document.body.appendChild(newDivDefault);

  let newDivHover = document.createElement("div");
  newDivHover.style.backgroundImage = `url(/and-i-go-to-meet-it/img/${thisFrame}/hover/${i}.jpeg)`;
  newDivHover.dataset.num = i;
  newDivHover.dataset.hover = true;
  bgDivs.push(newDivHover);
  document.body.appendChild(newDivHover);
}

//Cycle through divs while noting whether or not is hovering
let visibleNum = 1;
let animationInterval = window.setInterval(function () {
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
