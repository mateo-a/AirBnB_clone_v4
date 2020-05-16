document.addEventListener('DOMContentLoaded', function () {
  const amenityId = {};
  $('input[type=checkbox]').change(function () {
    var checked = $(this).is(':checked');
    if (checked) {
      amenityId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityId[$(this).attr('data-id')];
    }
    if (Object.keys(amenityId).length > 0) {
      $('div.amenities h4').text(Object.values(amenityId).join(', '));
    } else {
      $('div.amenities h4').html('&nbsp');
    }
  });
});
