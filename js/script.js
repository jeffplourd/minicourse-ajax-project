
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
    var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q='%data%'&api-key=4fae68afa794a24071e2ef8eec4edf56:1:71156901";
    var nytURL = URL.replace("%data%", fullLocation);
    $.getJSON(nytURL, function(data){
        console.log(data);
        var items = [];
        var nytData = data.response.docs;
        $.each(nytData, function(key,val) {
            //<li id='key'><a href='val.web_url'>val.snippet</a></li>;
            if(val.snippet)
                items.push("<li id='" + key + "'><a href='" + val.web_url + "'>" + val.snippet + "</a></li>");
        });
        var listItems = items.join("");

        $("#nytimes-articles").append(listItems);

    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
