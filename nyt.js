

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

$("#nySearch").submit(function(event){
  event.preventDefault();
  var searchTerm = $("#nySearch > #searchTerm").val();
  var numRecords = $("#nySearch > #records").val();
  var startYear = $("#nySearch > #startYear").val();
  var endYear = $("#nySearch > #endYear").val();

  //creating a query object that will accept values based on fields
  let queryObj = {"api-key":authKey, q: searchTerm};
  //this is a check for if the fields have values
  if(numRecords != "") { //not an empty string
    queryObj.page = numRecords;
  }
  if(startYear!= ""){
    queryObj.begin_date = startYear + 0101;// date needs to be in format YYYYMMDD
  }
  if(endYear != ""){
    queryObj.end_date = endYear+ 0101;
  }
  queryURLBase += $.param(queryObj);

  $.ajax({url: queryURLBase, method:"GET"})
  .done((response) => {

    // ========= articleDiv
    //response.response is pretty annoying, so Im going to save it in a variable
    var res = response.response;
    // we need to loop through the responses so
    for(var i = 0; i < numRecords; i++){
      var articleDiv = $("<div>");

      // =========headline

      var headline = res.docs[i].headline.main;

      var headlineP = $("<h1>").text(headline);

      articleDiv.append(headlineP);

      // =========author

      var author = res.docs[i].byline.original;

      var authorP = $("<p>").text(author);

      articleDiv.append(authorP);

      // ==========section

      var section = res.docs[i].source;

      var sectionP = $("<p>").text("Section: " +section)

      articleDiv.append(sectionP);

      // ==========date

      var date = res.docs[i].pub_date;

      var dateP = $("<p>").text(date);

      articleDiv.append(dateP);

      // ===========url

      var url = res.docs[i].headline.main;

      var urlP = $('<a>').text(url);

      articleDiv.append(url);

      // =========over all attachment to HTML

      $('#articles').append(articleDiv);

    }
  });
})
