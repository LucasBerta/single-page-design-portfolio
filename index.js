let slideIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const prev = document.getElementById("slide-prev");
  const next = document.getElementById("slide-next");

  prev.addEventListener("click", () => slide("left"));
  next.addEventListener("click", () => slide("right"));
});

function slide(direction) {
  const myWork = document.getElementById("my-work");
  const imgs = myWork.getElementsByTagName("img");
  const slidesVisible = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--slides-visible");

  if (direction === "left") {
    if (slideIndex <= 0) return;
    slideIndex--;
  }
  if (direction === "right") {
    if (slideIndex >= imgs.length - slidesVisible) return;
    slideIndex++;
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

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.left >= 0 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
