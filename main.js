$(document).ready(function() {
  
    $('#modal').on('show.bs.modal', function () {
        $(this).find('.modal-body').css({
            width: 'auto', //probably not needed
            height: 'auto', //probably not needed 
            'max-height': '100%'
        });
    });

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
      articleContent += "<div class='media'><div class='media-left'><a href='#'><img class='media-object' src='" + pictureSrc + "' height='50px'></a></div><div class='media-body'><h4 class='media-heading'>" + headline + "</h4>" + snippet + " <a class=\"learnMore\" data-location='" + i + "'>View More</a></div></div>";
      
    }
    $('#articles').html(articleContent);
    console.log(result);
    $('a.learnMore').click(function (e) {
        
       
        var arrayLocation = e.target.dataset.location;
        var article = articles[arrayLocation];
        var leadParagraph = article['lead_paragraph'];
        var headline = article['headline']['main'];
        var pictureSrc = "";
        if (article['multimedia'].length == 0) {
            pictureSrc = "nyt-logo.png";
        }
        else {
            pictureSrc = 'http://www.nytimes.com/' + article['multimedia'][0]['url'];
        }
        
        $('#modal-title').text(headline);
        $('#articlePicture').html("<img src='" + pictureSrc + "' height='150px' style='margin:auto'/>");
        $('#articleInformation').text(leadParagraph);

        $('#myModal').modal('show');
    })
  }).fail(function(err) {
    throw err;
  });
});
