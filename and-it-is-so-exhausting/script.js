const thisFrame = 1;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let originalDimensions = { width: 1280, height: 720 };
let ratio = originalDimensions.width / originalDimensions.height;
let inputButton = document.querySelector("#inputButton");
let inputButtonDimensions = { width: 840, height: 113, x: 223, y: 252 };

let nextButton = document.querySelector("#nextButton");
let nextButtonDimensions = { width: 112, height: 90, x: 583, y: 507 };

nextButton.style.pointerEvents = "none";

function resizeWindow() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  // let currentRatio = windowHeight / 720;

  let widthToHeight = windowWidth / windowHeight;
  //Window is wider than normal, width of button will scale
  if (widthToHeight > ratio) {
    let scaleRatio = windowWidth / originalDimensions.width;
    let newInputButtonWidth = scaleRatio * inputButtonDimensions.width;
    let newInputButtonHeight =
      newInputButtonWidth *
      (inputButtonDimensions.height / inputButtonDimensions.width);
    inputButton.style.width = `${newInputButtonWidth}px`;
    inputButton.style.height = `${newInputButtonHeight}px`;

    let newNextButtonWidth = scaleRatio * nextButtonDimensions.width;
    let newNextButtonHeight =
      newNextButtonWidth *
      (nextButtonDimensions.height / nextButtonDimensions.width);
    nextButton.style.width = `${newNextButtonWidth}px`;
    nextButton.style.height = `${newNextButtonHeight}px`;

    // Adjust top position of button
    let scaledHeight = windowWidth / ratio;
    let marginTop = (scaledHeight - windowHeight) / 2;
    let newTop = scaleRatio * inputButtonDimensions.y - marginTop;
    inputButton.style.top = `${newTop}px`;

    let newTopNextButton = scaleRatio * nextButtonDimensions.y - marginTop;
    nextButton.style.top = `${newTopNextButton}px`;
  } else {
    let scaleRatio = windowHeight / originalDimensions.height;
    let newInputButtonHeight = scaleRatio * inputButtonDimensions.height;
    let newInputButtonWidth =
      newInputButtonHeight *
      (inputButtonDimensions.width / inputButtonDimensions.height);
    inputButton.style.width = `${newInputButtonWidth}px`;
    inputButton.style.height = `${newInputButtonHeight}px`;

    let newNextButtonHeight = scaleRatio * nextButtonDimensions.height;
    let newNextButtonWidth =
      newNextButtonHeight *
      (nextButtonDimensions.width / nextButtonDimensions.height);
    nextButton.style.width = `${newNextButtonWidth}px`;
    nextButton.style.height = `${newNextButtonHeight}px`;

    // Adjust top position of button
    let newTop = scaleRatio * inputButtonDimensions.y;
    inputButton.style.top = `${newTop}px`;

    let newNextButtonTop = scaleRatio * nextButtonDimensions.y;
    nextButton.style.top = `${newNextButtonTop}px`;
  }
}

window.onresize = resizeWindow;

resizeWindow();

let iframe = document.createElement("iframe");
let typingAnimation;
let scene27state = "focus";
let showCursor = true;

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

// First frame
for (var i = 1; i < versions + 1; i++) {
  let newDivDefault = document.createElement("div");
  newDivDefault.style.backgroundImage = `url(img/${thisFrame}/default/${i}.jpeg)`;
  newDivDefault.dataset.sceneId = 1;
  newDivDefault.dataset.num = i;
  newDivDefault.dataset.hover = false;
  bgDivs.push(newDivDefault);
  document.body.appendChild(newDivDefault);

  let newDivHover = document.createElement("div");
  newDivHover.style.backgroundImage = `url(img/${thisFrame}/hover/${i}.jpeg)`;
  newDivHover.dataset.sceneId = 1;
  newDivHover.dataset.num = i;
  newDivHover.dataset.hover = true;
  bgDivs.push(newDivHover);
  document.body.appendChild(newDivHover);
}
// Frames 2 to 26
for (var i = 2; i < 27; i++) {
  let newDiv = document.createElement("div");
  newDiv.style.backgroundImage = `url(img/${i}/default/1.jpeg)`;
  newDiv.dataset.sceneId = i;
  animationDivs.push(newDiv);
  document.body.appendChild(newDiv);
}
// Frame 27
for (var i = 1; i < versions + 1; i++) {
  let newDiv1 = document.createElement("div");
  newDiv1.style.backgroundImage = `url(img/27/focusCursor/${i}.jpeg)`;
  newDiv1.dataset.sceneId = 27;
  newDiv1.dataset.num = i;
  newDiv1.dataset.state = "focus";
  newDiv1.dataset.focus = "true";
  newDiv1.dataset.cursor = "true";
  bgDivs.push(newDiv1);
  document.body.appendChild(newDiv1);

  let newDiv2 = document.createElement("div");
  newDiv2.style.backgroundImage = `url(img/27/focus/${i}.jpeg)`;
  newDiv2.dataset.sceneId = 27;
  newDiv2.dataset.num = i;
  newDiv2.dataset.state = "focus";
  newDiv2.dataset.focus = "true";
  newDiv2.dataset.cursor = "false";
  bgDivs.push(newDiv2);
  document.body.appendChild(newDiv2);

  let newDiv3 = document.createElement("div");
  newDiv3.style.backgroundImage = `url(img/27/default/${i}.jpeg)`;
  newDiv3.dataset.sceneId = 27;
  newDiv3.dataset.num = i;
  newDiv3.dataset.state = "default";
  bgDivs.push(newDiv3);
  document.body.appendChild(newDiv3);

  let newDiv4 = document.createElement("div");
  newDiv4.style.backgroundImage = `url(img/27/hoverInput/${i}.jpeg)`;
  newDiv4.dataset.sceneId = 27;
  newDiv4.dataset.num = i;
  newDiv4.dataset.state = "hoverInput";
  bgDivs.push(newDiv4);
  document.body.appendChild(newDiv4);

  let newDiv5 = document.createElement("div");
  newDiv5.style.backgroundImage = `url(img/27/focusCursorHoverButton/${i}.jpeg)`;
  newDiv5.dataset.sceneId = 27;
  newDiv5.dataset.num = i;
  newDiv5.dataset.state = "focusHoverButton";
  newDiv5.dataset.focus = "true";
  newDiv5.dataset.cursor = "true";
  bgDivs.push(newDiv5);
  document.body.appendChild(newDiv5);

  let newDiv6 = document.createElement("div");
  newDiv6.style.backgroundImage = `url(img/27/focusHoverButton/${i}.jpeg)`;
  newDiv6.dataset.sceneId = 27;
  newDiv6.dataset.num = i;
  newDiv6.dataset.state = "focusHoverButton";
  newDiv6.dataset.focus = "true";
  newDiv6.dataset.cursor = "false";
  bgDivs.push(newDiv6);
  document.body.appendChild(newDiv6);

  let newDiv7 = document.createElement("div");
  newDiv7.style.backgroundImage = `url(img/27/hoverButton/${i}.jpeg)`;
  newDiv7.dataset.sceneId = 27;
  newDiv7.dataset.num = i;
  newDiv7.dataset.state = "hoverButton";
  bgDivs.push(newDiv7);
  document.body.appendChild(newDiv7);

  let newDiv8 = document.createElement("div");
  newDiv8.style.backgroundImage = `url(img/27/pressButton/${i}.jpeg)`;
  newDiv8.dataset.sceneId = 27;
  newDiv8.dataset.num = i;
  newDiv8.dataset.state = "pressButton";
  bgDivs.push(newDiv8);
  document.body.appendChild(newDiv8);
}

//Cycle through divs while noting whether or not is hovering
let visibleNum = 1;

let animationFrame = 2;
let scene1Animation = window.setInterval(function () {
  //Animate frame 1
  if (!animationStarted) {
    visibleNum++;
    //Cycle through frames
    bgDivs.forEach(function (div) {
      div.style.visibility = "hidden";
    });
    //Show visible frame
    let selectors = `[data-scene-id="${1}"][data-num="${
      (visibleNum % versions) + 1
    }"][data-hover="${inputHovering}"]`;
    let selectedDiv = document.querySelector(selectors);
    selectedDiv.style.visibility = "visible";
  }
}, 180);

// To do, when animation finishes make it have final states...

inputButton.addEventListener("mouseenter", function () {
  inputHovering = true;
  if (animationStarted && !currentlyAnimating) {
    if (scene27state != "focus") {
      scene27state = "hoverInput";
    }
  }
});

inputButton.addEventListener("mouseleave", function () {
  inputHovering = false;
  if (animationStarted && !currentlyAnimating && scene27state == "hoverInput") {
    scene27state = "default";
  }
});

inputButton.addEventListener("mousedown", function () {
  // this should trigger the animation....
  if (!animationStarted) {
    animationStarted = true;
    currentlyAnimating = true;
    clearTimeout(scene1Animation);

    typingAnimation = window.setInterval(function () {
      let thisAnimationFrame = animationDivs[animationFrame];
      animationDivs.forEach(function (div) {
        if (parseInt(div.dataset.sceneId) == animationFrame) {
          div.style.visibility = "visible";
        } else {
          div.style.visibility = "hidden";
        }
      });
      animationFrame++;
      if (animationFrame >= animationDivs.length + 2) {
        currentlyAnimating = false;
        clearInterval(typingAnimation);
        //Animate scene 27
        let scene27Animation = window.setInterval(function () {
          nextButton.style.pointerEvents = "all";
          visibleNum++;
          //Switch cursor state
          if (visibleNum % 3 == 0) {
            showCursor = !showCursor;
          }
          //Cycle through frames
          bgDivs.forEach(function (div) {
            div.style.visibility = "hidden";
          });

          let selectors;
          if (scene27state == "focus" || scene27state == "focusHoverButton") {
            selectors = `[data-scene-id="${27}"][data-num="${
              (visibleNum % versions) + 1
            }"][data-state="${scene27state}"][data-cursor="${showCursor}"]`;
          } else {
            selectors = `[data-scene-id="${27}"][data-num="${
              (visibleNum % versions) + 1
            }"][data-state="${scene27state}"]`;
          }
          let selectedDiv = document.querySelector(selectors);
          selectedDiv.style.visibility = "visible";
        }, 180);
      }
    }, 120);
  }
  if (animationStarted && !currentlyAnimating) {
    scene27state = "focus";
  }
});

nextButton.addEventListener("mouseenter", function () {
  nextButtonHovering = true;
  if (scene27state == "focus") {
    scene27state = "focusHoverButton";
  } else {
    scene27state = "hoverButton";
  }
});

nextButton.addEventListener("mouseleave", function () {
  console.log("mouseleave event");
  if (nextButtonHovering) {
    nextButtonHovering = false;
    if (scene27state == "focusHoverButton") {
      scene27state = "focus";
    } else {
      scene27state = "default";
    }
  }
});

nextButton.addEventListener("mousedown", function () {
  scene27state = "pressButton";
});

nextButton.addEventListener("mouseup", function () {
  if (scene27state != "focusHoverButton") {
    scene27state = "hoverButton";
  }
});

document.addEventListener("mousedown", function (event) {
  if (animationStarted && !currentlyAnimating) {
    if (event.target == document.body) {
      scene27state = "default";
    }
  }
});
