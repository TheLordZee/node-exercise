const fs = require('fs')

let path = process.argv[2]

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.log(`Error reading ${path}`)
            console.log(`Error: ${err}`);
            process.exit(1)
        }
        console.log(data)
    })
}

cat(path)

module.exports = {
    cat
};