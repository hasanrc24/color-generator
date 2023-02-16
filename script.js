let div = null;

window.onload = () =>{
    main();
}

function main(){
    const btn = document.getElementById("generate-btn");
    const container = document.querySelector(".container");
    const output = document.getElementById("output");
    const copyBtn = document.getElementById("copy-btn");
    
    btn.addEventListener('click', function(){
        const rgbColor = colorGenerator();
        container.style.backgroundColor = rgbColor;
        output.value = rgbColor;
    })

    copyBtn.addEventListener('click', function(){
        navigator.clipboard.writeText(output.value);
        if(div !== null){
            div.remove();
            div = null;
        }
        generateToast(`${output.value} copied!`);
    })

    output.addEventListener('keyup', function(e){
        const colorValue = e.target.value;
        if(colorValue.length > 7){
            copyBtn.disabled = true;
        }
        if(colorValue && isValidHex(colorValue)){
            copyBtn.disabled = false;
            container.style.backgroundColor = colorValue;
        }
    })
}

function colorGenerator(){
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
}

function generateToast(msg){
    div = document.createElement('div');
    div.innerText = msg
    div.className = "toast toast-in";

    div.addEventListener('click', function(){
        div.classList.remove('toast-in')
        div.classList.add('toast-out')

        div.addEventListener('animationend', function(){
            div.remove();
            div = null;
        })
    })

    document.body.appendChild(div);
}


function isValidHex(color){
    if(color.length !== 7) return false;
    if(color[0] !== '#') return false;

    color = color.substring(1);
    return /^[0-9A-Fa-f]{6}$/i.test(color);
}