console.log(appKey);

function autocomplete(json){
  
  console.log(json.RESULTS);

  var results = $('#results');

  $.each(json.RESULTS, function(i, location) {
      results.append('<p class="location_item">' + location.name + '</p>');
  });

  results.slideDown();

  $('.location_item').on('click', function(e){
    var location = $(e.target).text();
    var results = $('#results');

    results.slideUp().html('');

    $('#location').val(location);

    $.ajax('/condition').done(function(data){
      var weather = $('#weather');
      var co = data.current_observation;
      $('#current_temp').html(co.temperature_string);
      $('<img>').attr('src', co.icon_url).appendTo(weather);
    });
  });

};

var timer = void 0;

$(document).ready(function(){
   var url = 'http://autocomplete.wunderground.com/aq?format=JSON&query=';

   $('#location').bind('keyup', function(e) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(function(){
      var query = e.target.value;
      $.ajax({
        url: url + query + '&cb=autocomplete', 
        dataType: 'jsonp',
        contentType: 'application/json'
      });
    }, 500);
  });

});
