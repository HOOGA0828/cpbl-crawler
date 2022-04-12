const request = require("request");
const cheerio = require("cheerio");
//https://www.cpbl.com.tw/standings/season

const cpblCrawler = () => {
    request({
        url: "https://www.fengyuncai.com/cpbl/standings.asp",
        method: "GET"
    }, (error, res, body) => {
        // console.log(body)
        // 如果有錯誤訊息，或沒有 body(內容)，就 return
        if (error || !body ) {
            return error;
        }
        const data = [];
        const $ = cheerio.load(body);
        // 找到戰績表節點
        const list = $("#narrowcontent tbody tr")
        for(let i = 2; i< list.length; i++){
            const team = list.eq(i).find(".lin:nth-child(1)").text();
            const win = list.eq(i).find(".lin:nth-child(2)").text();
            const lose = list.eq(i).find(".lin:nth-child(3)").text();
            const tie = list.eq(i).find(".lin:nth-child(4)").text();
            const winRate = list.eq(i).find(".lin:nth-child(5)").text();
            const continuous = list.eq(i).find(".lin:nth-child(9)").text();
            data.push({team,win,lose,tie,winRate,continuous})
        }
        console.log(data) 
    });
};

cpblCrawler();