const fs = require('fs')
const axios = require('axios')

let path = process.argv[2]


if(path === '--out'){
    if(process.argv.length != 5){
        console.log('Error: missing arguments');
        process.exit(1)
    }
    let fileIn = process.argv[4]
    let fileOut = process.argv[3]
    if(isValidUrl(fileIn)){
         webCat(fileIn, fileOut)
    }else{
        cat(fileIn, fileOut)
    }
}else if(isValidUrl(path)){
    webCat(path)
}else{
    cat(path)
}

function writeFile(text, file){
    try{
        fs.writeFileSync(file, text, 'utf8')
    }catch(err){    
        console.log(`Error writing ${text}: ${err}`);
        process.exit(1)        
    }
}

function isValidUrl(str){
    let url;
    try{
        url = new URL(str);
    } catch(_){
        return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
}

function webCat(path, file){  
    axios.get(path)
    .then(res => {
        if(file){
            writeFile(res.data, file)
        }else{
            console.log(res.data)
        }
    })
    .catch(err => {
        console.log(`Error fectching ${path}`); 
        console.log(`Error: Request failed with status code ${err.response.status}`)
        process.exit(1)
    })
}

function cat(path, file){
    try{
        let contents = fs.readFileSync(path, 'utf8')
        if(file){
            writeFile(contents, file)
        }else{
            console.log(contents)
        }
    }catch(err){
        console.log(`Error reading ${path}`)
        console.log(`Error: ${err[0]}`);
        process.exit(1)
    }
}


module.exports = {
    cat
};