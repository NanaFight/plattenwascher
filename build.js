const fs = require('fs');
const path = require('path');
const cp = require('child_process');


const materializePath = path.join(__dirname, 'node_modules', 'materialize-css', 'dist');

const sourcePath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'build');
const vendorPath = path.join(__dirname, 'vendor');

const sourceGuiPath = path.join(sourcePath, 'gui');
const buildGuiPath = path.join(buildPath, 'gui');

const sourceFirmwarePath = path.join(sourcePath, 'firmware');


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
    delFolderSync(vendorPath);

    console.log("Creating directory structure...");
    fs.mkdirSync(path.join(buildGuiPath, 'css'), { recursive: true });
    fs.mkdirSync(path.join(buildGuiPath, 'js'), { recursive: true });

    fs.mkdirSync(buildPath, { recursive: true });

    fs.mkdirSync(vendorPath);
}

function cloneMicroWebSrv() {
    console.log("cloning MicroWebSrv...");
    const stdout = cp.execSync('git clone https://github.com/jczic/MicroWebSrv.git', {
        cwd: vendorPath,
        encoding: 'utf8'
    });
    console.log(stdout);
}

function copyMaterialize() {
    console.log("copying materialize-css...");
    fs.copyFileSync(path.join(materializePath, 'css', 'materialize.min.css'), path.join(buildGuiPath, 'css', 'materialize.min.css'));
    fs.copyFileSync(path.join(materializePath, 'js', 'materialize.min.js'), path.join(buildGuiPath, 'js', 'materialize.min.js'));
}

function copyGui() {
    console.log("copying gui...");
    fs.copyFileSync(path.join(sourceGuiPath, 'css', 'main.css'), path.join(buildGuiPath, 'css', 'main.css'));
    fs.copyFileSync(path.join(sourceGuiPath, 'js', 'main.js'), path.join(buildGuiPath, 'js', 'main.js'));
    fs.copyFileSync(path.join(sourceGuiPath, 'index.html'), path.join(buildGuiPath, 'index.html'));
}

function copyFirmware() {
    console.log("copying firmware...");
    fs.copyFileSync(path.join(vendorPath, 'MicroWebSrv', 'microWebSrv.py'), path.join(buildPath, 'microWebSrv.py'));
    fs.copyFileSync(path.join(sourceFirmwarePath, 'main.py'), path.join(buildPath, 'main.py'));
    fs.copyFileSync(path.join(sourceFirmwarePath, 'server.py'), path.join(buildPath, 'server.py'));
    fs.copyFileSync(path.join(sourceFirmwarePath, 'wlan.json'), path.join(buildPath, 'wlan.json'));
}


cleanUp();
cloneMicroWebSrv();
copyMaterialize();
copyGui();
copyFirmware();
