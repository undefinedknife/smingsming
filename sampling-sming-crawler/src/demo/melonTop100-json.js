var request = require("request"),
  cheerio = require("cheerio"),
  url = "https://www.melon.com/chart/index.json";

request(url, function (error, response, body) {
  if (!error) {
    console.log(body['songList']);
    //console.log(body);
    const info = JSON.parse(body);

    console.log( info['songList'] );
    console.log( info['maxRankDay'] );

    const result = info['songList'].reduce((acc, song, index, array) => {
      acc.push({
        rank: song.curRank,
        prevRank: song.pastRank,
        songName: song.songName,
        artistName: song.artistNameBasket,
        index: index,
        rankdate: info['maxRankDay']
      });
      return acc;
    }, []);
    

    console.log( result );
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});



/*
const load = (site) => {
  const options = {
    url: site.url
  }

  const

  request(options, callback);
}
const sites = [];
const site-melon = {
  name: 'Melon',
  url: 'https://www.melon.com/chart/index.json',
  type: 'json'
}
sites.push(site-melon);


const retrieveTop100 = (sites) => {

};
*/

