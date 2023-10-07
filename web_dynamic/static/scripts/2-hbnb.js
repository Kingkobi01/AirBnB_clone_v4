$(document).ready(function () {
  var li = $(".amenities > .popover li");
  var h4 = $(".amenities > h4");
  var amenities = [];
  li.children('[type="checkbox"]').change(function () {
    if (this.checked) {
      amenities[this.dataset.name] = this.dataset.id;
    } else {
      delete amenities[this.dataset.name];
    }
    h4.text(Object.keys(amenities).sort().join(", "));
  });

  var url = "http://0.0.0.0:5001/api/v1/status/";
  $.get(url, function (data, status, jqXHR) {
    var statusCode = jqXHR.status;

    if (statusCode === 200) {
      $("div#api_status").addClass("available");
    } else {
      $("header > div").removeClass("available");
      $("div#api_status").hide();
    }
  });
});
