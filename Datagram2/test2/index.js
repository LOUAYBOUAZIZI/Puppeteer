const puppeteer = require('puppeteer');
const fs = require('fs');


async function scrapeBannerDetails(htmlElement) {
    try {
        const screenshotPath = 'banner_screenshot.png';
        await htmlElement.screenshot({ path: screenshotPath });
        
        const adDetails = await htmlElement.evaluate((bannerElement) => {
            
            if (bannerElement) {
                const screenshotPath = 'banner_screenshot.png';
                const anchorElement = bannerElement.querySelector('a');
                const redirectionUrl = anchorElement ? anchorElement.getAttribute('href') : null;
                const imgElement = bannerElement.querySelector('img');
                const imgLink = imgElement ? imgElement.getAttribute('src') : null;
                const format=  'Left Side Banner';
                return {
                    redirection_url: redirectionUrl,
                    img_link: imgLink,
                    format: format,
                    screenshot_path: screenshotPath,
                    
                };
            }

            return null; 
        });

        return adDetails;

    } catch (error) {
        console.error('Error scraping banner details:', error);
        return null;
    }
}

(async () => {

    const selector = '#side-sticky-bar > div.uk-margin.uk-promo-sidebar > div > div > div > div';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36');
    const url = "https://www.pascalcoste-shopping.com/esthetique/fond-de-teint.html";
    await page.goto(url);
    const cookiePopupSelector = '#html-body > div.amgdprcookie-bar-template.-popup';
    const cookiePopupExists = await page.$(cookiePopupSelector);
    if (cookiePopupExists) {
        await page.waitForSelector(cookiePopupSelector);
        await page.click(cookiePopupSelector + ' > div.amgdprcookie-bar-container > div.uk-close-cookie > i');
    } else {
        console.log('Cookie consent popup not found.');
    }
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.waitForSelector(selector);
    
    const htmlElement = await page.$(selector);

    if (htmlElement) {
        
        const adDetails = await scrapeBannerDetails(htmlElement);

        if (adDetails) {
            
            const jsonFilePath = 'details.json';
            fs.writeFileSync(jsonFilePath, JSON.stringify(adDetails, null, 2));

            console.log('Advertisement details saved:', adDetails);

        } else {
            console.log('Failed to scrape banner details.');
        }
    } else {
        console.log('Banner element not found.');
    }

    
    await browser.close();
})();
