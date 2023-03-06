console.log('hello world');

const http = require('http');

const server = http.createServer((req,res)=>{
    const products = [
    {
        name: "van",id:1
    }]
    products.push({name: "van 1",id: 2})
    if(req.url == "admin/products"){
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(products));
    }
    if(req.url == "/"){
        console.log(res.url)
        res.setHeader('Content-Type', 'text/html');
        res.end("<html><h1>Hello</h1></html>");
    }
    if(req.url == "/about"){
        res.setHeader('Content-Type', 'text/html');
        res.end("<html><h1>Haha</h1></html>");
    }
    
})

server.listen(8080,()=>{
    console.log('đang chạy cổng 8080');
});