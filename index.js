const requestPromise= require('request-promise');
const cheerio= require('cheerio');
const fs= require('fs');
const request = require('request');

const URLS=[
    {url:'https://www.imdb.com/title/tt0102926/'},
    {url:'https://www.imdb.com/title/tt2267998/'}
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
        let poster=$('div[class=postr"]>a>img').attr('src');
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
        })
        fs.writeFileSync('./data.json',JSON.stringify(moviesData),'utf-8'); //means it will wait until the syntax is executed
        //like awiat but not because it dosen't return a promise
        console.log(moviesData);
       
    }
    })()