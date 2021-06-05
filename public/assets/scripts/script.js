//navbar change backgound color when scroll down
$(document).ready(() => {
  // typing animation script
  var typed = new Typed(".typing", {
    strings: [
      "Free of Charge",
      "Efficient & Reliable",
      "Australian Wide Applicable",
    ],
    typeSpeed: 50,
    backSpeed: 80,
    loop: true,
  });
  // owl carousel script
  $(".carousel").owlCarousel({
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    autoHeight: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      500: {
        items: 1,
        nav: false,
      },
      800: {
        items: 2,
        nav: false,
      },
      1200: {
        items: 3,
        nav: false,
      },
    },
  });
});
