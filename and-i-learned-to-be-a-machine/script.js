let thisFrame = "busy";
let thisState = "default";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let originalDimensions = { width: 1280, height: 720 };
let ratio = originalDimensions.width / originalDimensions.height;
let selectButton = document.querySelector("#selectButton");
let nextButton = document.querySelector("#nextButton");

let buttons = [
  { id: "selectButton", width: 621, height: 108, x: 449, y: 212 },
  { id: "busyButton", width: 663, height: 112, x: 426, y: 204 },
  { id: "independentButton", width: 663, height: 112, x: 426, y: 316 },
  { id: "perfectButton", width: 663, height: 112, x: 426, y: 428 },
  { id: "nextButton", width: 112, height: 90, x: 584, y: 514 },
];

let buttonDisplacement = 0;

let optionButtons = [
  document.querySelector("#busyButton"),
  document.querySelector("#independentButton"),
  document.querySelector("#perfectButton"),
];

// let nextButton = document.querySelector("#nextButton");
// let nextButtonDimensions = { width: 112, height: 90, x: 583, y: 507 };

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
      let newTop = 0;
      if (
        button.id == "busyButton" ||
        button.id == "independentButton" ||
        button.id == "perfectButton"
      ) {
        newTop = scaleRatio * (button.y + buttonDisplacement) - marginTop;
      } else {
        newTop = scaleRatio * button.y - marginTop;
      }
      buttonEl.style.top = `${newTop}px`;
      let newLeft = scaleRatio * button.x;
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
      let newLeft = scaleRatio * button.x - marginLeft;
      buttonEl.style.left = `${newLeft}px`;
      let newTop = 0;
      if (
        button.id == "busyButton" ||
        button.id == "independentButton" ||
        button.id == "perfectButton"
      ) {
        newTop = scaleRatio * (button.y + buttonDisplacement);
      } else {
        newTop = scaleRatio * button.y;
      }
      buttonEl.style.top = `${newTop}px`;
    });
  }
}

window.onresize = resizeWindow;

resizeWindow();

selectButton.addEventListener("mousedown", function () {});

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

let states = [
  "default",
  "focusInput",
  "focusInputHoverButton",
  "hoverButton",
  "hoverInput",
  "pressButton",
  "hoverBusy",
  "hoverIndependent",
  "hoverPerfect",
  "hoverNone",
];

let frames = ["busy", "independent", "perfect"];

// First frame
for (var i = 1; i < versions + 1; i++) {
  frames.forEach(function (frame) {
    states.forEach(function (state) {
      for (var i = 1; i < versions + 1; i++) {
        let newDiv = document.createElement("div");
        newDiv.style.backgroundImage = `url(img/${frame}/${state}/${i}.jpeg)`;
        newDiv.dataset.frame = frame;
        newDiv.dataset.num = i;
        newDiv.dataset.state = state;
        bgDivs.push(newDiv);
        document.body.appendChild(newDiv);
      }
    });
  });
}

//Cycle through divs while noting whether or not is hovering
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
    (visibleNum % versions) + 1
  }"][data-state="${thisState}"]`;
  // console.log(selectors);
  let selectedDiv = document.querySelector(selectors);
  selectedDiv.style.visibility = "visible";
}, 180);

// To do, when animation finishes make it have final states...

let dropdownOpen = false;
selectButton.addEventListener("mouseenter", function () {
  if (thisState == "default") {
    thisState = "hoverInput";
  }
});

selectButton.addEventListener("mouseleave", function () {
  if (thisState == "hoverInput") {
    thisState = "default";
  }
});
let timeElapsed = 0;
let closeDropdownAfterMouseup = false;

//Once you mouse down on the option, if you mouseup within X milliseconds then dropdown stays open. otherwise, cloes it.
function countdown() {
  setTimeout(function () {
    closeDropdownAfterMouseup = true;
  }, 200);
}

selectButton.addEventListener("mousedown", function () {
  dropdownOpen = true;
  nextButton.style.pointerEvents = "none";
  selectButton.style.pointerEvents = "none";
  countdown();
  optionButtons.forEach(function (optionButton) {
    optionButton.style.pointerEvents = "all";
  });
  if (thisFrame == "busy") {
    thisState = "hoverBusy";
  } else if (thisFrame == "independent") {
    thisState = "hoverIndependent";
  } else if (thisFrame == "perfect") {
    thisState = "hoverPerfect";
  }
});

optionButtons.forEach(function (optionButton) {
  optionButton.style.pointerEvents = "none";
  optionButton.addEventListener("mouseenter", function () {
    if (dropdownOpen) {
      if (optionButton.id == "busyButton") {
        thisState = "hoverBusy";
      } else if (optionButton.id == "independentButton") {
        thisState = "hoverIndependent";
      } else if (optionButton.id == "perfectButton") {
        thisState = "hoverPerfect";
      }
    }
  });

  optionButton.addEventListener("mouseup", function () {
    if (dropdownOpen && closeDropdownAfterMouseup) {
      dropdownOpen = false;
      thisState = "focusInput";
      selectButton.style.pointerEvents = "all";
      nextButton.style.pointerEvents = "all";
      closeDropdownAfterMouseup = false;
      if (optionButton.id == "busyButton") {
        thisFrame = "busy";
        buttonDisplacement = 0;
      } else if (optionButton.id == "independentButton") {
        thisFrame = "independent";
        buttonDisplacement = -113;
      } else if (optionButton.id == "perfectButton") {
        thisFrame = "perfect";
        buttonDisplacement = -223;
      }
      resizeWindow();
      optionButtons.forEach(function (optionButton) {
        optionButton.style.pointerEvents = "none";
      });
    }
  });
  optionButton.addEventListener("mouseleave", function () {
    if (dropdownOpen) {
      thisState = "hoverNone";
      // if (optionButton.id == "busyButton") {
      //   thisState = "hoverBusy";
      // } else if (optionButton.id == "independentButton") {
      //   thisState = "hoverIndependent";
      // } else if (optionButton.id == "perfectButton") {
      //   thisState = "hoverPerfect";
      // }
    }
  });
});

document.addEventListener("mouseup", function (event) {
  if (dropdownOpen) {
    if (event.target == document.body) {
      dropdownOpen = false;
      closeDropdownAfterMouseup = false;
      thisState = "focusInput";
      selectButton.style.pointerEvents = "all";
      optionButtons.forEach(function (optionButton) {
        optionButton.style.pointerEvents = "none";
      });
    }
  }
  if (event.target == document.body) {
    if (thisState == "pressButton") {
      thisState = "hoverButton";
    }
  }
});

document.addEventListener("mousedown", function (event) {
  if (event.target == document.body) {
    thisState = "default";
  }
});

nextButton.addEventListener("mouseenter", function () {
  if (thisState == "default") {
    thisState = "hoverButton";
  } else if (thisState == "focusInput") {
    thisState = "focusInputHoverButton";
  }
});

nextButton.addEventListener("mouseleave", function () {
  if (thisState == "hoverButton") {
    thisState = "default";
  } else if (thisState == "focusInputHoverButton") {
    thisState = "focusInput";
  }
});

nextButton.addEventListener("mousedown", function () {
  if (thisState == "hoverButton" || thisState == "focusInputHoverButton") {
    thisState = "pressButton";
  }
});

nextButton.addEventListener("mouseup", function () {
  if (thisState == "pressButton") {
    thisState = "hoverButton";
  }
});

nextButton.addEventListener("click", function () {
  window.location.href = "/and-it-is-so-exhausting";
});
