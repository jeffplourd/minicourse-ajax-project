
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetLocation = $("#street").val();
    var cityLocation = $("#city").val();
    var fullLocation = streetLocation + ", " + cityLocation;
    var bgImageTemp = '<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x400&location=%data%">';
    var bgImage = bgImageTemp.replace("%data%", fullLocation);
    $body.append(bgImage);


    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
