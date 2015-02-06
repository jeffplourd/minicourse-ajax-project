
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
    var nytimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + cityLocation + "&sort=newest&api-key=4fae68afa794a24071e2ef8eec4edf56:1:71156901";
    $.getJSON(nytimesUrl, function(data){
        console.log(data);

        $nytHeaderElem.text('New York Times Articles About ' + cityLocation);

        articles = data.response.docs;

        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
        };

    }).error(function(e){
        nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    //I'm going to create a JSON.ajax() request
    var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + cityLocation + "&format=json&callback=wikiCallback";

    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function ( response ) {
            console.log(response);
            var articleList = response[1];
            for(var i = 0; i < articleList.length; i++) {
                var articleStr = articleList[i];
                var url = "http://en.wikipedia.org/wiki/" + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();
