//navbar change backgound color when scroll down
$(document).ready(() => {
  $(window).scroll(() => {
    if (this.scrollY > 20) {
      $(".navbar").addClass("anchorTop");
    } else {
      $(".navbar").removeClass("anchorTop");
    }
    if (this.scrollY > 500) {
      $(".scroll-up-btn").addClass("show");
    } else {
      $(".scroll-up-btn").removeClass("show");
    }
  });
  // slide-up script
  $(".scroll-up-btn").click(function () {
    $("html").animate({ scrollTop: 0 });
  });

  // toggle menu/navbar script
  $(".menu-btn").click(function () {
    $(".navbar .menu").toggleClass("active");
    $(".menu-btn i").toggleClass("active");
  });

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

  var typed = new Typed(".typing-2", {
    strings: ["Junior Web Dev", "CAD Drafter", "Freelancer", "Music Lover"],
    typeSpeed: 10,
    backSpeed: 60,
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
