$(document).ready(function () {
  $(".my-work .slide").slick({
    breakpoint: 1920,
    slidesToShow: 3,
    appendArrows: $(".slide--buttons"),
    prevArrow:
      '<button class="btn btn-primary btn-circle material-symbols-outlined">arrow_back</button>',
    nextArrow:
      '<button class="btn btn-primary btn-circle material-symbols-outlined">arrow_forward</button>',
  });
});
