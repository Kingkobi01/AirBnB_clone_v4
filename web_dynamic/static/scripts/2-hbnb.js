$(document).ready(function () {
  var url = "http://0.0.0.0:5001/api/v1/status/";
  $.get(url, function (data, status, jqXHR) {
    var statusCode = jqXHR.status;
    console.log(statusCode);

    if (statusCode === 200) {
      $("div#api_status").addClass("available");
    } else {
      $("header > div").removeClass("available");
      $("div#api_status").hide();
    }
  });
});
