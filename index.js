let slideIndex = 0;
let waitToSlide = false;

document.addEventListener("DOMContentLoaded", () => {
  const prev = document.getElementById("slide-prev");
  const next = document.getElementById("slide-next");

  prev.addEventListener("click", () => slide("left"));
  next.addEventListener("click", () => slide("right"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") slide("left");
    if (e.key === "ArrowRight") slide("right");
  });
});

function slide(direction) {
  const myWork = document.getElementById("my-work");
  const imgs = myWork.getElementsByTagName("img");
  const slidesVisible = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--slides-visible");

  if (direction === "left") {
    if (!slideLeft()) return;
  }
  if (direction === "right") {
    if (!slideRight(imgs, slidesVisible)) return;
  }

  for (let index = 0; index < imgs.length; index++) {
    const element = imgs[index];
    const style = getComputedStyle(element);
    const imgWidth = element.offsetWidth;
    const marginRight = parseInt(style.marginRight) * (slidesVisible - 1);
    const currentTranslate = new WebKitCSSMatrix(style.transform).m41;
    if (direction === "left") {
      element.style.transform = `translateX(${
        currentTranslate + imgWidth + marginRight
      }px)`;
    } else if (direction === "right") {
      element.style.transform = `translateX(${
        currentTranslate - imgWidth - marginRight
      }px)`;
    }
  }
}

function slideLeft() {
  if (slideIndex <= 0 || waitToSlide) return;
  setWaitToSlide();
  slideIndex--;
  return true;
}

function slideRight(imgs, slidesVisible) {
  if (slideIndex >= imgs.length - slidesVisible || waitToSlide) return;
  setWaitToSlide();
  slideIndex++;
  return true;
}

function setWaitToSlide() {
  waitToSlide = true;
  setTimeout(() => {
    waitToSlide = false;
  }, 200);
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
