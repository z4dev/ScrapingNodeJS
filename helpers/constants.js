export const URLS = {
    TECH_GATE :'https://www.aitnews.com',
    ARAB_HARDWARE :'https://www.arabhardware.net',
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
        TELEGRAM_BOT_TOKEN : '7358343640:AAHYDLwlEpPRPS3fQX1poSmG27S-M4NMwV8',
        TELEGRAM_CHANNEL_ID : '@ziad_tech_news',
        imageStyle: '.big-thumb-left-box-inner',
        keywords: '',
        source_id: 1
    },
   {
    id: 2,
    name: 'Arab Hardware',
    url: URLS.ARAB_HARDWARE,
    selector: '.post-item',
    title: '.post-item-details a',  // title
    articleUrl: 'a', // link
    date: '.meta-date-author', // adjusted based on provided structure
    image: 'img.lazyload[data-src]', // Selector for the image URL (data-src attribute)
    imageStyle: '.image-wrapper', // The wrapper around the image
    metaViews: '.meta-views p', // Ensure this exists in your HTML
    metaTime: '.meta-time p', // Ensure this exists in your HTML
    keywords: '',
    source_id: 2,
    TELEGRAM_BOT_TOKEN : '7358343640:AAHYDLwlEpPRPS3fQX1poSmG27S-M4NMwV8',
    TELEGRAM_CHANNEL_ID : '@ziad_tech_news',
}

]
