const requestPromise= require('request-promise');
const cheerio= require('cheerio');
const fs= require('fs');
const request = require('request');

const URLS='';

(async() =>{
    const response = await requestPromise({
        uri : URLS
    });
    let $=cheerio.load(response);

    let links = $('video[class="player_el player_el_nc"]').attr('src');
    console.log(links)
})()

//video[class="player_el player_el_nc"]