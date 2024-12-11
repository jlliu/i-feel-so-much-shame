let thisFrame = 1;
let thisState = "default";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let originalDimensions = { width: 1280, height: 720 };
let ratio = originalDimensions.width / originalDimensions.height;

let nextButton = document.querySelector("#nextButton");
let aboutButton = document.querySelector("#aboutButton");

let buttons = [
  { id: "button1", width: 818, height: 66, x: 232, y: 327 },
  { id: "button2", width: 681, height: 132, x: 300, y: 294 },
  { id: "button3", width: 581, height: 132, x: 300, y: 294 },
];

let buttonEls = [
  document.querySelector("#button1"),
  document.querySelector("#button2"),
  document.querySelector("#button3"),
];

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

let currentVersion = 1;

/////// LOAD IMAGES

let states = ["default", "hover", "press", "hoverAbout", "pressHoverAbout"];

// Iterate through frames to create divs
for (var i = 1; i < 4; i++) {
  states.forEach(function (state) {
    for (var j = 1; j < versions + 1; j++) {
      let newDiv = document.createElement("div");
      newDiv.style.backgroundImage = `url(img/${i}/${state}/${j}.png)`;
      newDiv.dataset.frame = i;
      newDiv.dataset.num = j;
      newDiv.dataset.state = state;
      bgDivs.push(newDiv);
      document.body.appendChild(newDiv);
    }
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
  let selectors = `[data-frame="${thisFrame}"][data-num="${
    (visibleNum % 3) + 1
  }"][data-state="${thisState}"]`;
  let selectedDiv = document.querySelector(selectors);
  selectedDiv.style.visibility = "visible";
}, 120);

buttonEls.forEach(function (buttonEl) {
  buttonEl.addEventListener("mouseenter", function () {
    thisState = "hover";
  });
  buttonEl.addEventListener("mouseleave", function () {
    if (thisState == "hover") {
      thisState = "default";
    }
  });
  buttonEl.addEventListener("mousedown", function () {
    thisState = "press";
  });

  buttonEl.addEventListener("mouseup", function () {
    thisState = "hover";
  });
  buttonEl.addEventListener("click", function () {
    if (thisFrame < 3) {
      buttonEls[thisFrame - 1].style.pointerEvents = "none";
      thisFrame++;
      buttonEls[thisFrame - 1].style.pointerEvents = "all";
    } else {
      window.location.href = "/and-i-try-to-run";
    }
  });
});

buttonEls[0].style.pointerEvents = "all";

document.body.addEventListener("mouseup", function (e) {
  if (e.target == document.body) {
    thisState = "default";
  }
});
