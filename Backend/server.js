const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cheerio = require('cheerio');
const axios = require('axios');
const openAI = require("openai");
const cors = require('cors');

dotenv.config();

const PORT = 3000;

app.use(express.json());

app.use(cors());

const API = process.env.API_Key;

//website to scrape
const yenURL = "https://www.yenenehgirma.com/";

//use cheerio to scrape website 
async function scrapeWebsite(url) {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    //Want to save this for future reference
    // const paragraphs = $('p').addClass('mt-1').map((i, el) => $(el).text()).get()

    const headings = $('h3').map((i, el) => $(el).text()).get();

    return headings.join("\n").trim(); // Return combined text
}


const openai = new openAI({
    apiKey: API
});

// receive question from the frontend to send a question to chatGPT
app.post("/ask", async (request, response) => {
    try {
        const question = await request.body.question;
        response.json(question);

        const scrapedWebsite = await scrapeWebsite(yenURL);
        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { "role": "user", "content": `Here is the scraped content from my website${scrapedWebsite}. Please extract and answer:${question}` }
            ],
            max_tokens: 400
        });
        console.log("my question is " + question);
        const answer = completion.choices[0].message;
        console.log(answer);
    }

    catch (error) {
        response.json(error);
    }
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));