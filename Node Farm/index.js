//Blocking ,synchronous way
 
const fs = require('fs');
const http=require('http');
const path = require('path');
const url =require('url');

const replaceTemplate = require('./modules/replaceTemplate');

// Files
// const { text } = require('stream/consumers');
//  const textIn= fs.readFileSync('./txt/input.txt', 'utf-8');
//  console.log(textIn);
 
//  const textOut=`This is what we know about the avocado : ${textIn}.\nCreated on ${Date.now()}`;
//  fs.writeFileSync('./txt/output.txt',textOut);
//  console.log('file written!');
 
 //Non-Blocking,asynchronpus way
//  fs.readFile('./txt/start.txt','utf-8' ,(err,data1) =>{
//     fs.readFile('./txt/${data1}.txt','utf-8',(err,data2) =>{
//         console.log(data2);
//         fs.readFile('./txt/append.txt','utf-8',(err,data3) =>{
//             console.log(data3);
 
//             fs.writeFile('./txt/final.txt', `${data2}\nCreated on${data3}`,'utf-8', err=>{
//                 console.log('your file has been written');
//             })
//         })
//     })
   
//  });
//  console.log('will read file');
//  //Server

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
 
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8')
    const dataObj =   JSON.parse(data);
 
 
 
 const server = http.createServer((req,res)=>{
   const {query,pathname} =url.parse(req.url,true);
 const pathName =req.url;
//OVERVIEW
if (pathname === '/' || pathname === '/overview'){
res.writeHead(200,{
    'Content-type':'text/html'
});
 
const cardsHtml =dataObj.map(el => replaceTemplate(tempCard,el)).join('');
// console.log(cardsHtml);
const output =tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
res.end(output);
}
 
//PRODUCT
else if(pathname==='/product'){
    res.writeHead(200,{
        'Content-type':'text/html'
    });
   const product = dataObj[query.id];
   const output = replaceTemplate(tempProduct,product);
res.end(output);
}
// else if (pathname.startsWith('/product')) {
//     const queryObject = url.parse(req.url, true).query;
//     const productId = queryObject.id;
 
//     if (productId !== undefined && productId >= 0 && productId < dataObj.length) {
//         res.writeHead(200, {
//             'Content-type': 'text/html'
//         });
 
//         const product = dataObj[productId];
//         const output = replaceTemplate(tempProduct, product);
//         res.end(output);
//     }
// }
 
//API
else if(pathname === '/api'){
    res.writeHead(200,{
        'Content-type':'application/json'
    })
     res.end(data)}
//PAGE NOT FOUND
else{
    res.writeHead(404,{
        'Content-type': 'text/html',
        'my-own-header':'hello-world'
    });
    res.end('<h1>page not found</h1>');
}
})
server.listen(8000,'127.0.0.1',() =>{
    console.log("listening to the request on port  8000")
})
