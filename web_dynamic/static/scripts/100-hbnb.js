$(document).ready(function () {
  const HOST = "http://127.0.0.1:5001";
  const amenities = {};
  const cities = {};
  const states = {};

  $('ul li input[type="checkbox"]').bind("change", (e) => {
    const el = e.target;
    let tt;
    switch (el.id) {
      case "state_filter":
        tt = states;
        break;
      case "city_filter":
        tt = cities;
        break;
      case "amenity_filter":
        tt = amenities;
        break;
    }
    if (el.checked) {
      tt[el.dataset.name] = el.dataset.id;
    } else {
      delete tt[el.dataset.name];
    }
    if (el.id === "amenity_filter") {
      $(".amenities h4").text(Object.keys(amenities).sort().join(", "));
    } else {
      $(".locations h4").text(
        Object.keys(Object.assign({}, states, cities)).sort().join(", ")
      );
    }
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

  $.ajax({
    type: "POST", // HTTP method (POST in this case)
    url: "http://0.0.0.0:5001/api/v1/places_search/", // The URL to send the request to
    data: JSON.stringify({}), // Convert the data to JSON format
    contentType: "application/json", // Set the content type to JSON
    dataType: "json", // The expected data type of the response
    success: (data) => {
      data.forEach((place) =>
        $("section.places").append(
          `<article>
			<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
			</div>
			<div class="information">
			<div class="max_guest">${place.max_guest} Guest${
            place.max_guest !== 1 ? "s" : ""
          }</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${
            place.number_rooms !== 1 ? "s" : ""
          }</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${
            place.number_bathrooms !== 1 ? "s" : ""
          }</div>
			</div> 
			<div class="description">
			${place.description}
			</div>
				</article>`
        )
      );
    },
    error: function (xhr, status, error) {
      // Handle errors here
      console.error("POST request failed:", error);
    },
  });

  $(".filters button").bind("click", searchPlace);
  searchPlace();
});
