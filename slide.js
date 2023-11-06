const slider = document.querySelector(".slider__container");
const prevClick = document.querySelector(".slider__button--prev");
const nextClick = document.querySelector(".slider__button--next");

let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let currentIndex = 0;

// check icon active hay không khi mới vào.
checkButtons();

// xử lý khi click icon
prevClick.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    animateSlide();
    checkButtons();
  }
});

nextClick.addEventListener("click", () => {
  if (currentIndex < 8) {
    currentIndex++;
    animateSlide();
    checkButtons();
  }
});

//xử lý khi kéo thả slide
slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startPos = e.clientX - slider.offsetLeft;
  prevTranslate = currentTranslate;
  cancelAnimationFrame(animationID);
  checkButtons();
});

slider.addEventListener("touchstart", (e) => {
  isDragging = true;
  startPos = e.touches[0].clientX - slider.offsetLeft;
  prevTranslate = currentTranslate;
  cancelAnimationFrame(animationID);
  checkButtons();
});

slider.addEventListener("mouseup", () => {
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < 8) {
    currentIndex++;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex--;
  }

  setPositionByIndex();
  checkButtons();
});

slider.addEventListener("touchend", () => {
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < 8) {
    currentIndex++;
  }

  if (movedBy > 100 && currentIndex > 0) {
    currentIndex--;
  }

  setPositionByIndex();
  checkButtons();
});

slider.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const currentPosition = e.clientX - slider.offsetLeft;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
});

slider.addEventListener("touchmove", (e) => {
  if (isDragging) {
    const currentPosition = e.touches[0].clientX - slider.offsetLeft;
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
});

function setPositionByIndex() {
  currentTranslate = currentIndex * -100;
  prevTranslate = currentTranslate;
  slider.style.transform = `translateX(${currentTranslate}%)`;
}

// hàm xử lý animation cho slide chuyển mượt
function animateSlide() {
  setPositionByIndex();
  requestAnimationFrame(() => {
    slider.style.transition = "transform 0.6s ease-in-out";
  });
}

//hàm check icon button xem có active không;
function checkButtons() {
  const prevButton = document.querySelector(".slider__button--prev");
  const nextButton = document.querySelector(".slider__button--next");

  if (currentIndex === 0) {
    prevButton.classList.add("inactive");
  } else {
    prevButton.classList.remove("inactive");
  }

  if (currentIndex === 8) {
    nextButton.classList.add("inactive");
  } else {
    nextButton.classList.remove("inactive");
  }
}

setPositionByIndex();

window.onresize = animateSlide;
