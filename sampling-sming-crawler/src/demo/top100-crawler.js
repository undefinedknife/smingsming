var rp = require("request-promise"),
  cheerio = require("cheerio");

// songId 추가
// 전랭킹 비교로직
// 

const melonInfo = {
    options : {
        url: "https://www.melon.com/chart/index.json",
        json: true
    },
    process: ($) => {
      return $['songList'].reduce((acc, song, index, array) => {
        acc.push({
          rank: song.curRank,
          //prevRank: song.pastRank,
          songName: song.songName,
          artistName: song.artistNameBasket,
          index: index,
          //rankdate: $['maxRankDay'],
          imgPath: 'http://cdnimg.melon.co.kr' + song.albumImgPath,
          type: 'melon'
        });
        return acc;
      }, []);
    }
};

const naver50Info = {
    options : {
        url: "http://music.naver.com/listen/top100.nhn?domain=TOTAL",
        transform: (body) => {
          return cheerio.load(body);
        }
    },
    process: ($) => {
      const ranks = $("._tracklist_move.data0, ._tracklist_move.data1");
      return ranks.map( (idx, rank) => {
        // $(this) -> $(rank) : $(this) can't refer rank object.
        return {
          rank : $(rank).find(".ranking span span").text()
          , songTitle: $(rank).find("._title").attr("title")
          //, prevRank: $(rank).find(".change span span").text() +  $(rank).find(".change em").text()
          , artistName: $(rank).find(".artist a").attr("title")
          , imgPath: $(rank).find(".name a.thumb img").attr("src")
          , index: idx
          , type: 'naver'
          };
        }).get();
    }
};




const naver100Info = {
    options : {
        url: "http://music.naver.com/listen/top100.nhn?domain=TOTAL&page=2",
        transform: (body) => {
          return cheerio.load(body);
        }
    },
    process: ($) => {
      const ranks = $("._tracklist_move.data0, ._tracklist_move.data1");
      return ranks.map( (idx, rank) => {
        // $(this) -> $(rank) : $(this) can't refer rank object.
        return {
          rank : $(rank).find(".ranking span span").text()
          , songTitle: $(rank).find("._title").attr("title")
         // , prevRank: $(rank).find(".change span span").text() +  $(rank).find(".change em").text()
          , artistName: $(rank).find(".artist a").attr("title")
          , imgPath: $(rank).find(".name a.thumb img").attr("src")
          , index: idx
          , type: 'naver'
          };
        }).get();
    }
};



const bugsInfo = {
    options : {
        url: "https://music.bugs.co.kr/chart/track/realtime/total",
        transform: (body) => {
          return cheerio.load(body);
        }
    },
    process: ($) => {
      const ranks = $(".trackList tr[rowtype=track]");
      return ranks.map( (idx, rank) => {
        // $(this) -> $(rank) : $(this) can't refer rank object.
        return {
          rank : $(rank).find(".ranking strong").text()
          , songTitle: $(rank).find(".title a").attr("title")
          //, prevRank: $(rank).find(".change span").text() +  $(rank).find(".change em").text()
          , artistName: $(rank).find(".artist a").attr("title")
          , imgPath: $(rank).find("a.thumbnail img").attr("src")
          , index: idx
          , type: 'bugs'
          };
        }).get();
    }
};


const genie50Info = {
    options : {
        url: "http://www.genie.co.kr/chart/top200",
        transform: (body) => {
          return cheerio.load(body);
        }
    },
    process: ($) => {
      const ranks = $(".music-list-wrap .list-wrap tr.list");
      return ranks.map( (idx, rank) => {
        // $(this) -> $(rank) : $(this) can't refer rank object.
        return {
          rank : $(rank).find(".number").clone().children().remove().end().text().trim()
          , songTitle: $(rank).find(".info a.title").text().trim()
          , artistName: $(rank).find(".info a.artist").text().trim()
          , imgPath: 'http:' + $(rank).find(".cover img").attr("src")
          , index: idx
          , type: 'genie'
          };
        }).get();
    }
};

const genie100Info = {
    options : {
        url: "http://www.genie.co.kr/chart/top200?pg=2",
        transform: (body) => {
          return cheerio.load(body);
        }
    },
    process: ($) => {
      const ranks = $(".music-list-wrap .list-wrap tr.list");
      return ranks.map( (idx, rank) => {
        // $(this) -> $(rank) : $(this) can't refer rank object.
        return {
          rank : $(rank).find(".number").clone().children().remove().end().text().trim()
          , songTitle: $(rank).find(".info a.title").text().trim()
          , artistName: $(rank).find(".info a.artist").text().trim()
          , imgPath: 'http:' + $(rank).find(".cover img").attr("src")
          , index: idx
          , type: 'genie'
          };
        }).get();
    }
};

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

const targets = [
melonInfo
,naver50Info
,naver100Info
,bugsInfo
,genie50Info
,genie100Info
];

targets.map(target => {

  rp(target.options)
  .then(function($){
    //-> process
    return target.process($);
  })
  .then(function(json){
    //-> print
    console.log(json);

    //-> save
    const data = {
      rankDateTime: '2018050101',
      data : json 
    };
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("sming");
      
      dbo.collection("ranks").insertOne(data, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        db.close();
      });
    });
  });  

});
