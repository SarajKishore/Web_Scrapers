const request= require('request-promise');
const cheerio = require('cheerio');
(async() =>{
    const USERNAME='willsmith';
    const BASE_URL=`https://instagram.com/${USERNAME}`;

    let respone= await request(BASE_URL);
    let $= cheerio.load(respone); 
    let script =$('script[type="text/javascript"]').eq(3).html();
    let script_regex=/window._sharedData =(.+);/g.exec(script);
    let {entry_data:{ ProfilePage : { [0] : { graphql : { user } } } } }=JSON.parse(script_regex[1]);
    let instagram_data={
        followers: user.edge_followed_by.count,
        following: user.edge_follow.count,
        uploads: user.edge_owner_to_timeline_media.count,
        full_name: user.full_name,
        bio: user.biography,
        picture_url: user.profile_pic_url_hd
    }
    //console.log(instagram_data)
    debugger;
})()