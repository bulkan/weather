console.log(appKey);

function autocomplete(json){
  console.log(json.RESULTS);

  var results = $('#results').hide().html('');

  $.each(json.RESULTS, function(i, location) {
    var p = $('<p>');
    p.attr('data-link', location.l).html(location.name).attr('class', 'location_item');
    results.append(p);
  });

  results.slideDown('fast');

  $('.location_item').on('click', function(e){
    var location = $(e.target);
    var results = $('#results');

    results.slideUp().html('');

    // read the location from the input box
    $('#location').val(location.text());

    // remove the previous img tags that show the current weather
    var weather = $('#weather');
    weather.find('img').remove();
    var current_temp = $('#current_temp');
    current_temp.html('');

    $.ajax('/condition?link=' + location.attr('data-link') ).done(function(data){
      var co = data.current_observation;
      // show the current weather string
      current_temp.html(co.temperature_string);
      $('<img>').attr('src', co.icon_url).appendTo(weather);
      weather.fadeIn();
    });
  });

};

// store the return value for the setTimeout below to be able to clear out later.
var timer = void 0;

$(document).ready(function(){
   // seems like you dont need the api `key` for the AutoComplete api
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
    }, 200);
  });

});
