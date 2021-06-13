$(document).ready(function () {
  // owl carousel script
  $(".carousel").owlCarousel({
    loop: true,
    autoplayTimeOut: 2000,
    autoplayHoverPause: true,
    autoHeight: true,
    margin:30,
    responsiveClass:true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      314: {
        items: 1,
        nav: false,
      },
      668: {
        items: 2,
        nav: false,
      },
      1250: {
        items: 3,
        nav: false,
      },
    },
  });

  // Jquery UI date picker
  $(function () {
    $("#beneficiaryDOB").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "dd/mm/yy",
      beforeShow: function (input, inst) {
        var rect = input.getBoundingClientRect();
        setTimeout(function () {
          inst.dpDiv.css({ top: rect.top + 40, left: rect.left + 0 });
        }, 0);
      },
    });
  });

  $(function () {
    $("#userDOB").datepicker({
      changeMonth: true,
      changeYear: true,
      dateFormat: "dd/mm/yy",
      beforeShow: function (input, inst) {
        var rect = input.getBoundingClientRect();
        setTimeout(function () {
          inst.dpDiv.css({ top: rect.top + 40, left: rect.left + 0 });
        }, 0);
      },
    });
  });
});
