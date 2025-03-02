const thisFrame = 1;
const maxFrames = 5;
let buttonDimensions = { width: 443, height: 100 };

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

let iframe = document.createElement("iframe");
button.addEventListener("click", function () {
  if (!workaroundFlow) {
    iframe.src = `${thisFrame + 1}/`;
    document.body.appendChild(iframe);
    versions = 1;
    clearInterval(animationInterval);
  } else {
    window.location.href = `${thisFrame + 1}/`;
  }
});

// Needs to not only animate but hover...

// We need bg divs for this frame, with hover/ not hover, and each state

let bgDivs = [];
let versions = 3;
let hovering = "false";

for (var i = 1; i < versions + 1; i++) {
  let newDivDefault = document.createElement("div");
  newDivDefault.style.backgroundImage = `url(img/${thisFrame}/default/${i}.jpeg)`;
  newDivDefault.dataset.num = i;
  newDivDefault.dataset.hover = false;
  bgDivs.push(newDivDefault);
  document.body.appendChild(newDivDefault);

  let newDivHover = document.createElement("div");
  newDivHover.style.backgroundImage = `url(img/${thisFrame}/hover/${i}.jpeg)`;
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

// Detect open iframe, now needs to adjust spacing on all recursive iframes...
// THIS IS HARD... I will uhh deprioritize this for a bit...

// let numOfOpenIframes = 0;

// let spacing = 100;

// let maxIframes = 5;

// let numIframesOpened = 0;

// let iFramesList = [];

// let iframesHTML = [];

//Idea: recursively find iframes....
// function findIframes(iframeInner) {
//   iFramesList.push(iframeInner);
//   if (iframeInner.querySelector("iframe") == null) {
//     return;
//   } else {
//     console.log("attempting to find iframe");
//     let innerDoc = iframeInner.querySelector("iframe").contentWindow.document;
//     findIframes(innerDoc);
//   }
// }

// function adjustIframes() {
//   if (numIframesOpened > maxIframes) {
// iFramesList = [];
// let iframeInner = iframe.contentWindow.document;
// findIframes(iframeInner);
// console.log(iFramesList);
//Take the last 5 iframe HTMLs and uhhh.. load them? i dont think this is a good idea....
// }
// }

// window.addEventListener(
//   "message",
//   (event) => {
//     console.log(event.data);
//     if (event.data.msg == "iframe open") {
//       numIframesOpened++;
//       console.log("detecting data");
//       console.log(event.data.innerHTML);
//       iframesHTML.push(event.data.innerHTML);
//       adjustIframes();
//     }
//   },
//   false
// );

// window.addEventListener(
//   "message",
//   (event) => {
//     if (event.data == "update spacing") {
//       console.log("detected message to update spacing");
//     }
//   },
//   false
// );
