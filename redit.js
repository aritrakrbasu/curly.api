const puppeteer = require('puppeteer');
const subreddit_url =(reddit) => `https://www.reddit.com/r/${reddit}/`;

const self={
    browser:null,
    page: null,

    initalize: async(reddit) =>{
        self.browser = await puppeteer.launch({
            headless:false
        });

        self.page =await self.browser.newPage();

        //Go to sub reddit

        await self.page.goto(subreddit_url(reddit),{
            waitUntil:'networkidle0'
        });
    }
}
module.exports = self;