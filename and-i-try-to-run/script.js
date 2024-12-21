let thisFrame = "1";
let thisState = "default";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let originalDimensions = { width: 1280, height: 720 };
let ratio = originalDimensions.width / originalDimensions.height;
let selectButton = document.querySelector("#selectButton");
let nextButton = document.querySelector("#nextButton");

let buttons = [{ id: "nextButton", width: 692, height: 90, x: 226, y: 315 }];

let buttonDisplacement = 0;

function resizeWindow() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
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

/////// LOAD IMAGES

let states = ["default", "hover", "press"];

// Iterate through frames to create divs
for (var i = 1; i < 12; i++) {
  states.forEach(function (state) {
    let newDiv = document.createElement("div");
    newDiv.style.backgroundImage = `url(img/${i}/${state}/1.jpeg)`;
    newDiv.dataset.frame = i;
    newDiv.dataset.num = 1;
    newDiv.dataset.state = state;
    bgDivs.push(newDiv);
    document.body.appendChild(newDiv);
  });
}

let visibleNum = 1;
let goingRight = true;

window.setInterval(function () {
  //Animate frame 1

  if (goingRight) {
    buttonDisplacement += 14;
    thisFrame++;
  } else {
    buttonDisplacement -= 14;
    thisFrame--;
  }
  resizeWindow();
  if (thisFrame == 11) {
    goingRight = false;
  }
  if (thisFrame == 1) {
    goingRight = true;
  }

  //Cycle through frames
  bgDivs.forEach(function (div) {
    div.style.visibility = "hidden";
  });
  //Show visible frame
  let selectors = `[data-frame="${thisFrame}"][data-num="1"][data-state="${thisState}"]`;
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

document.addEventListener("mouseup", function (e) {
  if (e.target == document.body) {
    thisState = "default";
  }
});

nextButton.addEventListener("click", function () {
  window.location.href = "../and-i-learned-to-be-a-machine";
});
