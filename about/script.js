let thisFrame = "1";
let thisState = "default";

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let originalDimensions = { width: 1280, height: 720 };
let ratio = originalDimensions.width / originalDimensions.height;

let meButton = document.querySelector("#meButton");
let homepageButton1 = document.querySelector("#homepageButton1");
let homepageButton2 = document.querySelector("#homepageButton2");
let backButton = document.querySelector("#backButton");

let buttons = [
  { id: "meButton", width: 292, height: 86, x: 350, y: 309 },
  { id: "homepageButton1", width: 258, height: 86, x: 751, y: 309 },
  { id: "homepageButton2", width: 771, height: 86, x: 250, y: 395 },
  { id: "backButton", width: 219, height: 77, x: 530, y: 537 },
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

let states = ["default", "hoverBack", "hoverHomepage", "hoverMe"];

// Iterate through frames to create divs
for (var i = 1; i < versions + 1; i++) {
  states.forEach(function (state) {
    let newDiv = document.createElement("div");
    newDiv.style.backgroundImage = `url(${state}/${i}.png)`;
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
  console.log(selectors);
  let selectedDiv = document.querySelector(selectors);
  console.log(selectedDiv);
  selectedDiv.style.visibility = "visible";
}, 120);

meButton.addEventListener("mouseenter", function () {
  thisState = "hoverMe";
});

meButton.addEventListener("mouseleave", function () {
  if (thisState == "hoverMe") {
    thisState = "default";
  }
});

homepageButton1.addEventListener("mouseenter", function () {
  thisState = "hoverHomepage";
});

homepageButton1.addEventListener("mouseleave", function () {
  if (thisState == "hoverHomepage") {
    thisState = "default";
  }
});

homepageButton2.addEventListener("mouseenter", function () {
  thisState = "hoverHomepage";
});

homepageButton2.addEventListener("mouseleave", function () {
  if (thisState == "hoverHomepage") {
    thisState = "default";
  }
});

backButton.addEventListener("click", function () {
  window.location.href = "/";
});

backButton.addEventListener("mouseenter", function () {
  thisState = "hoverBack";
});

backButton.addEventListener("mouseleave", function () {
  if (thisState == "hoverBack") {
    thisState = "default";
  }
});

backButton.addEventListener("click", function () {
  window.location.href = "/";
});

// nextButton.addEventListener("mouseleave", function () {
//   if (thisState == "hover") {
//     thisState = "default";
//   }
// });

// nextButton.addEventListener("mousedown", function () {
//   thisState = "press";
// });

// nextButton.addEventListener("mouseup", function () {
//   thisState = "hover";
// });

// aboutButton.addEventListener("mouseenter", function () {
//   if (thisState == "press") {
//     thisState = "pressHoverAbout";
//   } else if (thisState == "default") {
//     thisState = "hoverAbout";
//   }
// });

// aboutButton.addEventListener("mouseleave", function () {
//   if (thisState == "pressHoverAbout") {
//     thisState = "press";
//   } else if (thisState == "hoverAbout") {
//     thisState = "default";
//   }
// });

// document.addEventListener("mouseup", function (e) {
//   if (e.target == document.body) {
//     thisState = "default";
//   }
// });

// nextButton.addEventListener("click", function () {
//   window.location.href = "/and-it-comes-up-constantly";
// });

// aboutButton.addEventListener("click", function () {
//   window.location.href = "/about";
// });
