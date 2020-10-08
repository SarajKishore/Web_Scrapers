const requestPromise= require('request-promise');
const cheerio= require('cheerio');
const fs= require('fs');
const request = require('request');

const URLS=[
    {
        url:'https://www.imdb.com/title/tt0102926/',
        id:'the_silence_of_the_lambs'
    },
    {
        url:'https://www.imdb.com/title/tt2267998/',
        id:'gone_girl'
    }
];

(async()=>{
    let moviesData= [];
    for(let movie of URLS){
        const response = await requestPromise({
            uri: movie.url,
            headers: {
                //'Referer': 'https://www.imdb.com/title/tt0102926/',
                'Sec-Fetch-Mode': 'no-cors',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'
            },
        });
        let $=cheerio.load(response);
        let genres=[];
        $('div[class="title_wrapper"] a[href^="/search/"]').each((i,elm)=>{
        let genre=$(elm).text();
        genres.push(genre);
        });
        let title= $('div[class="title_wrapper"]> h1').text();
        let rating= $('span[itemprop="ratingValue"]').text();
        let poster=$('div[class="poster"]>a>img').attr('src');
        let totalRating =$('div[class="imdbRating"]>a').text();
        let releaseDate=$('div[class="subtext"]>a[title="See more release dates"]').text();
        let popularity=$('#title-overview-widget > div.plot_summary_wrapper > div.titleReviewBar > div:nth-child(5) > div.titleReviewBarSubItem > div:nth-child(2) > span').text().trim();
        moviesData.push({
            title,
            rating,
            poster,
            totalRating,
            releaseDate,
            genres,
            popularity
        });
        let file=fs.createWriteStream(`${movie.id}.jpg`);

        await new Promise((reslove,reject)=>{
        let stream= request({
            uri: poster,
            headers:{
                'Sec-Fetch-Mode': 'no-cors',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36'
            },
            gzip: true
        })
        .pipe(file)
        .on('finish',()=>{          //when request library finishes with an request it throws an finish event  
            console.log(`${movie.id} image successfully downloaded`);
            reslove();
        })
        .on('error',(error)=>{
            reject(error)
        })             
       })
       .catch(error =>{
           console.log(`${movie.id} image failed to download ${error}`)
       })
                
       
    }
    })()