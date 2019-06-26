window.addEventListener('load', function(event) {

    let elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems, {});

    const buttonConnection  = document.getElementById('button-connection');
    const buttonPower       = document.getElementById('button-power');
    const buttonRun         = document.getElementById('button-run');
    const buttonStop        = document.getElementById('button-stop');
    const buttonDecelerate  = document.getElementById('button-decelerate');
    const buttonAccelerate  = document.getElementById('button-accelerate');

    
    buttonConnection.addEventListener("click", (event) => {
        console.log('button-connection clicked');
    });

    buttonPower.addEventListener("click", (event) => {
        console.log('button-power clicked');
    });

    buttonRun.addEventListener("click", (event) => {
        console.log('button-run clicked');
    });

    buttonStop.addEventListener("click", (event) => {
        console.log('button-stop clicked');
    });

    buttonAccelerate.addEventListener("click", (event) => {
        console.log('button-accelerate clicked');
    });

    buttonDecelerate.addEventListener("click", (event) => {
        console.log('button-decelerate clicked');
    });

}); 
