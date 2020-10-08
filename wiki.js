const requestPromise= require('request-promise');
const cheerio= require('cheerio');
const fs= require('fs');
const request = require('request');

const URL=[
    {
        url:'https://en.wikipedia.org/wiki/Nazi_Germany',
        id:'Nazi Germany'
    },
    {
        url:'https://en.wikipedia.org/wiki/Weimar_Republic',
        id:'Weimar Republic'
    },
    {
        url:'https://en.wikipedia.org/wiki/East_Germany',
        id:'East Germany'
    }
];

(async()=>{
    //let wikidata=[];
    for(let wikis of URL){
        const respone= await requestPromise({
            uri:wikis.url,
            
        });
        let $=cheerio.load(respone);
        let picture=$('div[style="padding-bottom:3px;"]>a>img').attr('src');
        let p1="https:"+picture
        console.log(p1);
        let file=fs.createWriteStream(`${wikis.id}.png`);
        let stream=request({
            uri: p1,
        }).pipe(file);
    }
})()