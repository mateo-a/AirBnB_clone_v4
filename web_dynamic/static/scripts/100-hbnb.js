document.addEventListener('DOMContentLoaded', function () {
  const amenityId = {};
  $('.amenities input[type=checkbox]').change(function () {
    const checked = $(this).is(':checked');
    if (checked) {
      amenityId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityId[$(this).attr('data-id')];
    }
    if (Object.keys(amenityId).length > 0) {
      $('div.amenities h4').text(Object.values(amenityId).join(', '));
    } else {
      $('div.amenities h4').html('&nbsp;');
    }
  });

  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      dataType: 'JSON',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(amenityId), states: Object.keys(stateId), cities: Object.keys(cityId) }),
      success: function (data) {
        $('.places').empty();
        $.each(data, function () {
          const selectedPlace = `<article><div class="title_box"><h2>${this.name}</h2><div class="price_by_night">$${this.price_by_night}</div></div><div class="information"><div class="max_guest">${this.max_guest} Guest(s)</div><div class="number_rooms">${this.number_rooms} Bedroom(s)</div><div class="number_bathrooms">${this.number_bathrooms} Bathroom(s)</div></div><div class="description">${this.description}</div></article>`;
          $('.places').append(selectedPlace);
        });
      }
    });
  });

  const stateId = {};
  const cityId = {};
  $('.check_state').change(function () {
    const checked = $(this).is(':checked');
    if (checked) {
      stateId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete stateId[$(this).attr('data-id')];
    }
    if (Object.keys(stateId).length > 0) {
      $('.locations h4').text(Object.values(stateId).concat(Object.values(cityId)).join(', '));
    } else {
      $('.locations h4').html('&nbsp;');
    }
  });

  $('.check_city').change(function () {
    const checked = $(this).is(':checked');
    if (checked) {
      cityId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete cityId[$(this).attr('data-id')];
    }
    if (Object.keys(cityId).length > 0) {
      $('.locations h4').text(Object.values(cityId).concat(Object.values(stateId)).join(', '));
    } else {
      $('.locations h4').html('&nbsp;');
    }
  });
});

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/status/',
  type: 'GET',
  dataType: 'JSON',
  success: function (response) {
    $('#api_status').addClass('available');
  },
  error: function () {
    $('#api_status').removeClass('available');
  }
});

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'POST',
  dataType: 'JSON',
  contentType: 'application/json',
  data: JSON.stringify({}),
  success: function (data) {
    $.each(data, function () {
      const articleTag = `<article><div class="title_box"><h2>${this.name}</h2><div class="price_by_night">$${this.price_by_night}</div></div><div class="information"><div class="max_guest">${this.max_guest} Guest(s)</div><div class="number_rooms">${this.number_rooms} Bedroom(s)</div><div class="number_bathrooms">${this.number_bathrooms} Bathroom(s)</div></div><div class="description">${this.description}</div></article>`;
      $('.places').append(articleTag);
    });
  },
  error: function (error) {
    console.log(error);
  }
});
