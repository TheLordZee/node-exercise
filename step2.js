const fs = require('fs')
const axios = require('axios')

let path = process.argv[2]

function isValidUrl(str){
    let url;
    try{
        url = new URL(str);
    } catch(_){
        return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
}

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log(`Error reading ${path}`)
            console.log(`Error: ${err[0]}`);
            process.exit(1)
        }
        console.log(data)
    })
}

function webCat(url){
    axios.get(url)
        .then(res => {console.log(res.data)})
        .catch(err => {
            console.log(`Error fectching ${url}`); 
            console.log(`Error: Request failed with status code ${err.response.status}`)
            process.exit(1)})
}

if(isValidUrl(path)){
    webCat(path)
}else{
    cat(path)
}

module.exports = {
    cat,
    webCat
};