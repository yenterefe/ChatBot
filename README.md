**Website Scraper Chatbot**

- A simple backend service that scrapes content from my professional website using Cheerio and uses OpenAI's GPT-4 API to answer questions based on the scraped content.

**Tech Stack**

- Backend: Node.js, Express.js

- Web Scraping: Cheerio + Axios

- AI: OpenAI API (GPT-4)

- Other Tools: dotenv for environment variables, CORS for frontend compatibility

**How It Works**

- Scrapes my personal website (yenenehgirma.com) using Cheerio to extract content from <h3> tags.

- Sends both the scraped content and a user-submitted question to the OpenAI API.

- Returns a GPT-4-generated answer based on the website content.

**Example Use Case**

- A frontend chatbot sends a question like:

"What kind of projects has Yen worked on?"

- The backend scrapes the website, adds the question, and uses GPT-4 to generate a contextual answer.

**Notes**

- The frontend currently sends POST requests to /ask with a question in the JSON body.

- Environment variable API_Key is required in a .env file for OpenAI API access.

- Only h3 headings are currently scraped, but the code is easily extendable to other elements (e.g., paragraphs, lists).

- Project was created for personal learning and exploration.

**To-Do / Improvements**

- Scrape and process additional content types (e.g., paragraphs, metadata).

- Sanitize and structure scraped text before sending to the AI.

- Improve error handling and logging.

- Integrate with a polished frontend UI for a smoother chatbot experience.
