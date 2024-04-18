#  Puppeteer : Screenshot Extraction
This is a simple web scraping script built with Puppeteer to extract details from advertisement banners on web pages.
This script allows you to scrape details such as redirection URL and image link from advertisement banners on web pages. It utilizes Puppeteer, a Node.js library for controlling headless Chrome or Chromium, to interact with web pages and extract the necessary information.
## Installation
1. Clone the repository:
2. Navigate to the project directory:
3. npm install
## Usage
1. Open the `index.js` file.
2. Update the `url` variable with the URL of the web page containing the advertisement banner you want to scrape.
3. Modify the `selector` variable to match the CSS selector of the advertisement banner element.
4. Run the script: node index.js
5. The script will scrape the details from the advertisement banner and save them to a JSON file named `details.json`.
 
