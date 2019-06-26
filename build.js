const fs = require('fs');
const path = require('path');

const materializePath = path.join(__dirname, 'node_modules', 'materialize-css', 'dist');
const sourcePath = path.join(__dirname, 'src', 'gui');
const buildPath = path.join(__dirname, 'build', 'gui');

console.log(materializePath);

function delFolderSync(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index){
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                delFolderSync(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
    fs.rmdirSync(path);
    }
};

function cleanUp() {
    console.log("Cleaning up...");
    delFolderSync(buildPath);
    console.log("Creating directory structure...");
    fs.mkdirSync(path.join(buildPath, 'css'), { recursive: true });
    fs.mkdirSync(path.join(buildPath, 'js'), { recursive: true });
}

function copyMaterialize() {
    console.log("copying materialize-css...");
    fs.copyFileSync(path.join(materializePath, 'css', 'materialize.min.css'), path.join(buildPath, 'css', 'materialize.min.css'));
    fs.copyFileSync(path.join(materializePath, 'js', 'materialize.min.js'), path.join(buildPath, 'js', 'materialize.min.js'));
}

function copyGui() {
    console.log("copying gui...");
    fs.copyFileSync(path.join(sourcePath, 'css', 'main.css'), path.join(buildPath, 'css', 'main.css'));
    fs.copyFileSync(path.join(sourcePath, 'js', 'main.js'), path.join(buildPath, 'js', 'main.js'));
    fs.copyFileSync(path.join(sourcePath, 'index.html'), path.join(buildPath, 'index.html'));
}

function copyFirmware() {
    console.log("copying firmware...");
}

cleanUp();
copyMaterialize();
copyGui();
copyFirmware();