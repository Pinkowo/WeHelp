let title = [];
let url = [];
let tot = 10;

//按鈕增加box
let newBtn = document.createElement("button");
newBtn.addEventListener('click',loadMore);
function loadMore(){
  fetch('https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json')
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      let newBox = document.getElementById("g-box");
      for(let i=tot;i<tot+8;i++){
        title.push(data.result.results[i].stitle);
        url.push("https"+data.result.results[i].file.split("https")[1]);
        newBox.appendChild(addBox(i,"box-bottom")); 
      }
      tot+=8;
      let dif = data.result.count-tot;
      if(dif>=8){
        return;
      }else if(dif<=0){
        document.getElementById("btn").style.display="none";
      }else{
        for(let i=tot;i<data.result.count;i++){
          title.push(data.result.results[i].stitle);
          url.push("https"+data.result.results[i].file.split("https")[1]);
          newBox.appendChild(addBox(i,"box-bottom")); 
        }
      }
    })
    .catch(function(error) {
      console.log(error);
    });
}

//基本版面
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
    addBtn();
  })
  .catch(function(error) {
    console.log(error);
  });

/*
<section id="section">
  <div class="grid-box" id="g-box">
    <div class="box-top"></div>*2
    <div class="box-bottom"></div>*tot*n
  <div>
</section>
<button class="btn-box" id="btn">Load More</button>
*/
function addSection(){
    let newSec = document.createElement("section");
    newSec.setAttribute('id','section');
    let newBox = document.createElement("div");
    newBox.className = "grid-box";
    newBox.setAttribute('id','g-box');
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
    let newDiv2 = document.createElement("div");
    let newImg = document.createElement("img");
    newImg.src = url[num];
    let newText = document.createTextNode(title[num]);
    newDiv2.appendChild(newText);
    newDiv.appendChild(newImg);
    newDiv.appendChild(newDiv2);
    return newDiv;
}
function addBtn(){
  let newDiv = document.createElement("div");
  newDiv.className = "btn-box";
  newDiv.setAttribute('id','btn');
  let newText = document.createTextNode("Load More");
  newBtn.appendChild(newText);
  newDiv.appendChild(newBtn);
  const currentSection = document.getElementById("section");
  currentSection.after(newDiv);
}
