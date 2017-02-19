

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

$("#nySearch").submit(function(event){
  event.preventDefault();
  var searchTerm = $("#nySearch > #searchTerm").val();
  var numRecords = $("#nySearch > #records").val();
  var startYear = $("#nySearch > #startYear").val();
  var endYear = $("#nySearch > #endYear").val();

  queryURLBase += $.param({"api-key":authKey, q: searchTerm});

  $.ajax({url: queryURLBase, method:"GET"})
  .done((response) => {

    // ========= articleDiv

    var articleDiv = $("<div>");

    // =========headline
    var headline = response.response.docs[0].headline.main;

    var headlineP = $("<h1>").text(headline);

    articleDiv.append(headlineP);

    // =========author

    var author = response.response.docs[0].multimedia.credit;

    var authorP = $("<p>").text("By" +author);

    articleDiv.append(authorP);

    // ==========section

    var section = response.response.docs[0].source;

    var sectionP = $("<p>").text("Section:" +section)

    articleDiv.append(sectionP);

    // ==========date

    var date = response.response.docs[0].pub_date;

    var dateP = $("<p>").text(date);

    articleDiv.append(dateP);

    // ===========url

    var url = response.response.docs[0].headline.main;

    var urlP = $('<a>').text(url);

    articleDiv.append(url);

    // =========over all attachment to HTML

    $('#articles').append(articleDiv);


    });
})
