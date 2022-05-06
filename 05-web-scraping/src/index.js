import jsdom from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"

(async ()=> {
    const browser  = await puppeteer.launch();

    const page = await browser.newPage();
    const page2 = await browser.newPage();
    const page3 = await browser.newPage();
    await page2.goto('https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops')
    await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Donn%C3%A9es_cantonales');
    const listlien = await page2.$$eval('div.col-sm-4 > div > div > h4 > a',e=>e.map((a)=>a.href))
  
    //await page.$('.wikitable sortable jquery-tablesorter');
    const h2 = await page.$eval('h2', (h2) =>{
        return h2.innerHTML
    });
    // const nomdescantons = await page.$$('.wikitable > tbody > tr > td > a', (table)=>{
    //     return table
    // })
   // .wikitable > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(3) > a:nth-child(1)
    const nomcanton = await page.$$eval('.wikitable > tbody> tr > td:nth-child(3) > a:nth-child(1)', e=>e.map((a)=>a.innerText))
    const population = await page.$$eval('.wikitable > tbody:nth-child(3) > tr > td:nth-child(6) > bdi', e=>e.map((a)=>a.innerText))
    const nomproduit = await page2.$$eval('div.col-sm-4 > div > div > p', e=>e.map((a)=>a.innerText.split(',')[0])) // ça ne marche pas pour tous mais le nom dans le h4 n'était pas complet
    const nomproduit2 = await page2.$$eval('div.col-sm-4 > div > div > h4 > a', e=>e.map((a)=>a.innerText));
    const prix = await page2.$$eval('div.col-sm-4 > div > div > h4:nth-child(1)', e=>e.map((a)=>a.innerText))
    //div.col-sm-4:nth-child(3) > div:nth-child(1) > div:nth-child(2) > h4:nth-child(1)
   // div.col-sm-4:nth-child(2) > div:nth-child(1) > div:nth-child(2) > h4:nth-child(1)
    const rating = await page2.$$eval('div.col-sm-4 > div > div > p:nth-child(2)',e=>e.map((a)=>a.innerText.length+1));

    let compilation = nomproduit2.map((d,i)=>{
        if(d.includes('...')){
            console.log("bonjour");
            return {produit: nomproduit[i], prix: prix[i], etoiles: rating[i]}
        }
        else{
            console.log("bonsoir");
            return {produit: d, prix: prix[i], etoiles: rating[i]}
        }
            
        
           
        
       
    })
    //  await page2.click('div.col-sm-4 > div > div > h4 > a')
    // const nomproduit = await page2.waitForSelector('.caption > h4:nth-child(2)', e=>e.map((a)=>a.innerHTML))
       
    // const [response] = await Promise.all([
    //     page.waitForNavigation(),
    //     page2.click('div.col-sm-4:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h4:nth-child(2) > a:nth-child(1)'),
    //   ]);
    
    // const nomproduit = response.$$eval('.caption > h4', e => e.map((a)=>a.innerText))
    //page.on("console", (msg)=> console.log(msg.text()))
    const cantonpluspop = nomcanton.map((d, i)=>{
        return {canton: d, population: population[i]}
    })
    await page.screenshot({path: 'cantons.png', fullPage:true});
   // console.log(cantonpluspop);
    // console.log(nomproduit);
     //console.log(prix);
    console.log(compilation);
   // console.log(nomproduit2);
   // await page.setContent(h2)
  await page.setContent(nomcanton)
   //await page.pdf({ path: 'cantons2.pdf', format: 'a4'});
    await browser.close();
})();

