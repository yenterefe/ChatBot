const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');
const openAI = require("openai");



const PORT = 3000;

app.use(express.json());

const API = process.env.API_Key;

//website to scrape
const lakeWorthUrl = "https://library.municode.com/fl/lake_worth_beach/codes/code_of_ordinances?nodeId=PTIICOOR_CH23LADERE_ART3ZODI_DIV2REDI_S23.3-7-SMIRE"
const yenURL = "https://www.yenenehgirma.com/";

//use cheerio to scrape website 
async function scrapeWebsite(url) {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const paragraphs = $('p').map((i, el) => $(el).text()).get()

    return paragraphs.join("\n");

    // const headings = $('h3').map((i, el) => $(el).text()).get();

    // return headings.join("\n").trim(); // Return combined text
}


const openai = new openAI({
    apiKey: API
})

app.post("/ask", async (request, response) => {

    try {
        const scrapedWebsite = await scrapeWebsite(lakeWorthUrl);
        console.log(scrapedWebsite);
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { "role": "user", "content": `Here is the scraped content from the Lake Worth ordinances:${scrapedWebsite}.Please extract and summarize what is the maximum impermeable surface for lots between 5000 square feet and 7499 square feet in the SF-R district?` }
                // { "role": "user", "content": `Here is the scraped content from my website${scrapedWebsite}. Please extract and summarize many years I have been programming?` }
            ],
            max_tokens: 400
        });
        response.json(completion.choices[0].message);
    }

    catch (error) {
        response.json(error);
    }

});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));