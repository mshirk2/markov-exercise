/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");


// Make Markov Machine from given text
function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText());
}


// read file and generate text
function makeText(path){
    fs.readFile(path, "utf-8", function(err, data){
        if(err){
            console.error(`${err}: Cannot read ${path}`)
            process.exit(1);
        } else generateText(data);
    });
}


// read URL and generate text
async function makeURLText(url){
    let res;

    try{
        res = await axios.get(url);
    } catch (err) {
        console.error(`${err}: Cannot read ${path}`);
        process.exit(1);
    }
    generateText(res.data)
}


// accept cmdline commands
let [method, path] = process.argv.slice(2);

if (method ==="file") {
    makeText(path);
} else if (method === "url"){
    makeURLText(path);
} else {
    console.error(`What's this? -> ${method}`)
    process.exit(1)
}