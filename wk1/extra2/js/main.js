var menu = document.getElementById("menu");
var btn_menu = document.getElementById("btn-menu");


window.addEventListener('click', function (e) {
    if(e.target==btn_menu){
        menu.style.display = "block";
    }else if(e.target==menu){
        menu.style.display = "block";
    }else{
        menu.style.display = "none";
    }
}, true);

let clickMenu = (e) => {
    alert(e);
};
