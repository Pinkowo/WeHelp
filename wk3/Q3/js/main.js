let title = [];
let url = [];
let tot = 10;

fetch('https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data){
    for(let i=0;i<tot;i++){
        title.push(data.result.results[i].stitle);
        url.push("https"+data.result.results[i].file.split("https")[1]);
    }
    addSection();
  });

function addSection(){
    let newSec = document.createElement("section");
    let newBox = document.createElement("div");
    newBox.className = "grid-box";
    newSec.appendChild(newBox);
    newBox.appendChild(addBox(0,"box-top"));
    newBox.appendChild(addBox(1,"box-top"));
    for(let i=2;i<tot;i++){
        newBox.appendChild(addBox(i,"box-bottom")); 
    }
    const currentDiv = document.getElementById("nav");
    currentDiv.after(newSec);
}
function addBox(num,pos) {
    let newDiv = document.createElement("div");
    newDiv.className = pos;
    let newImg = document.createElement("img");
    newImg.src = url[num];
    let newDiv2 = document.createElement("div");
    let newText = document.createTextNode(title[num]);
    newDiv2.appendChild(newText);
    newDiv.appendChild(newImg);
    newDiv.appendChild(newDiv2);
    return newDiv;
}
