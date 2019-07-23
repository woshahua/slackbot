const slackBot = require("slackbots")
const channel = "general"

var bot = new slackBot({
  token: "xoxb-614512919793-690126702530-KocVY9yjaAmVInnS3bGuNPx3",
  name: "test101"
});

const request = require("request")
const cheerio = require("cheerio")

const url = "https://www.myglobalip.com/"

function requestPromise(){
  return new Promise((resolve, reject) => {
    request(url, (e, response, body) => {
	if(e){
	  console.error(e)
          reject("fail to fetch")
        }
	try{
	    const $ = cheerio.load(body)
	    return resolve($(".ip").text())
        }catch(e){
	  console.error(e)
	  return reject("fail to fetch")
        }
    })
})
}

bot.on("message", async(data) =>{
  if (data.type !== "message"){
    return
  }
  var ip_addr = await requestPromise()
  bot.postMessageToChannel(channel, "hello world")
  bot.postMessageToChannel(channel, ip_addr)
})

