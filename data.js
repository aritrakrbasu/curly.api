const express = require('express');
const data = require('./curldetails');


const router =express.Router();
const puppeteer = require("puppeteer");
const fs = require("fs");


var methods = {
	updatedata: function() {

      (async function run()  {

            
            // The number of posts. 25 would give you about 100
            const amount = 25;

            // The location / URL
            const url = "https://www.reddit.com/r/curlyhair";

            // All of the article as key-value pairs
            let articleObject = {};

            console.log("Getting posts from Reddit");

            // Create the browser
            const browser = await puppeteer.launch({
                headless: true
            });

            // Navigate to the website
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: "load" ,timeout:0});
            
            await page.setDefaultNavigationTimeout(0); 

            // Get the root element of all the posts
            const root = (await page.$$(`.rpBJOHq2PR60pnwJlUyP0`))[0];

            // All the posts
            const posts = [];

            // For amount
            for (let i = 0; i < amount; i++) {

                // Get all the posts in this chunk
                const chunk = await (await root.$$("._1poyrkZ7g36PawDueRza-J"));

                // Add all the posts in this chunk to the posts array
                posts.push(...chunk);

                // Wait for 1 second
                await sleep(1000);

                // Scroll to the next chunk
                await page.evaluate(() => {
                    window.scrollBy(0, (630*12));
                });

            }

            console.log("Extracting Curls from posts");

            // For each post
            for (const post of posts) {

                try {

                    

                    // Get the title
                    const title = await getProperty(post, "textContent", "_eYtD2XCVieq6emjKBH3m");

                    // Get the image articleObject
                    const image = await getProperty(post, "src", "ImageBox-image");

                    // Add the post to the article object
                    articleObject[title] = { image: image };

                } catch (error) {
                        console.log(error);
                }

            }

            console.log("Converting Curly hair posts into an array");

            // Convert the article object into an array
            const article = [];
            for (const post in articleObject) {
                article.push({
                    title: post,
                    image: articleObject[post].image
                
                })
            }

            console.log("Saving article");

            // Save the article to a file
            fs.writeFileSync("curldetails.js", "const express = require('express');var data= "+JSON.stringify(article)+"; module.exports =data;");

            

            // Close the browser
            await browser.close();

        })();

        // Get a property on an element from within an object
        async function getProperty(rootElement, property, className) {
            const element = (await rootElement.$$(`.${className}`))[0];
            return await (await element.getProperty(property)).jsonValue();
        }

        // Sleep for x
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
}
exports.data = methods;