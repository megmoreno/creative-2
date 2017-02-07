$(document).ready(function() {
  
  var beginDate = "20080903";
  var endDate = "20080904";

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  var articles = [];
  
  url += '?' + $.param({
    'api-key': "36cb9403d4a8431bac2ea5a69539ff53",
    'begin_date': beginDate,
    'end_date': endDate
  });
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function(result) {
    articles = result['response']['docs'];
    var articleContent = "";
    for(var i=0; i<articles.length; i++){
      var article = articles[i];
      var headline = article['headline']['main'];
      var snippet = article['snippet'];
      var pictureSrc = "";
      if(article['multimedia'].length == 0){
        pictureSrc = "nyt-logo.png";
      }
      else {
        pictureSrc = 'http://www.nytimes.com/' + article['multimedia'][0]['url'];
      }
      articleContent += "<div class='media'><div class='media-left'><a href='#'><img class='media-object' src='" + pictureSrc + "' height='50px'></a></div><div class='media-body'><h4 class='media-heading'>" + headline + "</h4>" + snippet + " <a href=''>View More</a></div></div>";
      
    }
    $('#articles').html(articleContent);
    console.log(result);
  }).fail(function(err) {
    throw err;
  });
});
