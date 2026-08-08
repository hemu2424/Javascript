const arg = process.argv.slice(2);
const command = arg[0];
const target = arg[1];
const fs = require('fs/promises');
function showHelp(){
      console.log(`
Node File Tool

Usage:
  node app.js <command> [options]

Commands:
  list       List files
  info       Show file information
  read       Read a file
  search     Search text in a file
  count      Count lines, words and characters
  hash       Generate SHA256 hash
  compress   Compress a file

Options:
  --help     Show help
  --version  Show version
`);

}
async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");

    console.log(`\n--- ${filePath} ---\n`);
    console.log(content);
  } catch (error) {
    console.error(`Unable to read file: ${filePath}`);
    console.error(error.message);

    process.exitCode = 1;
  }
}
async function listFiles(directory) {
  try {
    const files = await fs.readdir(directory);

    console.log(`\nFiles in ${directory}:\n`);

    for (const file of files) {
      console.log(file);
    }
  } catch (error) {
    
    console.error(error.message);

    process.exitCode = 1;
  }
}

function showVersion() {
    console.log("Node File Tool v1.0.0");
}

if(command === 'help'){
    showHelp();
}
else if(command === 'version'){
    showVersion();
}

else if(command === 'list'){
    listFiles(target);
}
else if(command === 'read'){
    readFile(target);
}
else if(command === 'add'){
    
}
else if(command === 'update'){
    
}
else if(command === 'delete'){
    
}
else{
    console.log("Invalid command. Use 'node app.js help' for usage information.");
}