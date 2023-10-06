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
});
