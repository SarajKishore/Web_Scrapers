const requestPromise= require('request-promise');
const cheerio= require('cheerio');
const fs= require('fs');
const request = require('request');
const URLS=
   '';

(async()=>{
    const response = await requestPromise({
        uri : URLS
    });
    let $=cheerio.load(response);
    let pics=[];
    let pic1=[];

    let vid=[];
    let vid1=[];
   
    // let poster=$('img[class="mini_post_vid_thumb"]').attr('src');
    $('img[class="mini_post_vid_thumb"]').each((i,elm)=>{
        let pic=$(elm).attr('src');
        pics.push(pic);
    });

    pics.forEach((elm)=>{
        let a ="http:"+elm;
        pic1.push(a);
    })
    for (let i = 0; i < pic1.length; i++) {
        let file=fs.createWriteStream(`./pics/${i}.jpg`);
        let stream=request({
            uri: pic1[i]
        }).pipe(file)        
    }
    $('video[class="hvp_player"]').each((i,elm)=>{
        let a=$(elm).attr('src');
        vid.push(a);
    });
    vid.forEach((elm)=>{
        let a ="http:"+elm;
        vid1.push(a);
    })
    for (let i = 0; i < vid1.length; i++) {
        let file=fs.createWriteStream(`./pics/${i}.mp4`);
        let stream=request({
            uri: vid1[i]
        }).pipe(file)        
    }
    
})()