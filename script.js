let thisFrame = "1";
let thisState = "default";
// console.log("userAgentData:");
// console.log(navigator.userAgentData);
// console.log("userAgent:");
// console.log(navigator.userAgent);
// const isMobile = navigator.userAgentData.mobile;
let isMobile =
  navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/) !== null;
// console.log(isMobile);
if (isMobile) {
  window.alert(
    "Please view this web experience on desktop, and in Chrome / Arc browsers for the full experience"
  );
}
isMobile = false;

let windowWidth = isMobile ? screen.width : window.innerWidth;
let windowHeight = isMobile ? screen.height : window.innerHeight;

let originalDimensions = { width: 1280, height: 720 };
let ratio = originalDimensions.width / originalDimensions.height;

let nextButton = document.querySelector("#nextButton");
let aboutButton = document.querySelector("#aboutButton");

let buttons = [
  { id: "nextButton", width: 877, height: 90, x: 202, y: 282 },
  { id: "aboutButton", width: 290, height: 60, x: 495, y: 495 },
];

let buttonDisplacement = 0;

function resizeWindow() {
  windowWidth = isMobile ? screen.width : window.innerWidth;
  windowHeight = isMobile ? screen.height : window.innerHeight;
  // let currentRatio = windowHeight / 720;

  let widthToHeight = windowWidth / windowHeight;
  //Window is wider than normal, width of button will scale
  if (widthToHeight > ratio) {
    let scaleRatio = windowWidth / originalDimensions.width;
    buttons.forEach(function (button) {
      let buttonEl = document.querySelector("#" + button.id);
      let newButtonWidth = scaleRatio * button.width;
      let newButtonHeight = newButtonWidth * (button.height / button.width);
      buttonEl.style.width = `${newButtonWidth}px`;
      buttonEl.style.height = `${newButtonHeight}px`;
      // Adjust top position of button
      let scaledHeight = windowWidth / ratio;
      let marginTop = (scaledHeight - windowHeight) / 2;
      let newTop = scaleRatio * button.y - marginTop;
      buttonEl.style.top = `${newTop}px`;
      let newLeft = scaleRatio * (button.x + buttonDisplacement);
      buttonEl.style.left = `${newLeft}px`;
    });
  } else {
    let scaleRatio = windowHeight / originalDimensions.height;
    buttons.forEach(function (button) {
      let buttonEl = document.querySelector("#" + button.id);
      let newButtonHeight = scaleRatio * button.height;
      let newButtonWidth = newButtonHeight * (button.width / button.height);
      buttonEl.style.width = `${newButtonWidth}px`;
      buttonEl.style.height = `${newButtonHeight}px`;
      // Adjust top position of button
      let scaledWidth = windowHeight * ratio;
      let marginLeft = (scaledWidth - windowWidth) / 2;
      let newLeft = scaleRatio * (button.x + buttonDisplacement) - marginLeft;
      buttonEl.style.left = `${newLeft}px`;
      let newTop = scaleRatio * button.y;

      buttonEl.style.top = `${newTop}px`;
    });
  }
}

window.onresize = resizeWindow;

resizeWindow();

// Needs to not only animate but hover...

// We need bg divs for this frame, with hover/ not hover, and each state

let bgDivs = [];
let versions = 3;
let inputHovering = false;
let nextButtonHovering = false;

let currentlyAnimating = false;
let animationStarted = false;

let animationDivs = [];

let currentVersion = 1;

/////// LOAD IMAGES

let states = ["default", "hover", "press", "hoverAbout", "pressHoverAbout"];

// Iterate through frames to create divs
for (var i = 1; i < versions + 1; i++) {
  states.forEach(function (state) {
    let newDiv = document.createElement("div");
    newDiv.style.backgroundImage = `url(img/${state}/${i}.jpeg)`;
    newDiv.dataset.num = i;
    newDiv.dataset.state = state;
    bgDivs.push(newDiv);
    document.body.appendChild(newDiv);
  });
}

let visibleNum = 1;

window.setInterval(function () {
  //Animate frame 1
  visibleNum++;
  //Cycle through frames
  bgDivs.forEach(function (div) {
    div.style.visibility = "hidden";
  });
  //Show visible frame
  let selectors = `[data-num="${
    (visibleNum % 3) + 1
  }"][data-state="${thisState}"]`;
  let selectedDiv = document.querySelector(selectors);
  selectedDiv.style.visibility = "visible";
}, 120);

nextButton.addEventListener("mouseenter", function () {
  thisState = "hover";
});

nextButton.addEventListener("mouseleave", function () {
  if (thisState == "hover") {
    thisState = "default";
  }
});

nextButton.addEventListener("mousedown", function () {
  thisState = "press";
});

nextButton.addEventListener("mouseup", function () {
  thisState = "hover";
});

aboutButton.addEventListener("mouseenter", function () {
  if (thisState == "press") {
    thisState = "pressHoverAbout";
  } else if (thisState == "default") {
    thisState = "hoverAbout";
  }
});

aboutButton.addEventListener("mouseleave", function () {
  if (thisState == "pressHoverAbout") {
    thisState = "press";
  } else if (thisState == "hoverAbout") {
    thisState = "default";
  }
});

document.addEventListener("mouseup", function (e) {
  if (e.target == document.body) {
    thisState = "default";
  }
});

nextButton.addEventListener("click", function () {
  window.location.href = "/and-it-comes-up-constantly";
});

aboutButton.addEventListener("click", function () {
  window.location.href = "/about";
});
