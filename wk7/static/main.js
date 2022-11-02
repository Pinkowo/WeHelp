//將表單預設的自動導向取消
document.querySelector('#form-search').addEventListener('submit', (e)=>{
    e.preventDefault();
});
document.querySelector('#form-renew').addEventListener('submit', (e)=>{
    e.preventDefault();
});

//查詢會員資料
let searchBtn = document.getElementById("btn-search");
searchBtn.addEventListener('click',searchUsername);

function searchUsername(){
    let searchInput = document.getElementById("search");
    let usernameDiv = document.getElementById("div-username");
    fetch("http://127.0.0.1:3000/api/member?username="+searchInput.value)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            let name = data.data.name;
            let username = data.data.username;
            usernameDiv.textContent = name+"("+username+")";
        })
        .catch(function(error) {
            console.log(error);
        });
}

//修改姓名
let renewBtn = document.getElementById("btn-renew");
renewBtn.addEventListener('click',renewUsername);

function renewUsername(){
    let renewInput = document.getElementById("renew");
    let renewDiv = document.getElementById("div-renew");
    fetch("http://127.0.0.1:3000/api/member",{
        method: 'PATCH',
        body: JSON.stringify({
            name: renewInput.value
        }),
        headers: new Headers({
            "Content-type":"application/json;"
        })
    })
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(data){
            if(data.ok){
                let nameDiv = document.getElementById("div-name");
                nameDiv.textContent = renewInput.value+"，歡迎登入系統";
                renewDiv.textContent = "更新成功";
            }
            else if(data.error){
                renewDiv.textContent = "更新失敗";
            }
            else{
                console.log(data);
                renewDiv.textContent = "資料沒有回傳";
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}
