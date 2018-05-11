var rp = require("request-promise"),
  cheerio = require("cheerio");

const options = {
  url: "http://music.naver.com/listen/top100.nhn?domain=TOTAL",
  transform: (body) => {
    return cheerio.load(body);
  }
};


rp(options)
.then(function($){
  const ranks = $("._tracklist_move.data0, ._tracklist_move.data1");
  return ranks.map( (idx, rank) => {
    // $(this) -> $(rank) : $(this) can't refer rank object.
    return {
      rank : $(rank).find(".ranking span span").text()
      , songTitle: $(rank).find("._title").attr("title")
      , prevRank: $(rank).find(".change span span").text() +  $(rank).find(".change em").text()
      , artistName: $(rank).find(".artist a").attr("title")
      , index: idx
    };
  }).get();
})
.then(function(json){
  // save
  console.log(json);
});
