var request = require("request"),
  cheerio = require("cheerio"),
  url = "https://www.melon.com/chart/index.htm";

const options = {
  url: "https://www.melon.com/chart/index.htm"
};

function parseMelon(error, response, body) {
  if (!error) {
    const $ = cheerio.load(body);
    const ranks = $(".service_list_song table tbody tr.lst50, .service_list_song table tbody tr.lst100");

    return ranks.map( (idx, rank) => {
      // $(this) -> $(rank) : $(this) can't refer rank object.
      return {
        rank : $(rank).find(".rank").text()
        , songTitle: $(rank).find(".wrap_song_info .rank01 span a").text()
      };
    }).get();

  } else {
    console.log("We’ve encountered an error: " + error);
  }
};

const result = [];
request(options, parseMelon);