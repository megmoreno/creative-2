
var submitFunction = function () {
    var date = $('#date').value();
    var nextDate = date++;
    debugger;
}
var paddy = function (n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
}

$(document).ready(function () {
  
    $('#modal').on('show.bs.modal', function () {
        $(this).find('.modal-body').css({
            width: 'auto', //probably not needed
            height: 'auto', //probably not needed 
            'max-height': '100%'
        });
    });
    $('#submitbutton').click(function () {
        var date = new Date($('#date').val());
        var nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        var beginYear = date.getFullYear().toString();
        var beginMonth;
        var beginDay;
        var endYear = date.getFullYear().toString();
        var endMonth;
        var endDay;
        if (date.getMonth() < 10)
        {
            beginMonth = paddy(date.getMonth(), 2);
        }
        else {
            beginMonth = date.getMonth();
        }
        if (date.getDate() < 10)
        {
            beginDate = paddy(date.getDate(), 2);
        }
        else
        {
            beginDate = date.getDate();
        }
        if (nextDate.getMonth() < 10) {
            endMonth = paddy(nextDate.getMonth(), 2);
        }
        else {
            endMonth = nextDate.getMonth();
        }
        if (nextDate.getDate() < 10) {
            endDate = paddy(nextDate.getDate(), 2);
        }
        else {
            endDate = nextDate.getDate();
        }
        var totalBegin = (beginYear + beginMonth + beginDate);
        var totalEnd = (endYear + endMonth + endDate);
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "36cb9403d4a8431bac2ea5a69539ff53",
            'begin_date': totalBegin,
            'end_date': totalEnd
        });
        var articles = [];
        $.ajax({
            url: url,
            method: 'GET',
        }).then(function(result) {
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
        }).fail(function (err) {
            throw err;
        })
    })
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
