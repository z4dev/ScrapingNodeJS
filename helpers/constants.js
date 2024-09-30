export const URLS = {

    //tech (bot A)
    TECH_GATE :'https://www.aitnews.com',
    ARAB_HARDWARE :'https://www.arabhardware.net',


    //mobiles (bot B)
    TR_ARABIC :"https://arabic.rt.com/tags/mobile/",
    RAQAMI_TV : "https://raqamitv.com/category/topics-and-devices/smartphones/topics-and-devices/smartphones/",

    // compar (bot C)

    RAQAMI_TV_COMPARISONS : "https://raqamitv.com/comparisons-list/"

}



const TELEGRAM_CHANNELS = {

    BOT_TOKEN_A : '7358343640:AAHYDLwlEpPRPS3fQX1poSmG27S-M4NMwV8',
    BOT_CHANNEL_NAME_A : '@ziad_tech_news',


    BOT_TOKEN_B : '7547133192:AAEchdkHfgGScgQ4gzKHzcbPOSQKzlvXId0',
    BOT_CHANNEL_NAME_B : '@techNews0011',


    BOT_TOKEN_C : "7689902377:AAFS3hQo8_5whuh4NsHOpPdrR0figQ4cnZQ",
    BOT_CHANNEL_NAME_C : '@phones_vs'

}

export const SOURCES = [
    {
        id: 1,
        name: 'AIT News',
        url: URLS.TECH_GATE,
        selector: '.post-item, .tie-video',
        title: 'a[aria-label]',
        articleUrl: 'a',
        date: '.date',
        image: 'img',
        TELEGRAM_BOT_TOKEN : TELEGRAM_CHANNELS.BOT_TOKEN_A,
        TELEGRAM_CHANNEL_ID : TELEGRAM_CHANNELS.BOT_CHANNEL_NAME_A,
        imageStyle: '.big-thumb-left-box-inner',
        keywords: '',
        source_id: 1
    },
   {
    id: 2,
    name: 'Arab Hardware',
    url: URLS.ARAB_HARDWARE,
    selector: '.post-item',
    title: '.post-item-details a', 
    articleUrl: 'a',
    date: '.meta-date-author',
    image: 'img.lazyload[data-src]',
    imageStyle: '.image-wrapper', 
    metaViews: '.meta-views p', 
    metaTime: '.meta-time p', 
    keywords: '',
    source_id: 2,
    TELEGRAM_BOT_TOKEN : TELEGRAM_CHANNELS.BOT_TOKEN_A,
    TELEGRAM_CHANNEL_ID : TELEGRAM_CHANNELS.BOT_CHANNEL_NAME_A,
}
,



{
    id: 3,  
    name: 'TR arabic',  
    url: URLS.TR_ARABIC,  // URL of TR Arabic
    selector: 'article.main-news__main-article',  // Matches the individual article container
    title: 'h3.main-article__title a',  // The title is inside the <h3> tag within <a>
    articleUrl: 'h3.main-article__title a',  // The URL is inside the <a> tag
    image: 'figure.main-figure img',  // The image is in the <img> tag within the <figure>
    keywords: 'ul.main-article__tags li.tags__item a',  // Keywords are inside the <li> tags within the <ul>
    views: 'span.main-article__views-number',  // Extract the views number from this <span> tag
    TELEGRAM_BOT_TOKEN: TELEGRAM_CHANNELS.BOT_TOKEN_C,  // Replace with your Telegram bot token or pull from environment variables
    TELEGRAM_CHANNEL_ID: TELEGRAM_CHANNELS.BOT_CHANNEL_NAME_C,  // Replace with your Telegram channel ID
    source_id: 3  // The unique source ID
},


{
    id: 4,  // Unique ID for this source
    name: 'Raqami TV',  
    url: URLS.RAQAMI_TV,  // URL of Raqami TV
    selector: 'li.post-item',  // Matches the individual post containers
    title: 'h2.post-title a',  // The title is inside the <h2> tag within <a>
    articleUrl: 'h2.post-title a',  // The URL is inside the <a> tag
    image: 'a.post-thumb img',  // The image is inside the <img> tag within the <a>
    date: 'div.post-meta span.date',  // Date is inside the <span> tag with class 'date'
    views: 'div.post-meta span.meta-views',  // Views are inside the <span> tag with class 'meta-views'
    excerpt: 'p.post-excerpt',  // TViews are inside the <span> tag with class 'meta-views'
    TELEGRAM_BOT_TOKEN: TELEGRAM_CHANNELS.BOT_TOKEN_B,  // Replace with your Telegram bot token or pull from environment variables
    TELEGRAM_CHANNEL_ID: TELEGRAM_CHANNELS.BOT_CHANNEL_NAME_B,  // Replace with your Telegram channel ID
    excerpt: 'p.post-excerpt',  // The excerpt/summary text is inside the <p> tag with class 'post-excerpt'
    source_id: 4  // The unique source ID for this particular scraping source,
    ,
    type : 'mobiles'
}
,
{
    id: 5,  
    name: 'RaqamiTV Comparisons',  
    url: URLS.RAQAMI_TV_COMPARISONS,  // Base URL of the website
    selector: 'ul.aps-comps.clearfix li',  // Matches the individual post container inside the <ul> list
    title: 'h2.aps-comp-list-title a',  // The title is inside the <h2> tag within <a>
    articleUrl: 'h2.aps-comp-list-title a',  // The URL is inside the <a> tag
    image: '.aps-comps-thumb img',  // The image is in the <img> tag within the <span> and `src` holds the image URL
    keywords: null,  // No specific keywords in this structure
    views: null,  // No views available in this structure
    TELEGRAM_BOT_TOKEN: TELEGRAM_CHANNELS.BOT_TOKEN_C,  // Replace with your Telegram bot token or pull from environment variables
    TELEGRAM_CHANNEL_ID: TELEGRAM_CHANNELS.BOT_CHANNEL_NAME_C,  // Replace with your Telegram channel ID
    source_id: 5 ,
    type : 'comparisons'
}




]


