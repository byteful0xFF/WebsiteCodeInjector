javascript:(function(){

const box = document.createElement("div");

box.innerHTML = `
<div id="injector">
    <div id="title">
        html/js/css injector
        <button id="min">_</button>
    </div>

    <select id="type">
        <option value="html">html</option>
        <option value="css">css</option>
        <option value="js">javascript</option>
    </select>

    <textarea id="code">
<!-- example html -->
<h1 style="color:red">hello world</h1>
    </textarea>

    <button id="inject">inject</button>
    <button id="example">load example</button>
</div>
`;

document.body.appendChild(box);

const style = document.createElement("style");
style.textContent = `
#injector {
    position: fixed;
    top: 50px;
    left: 50px;
    width: 350px;
    background:#111;
    color:white;
    padding:10px;
    border-radius:10px;
    z-index:999999999;
    font-family:Arial;
    box-shadow:0 0 20px #000;
}

#title {
    background:#222;
    padding:8px;
    cursor:move;
    user-select:none;
    border-radius:8px;
}

#min {
    float:right;
}

textarea {
    width:100%;
    height:160px;
    background:#222;
    color:white;
    margin-top:10px;
}

button, select {
    background:#333;
    color:white;
    border:0;
    padding:7px;
    margin-top:8px;
    border-radius:5px;
}

button:hover {
    background:#555;
}
`;

document.head.appendChild(style);


const panel = document.getElementById("injector");
const title = document.getElementById("title");


// draggable
let dragging = false;
let offsetX = 0;
let offsetY = 0;

title.onmousedown = e => {
    dragging = true;
    offsetX = e.clientX - panel.offsetLeft;
    offsetY = e.clientY - panel.offsetTop;
};

document.onmousemove = e => {
    if(!dragging) return;

    panel.style.left = (e.clientX - offsetX) + "px";
    panel.style.top = (e.clientY - offsetY) + "px";
};

document.onmouseup = () => {
    dragging = false;
};


// minimize
let minimized = false;

document.getElementById("min").onclick = () => {
    minimized = !minimized;

    [...panel.children].forEach((x,i)=>{
        if(i !== 0)
            x.style.display = minimized ? "none" : "";
    });
};


// injector
document.getElementById("inject").onclick = () => {

    let type = document.getElementById("type").value;
    let code = document.getElementById("code").value;

    if(type === "html"){
        let div = document.createElement("div");
        div.innerHTML = code;
        document.body.appendChild(div);
    }

    if(type === "css"){
        let style = document.createElement("style");
        style.textContent = code;
        document.head.appendChild(style);
    }

    if(type === "js"){
        try{
            eval(code);
        }
        catch(e){
            console.error(e);
        }
    }
};


// examples
document.getElementById("example").onclick = () => {

let examples = {

html:
`<div id="test">
<h1>Hello injected HTML</h1>
<p>This was added by the injector</p>
</div>`,

css:
`body {
    filter: hue-rotate(90deg);
}

h1 {
    font-size:60px;
}`,

js:
`alert("Injected javascript!");

document.title = "Modified page";

console.log("hello from injector");`

};

document.getElementById("code").value =
examples[document.getElementById("type").value];

};


})();
