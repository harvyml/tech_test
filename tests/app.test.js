const puppeteer = require("puppeteer")

// test("Show open browser", async () => {
//     const browser = await puppeteer.launch({
//         headless: false,
//         slowmo: 80,
//         // args: ["--window-size=1920,1080"]
//     })
//     const page = await browser.newPage()
//     await page.goto("http://localhost:3000/")
// })

test("Should type and submit form", async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowmo: 500,
        // args: ["--window-size=1920,1080"]
    })

    let emailInput = "input[name='session[username_or_email]']"
    let passwordInput = "input[name='session[password]']"
    let formPath = "form[action='/sessions']"
    const page = await browser.newPage()
    await page.goto("https://twitter.com/login")
    await page.click(emailInput)
    await page.type(emailInput, "harvyestebanml@gmail.com")
    await page.click(passwordInput)
    await page.type(passwordInput, "harvy2002ml")
    await page.$eval(formPath, form => form.submit());
    
}, 1000000)