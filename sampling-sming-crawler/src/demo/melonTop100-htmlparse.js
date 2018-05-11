var request = require("request"),
  cheerio = require("cheerio"),
  url = "https://www.melon.com/chart/index.htm";

request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
    var ranks = $(".service_list_song table tbody tr.lst50");
   
    var result = ranks.map(function(idx, rank){
       console.log(idx, $(this).html());
    	return {
    		rank : $(this).find(".rank").text()
    		, songTitle: $(this).find(".wrap_song_info .rank01 span a").text()
    	};
    }).get();
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});