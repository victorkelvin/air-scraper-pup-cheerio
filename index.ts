import startBrowser from './src/browser';
import pup from 'puppeteer';
import * as cheerio from 'cheerio'

const url = 'https://www.airbnb.com.br/s/newyork/homes?adults=2&children=1&checkin=2022-02-12&checkout=2022-02-19';
/*
async function getData(url:string) {
    console.log(`Navigating to ${url}...`);
    const { data } = await axios.get(url);
    const $  = cheerio.load(data);
    var elements : any;
    var _name = $('.mj1p6c8').text();
    // var list = ($('.cm4lcvy').each((i, elem) => {
        // // var _name = $(elem).find('.mj1p6c8').text();
        //  var _name = "TESTE"
        // // if(newName)console.log(newName);
        // return _name;
    // }))
    console.log($.html());
    writeFile('./html.txt', $.html(), function(err){ console.log(err) })
}
*/
/* 
getData(url).then((res) => {
    console.log(res);   
}) */
// async function startBrowser() {
//     let browser: Object;

//     try {
//         console.log("Opening browser instance...");
//         browser = await puppeteer.launch({
//             headless: true,
//             args: ['--no-sandbox', '--disable-setuid-sandbox'],
//         });
//         return browser;
//     } catch (error) {
// 		console.log("Could not create a browser instance => : ", error);
//     }
// }


async function scraper(url: string) {
    let browser = await startBrowser()
    let page = await browser!.newPage();
    console.log(`Navigating to ${url}`);
    await page.goto(url);
    await page.waitForSelector('div._17h5uca');
    const content = await page.content();
    let scrapedData = await getData(content);
    console.log(scrapedData);
    browser!.close();

}

async function getData(content: string | Buffer) {
    let list: {name: string, url: string, price: string, description: string, score: string} []= []
    const $ = cheerio.load(content);
    const location = $('._gig1e7').children();
    location.each((i, elem) => {
        var name = $(elem).find('.mj1p6c8').text();
        var url = $(elem).find('.l8au1ct').attr('href');
        var price = $(elem).find('._tyxjp1').text();
        var description =$(elem).find('.mj1p6c8').text();
        var score = $(elem).find('.rpz7y38').text();
        if (name) list.push({"name": name, "url": url!, "price": price, "description": description, "score": score});
    })
    return list;
}


scraper(url);