let signUpForm = document.getElementById("signup");
signUpForm.addEventListener("submit", function (event) {
    //暫停傳送表單
	event.preventDefault();
    //確認有效
    let nameValid = hasValue(signUpForm, 'name', '姓名');
	let usernameValid = hasValue(signUpForm, 'username', '帳號');
    let passwordValid = hasValue(signUpForm, 'password', '密碼');
    //都有效時傳送表單
	if (nameValid && usernameValid && passwordValid) {
		signUpForm.submit()
	}
});


let signInForm = document.getElementById("signin");
signInForm.addEventListener("submit", function (event) {
    //暫停傳送表單
	event.preventDefault();
    //確認有效
	let accountValid = hasValue(signInForm, 'account', '帳號');
    let passwordValid = hasValue(signInForm, 'password2', '密碼');
    //都有效時傳送表單
	if (accountValid && passwordValid) {
		signInForm.submit()
	}
});


function hasValue(form, inputId, text) {
	if (form.elements[inputId].value.trim() === "") {
		return addTip(inputId, text);
	}
	return true;
}

function addTip(inputId,text){
    let inputBox = document.getElementById(inputId);
    if(inputBox.value == ''){
        inputBox.className = "error";
        let errorDiv = document.getElementById("error-"+inputId);
        errorDiv.textContent = "請輸入"+text;
    }
}

function removeTip(inputId){
    let inputBox = document.getElementById(inputId);
    if(inputBox.value != ''){
        inputBox.classList.remove("error");
        let errorDiv = document.getElementById("error-"+inputId);
        errorDiv.textContent = "";
    }
}