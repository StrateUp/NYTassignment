

var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=";

$("#nySearch").submit(function(){
  var searchTerm = $("#nySearch > #searchTerm").val();
  var numRecords = $("#nySearch > #records").val();
  var startYear = $("#nySearch > #startYear").val();
  var endYear = $("#nySearch > #endYear").val();
  queryURLBase += $.param({q: searchTerm, fl: numRecords, begin_date: startYear, end_date: endYear});

  $.ajax({url: queryURLBase, method:"GET"}).done((response) => {
    console.log(response);
  });
})
