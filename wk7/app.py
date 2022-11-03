from flask import Flask
from flask import redirect, render_template, jsonify, make_response
from flask import session, request as req
from flask_restful import Api, Resource, request
import db

app = Flask(
    __name__,
    static_folder="static",
    static_url_path="/static"    
)
api = Api(app)
app.config['JSON_AS_ASCII'] = False
app.secret_key="omega"
@app.route("/")
def index():
    session["login"]="signOut"
    return render_template("index.html")

@app.route("/signup",methods=["POST"])
def signUp():
    session["login"]="signOut"
    name = req.form["name"]
    username = req.form["username"]
    password = req.form["password"]
    myresult = db.signUp_select_from(username)
    if not myresult == None:
        return redirect("/error?message=帳號已經被註冊")       
    db.signUp_insert_into(name, username, password)
    return render_template("index.html")  

@app.route("/signin",methods=["POST"])
def signIn():
    account = req.form["account"]
    password = req.form["password2"]   
    if account=="" or password=="":
        return redirect("/error?message=請輸入帳號、密碼")
    myresult = db.signIn_select_from(account,password)
    if not myresult == None:
        session["login"] = myresult
        return redirect("/member")   
    return redirect("/error?message=帳號或密碼輸入錯誤")

@app.route("/member")
def memberPage():
    if session["login"]=="signOut":
        return render_template("index.html")
    else:
        return render_template("member.html",\
            name=session["login"][0])

@app.route("/error")
def errorPage():
    msg = req.args.get("message",None)
    return render_template("error.html",error=msg)

@app.route("/signout")
def signOut():
    session["login"]="signOut"
    return render_template("index.html")

class API(Resource):
    def get(self):
        username = request.args.get('username')
        myresult = db.signUp_select_from(username)
        if myresult == None:
            data = {"data": None}
        else:
            data = { "data": { "id": myresult[3], "name":''+\
                myresult[0] +'', "username":''+ myresult[1] +'' }}
        if session["login"]=="signOut":
            data = {"data": None}
        res = make_response(jsonify(data),200)
        return res 
    
    def patch(self):
        res = make_response(jsonify({"error":True}),404)
        if session["login"]!="signOut":
            request_name = request.get_json()
            # 更新資料庫和session
            id = session["login"][3]
            db.renew_update_set(request_name['name'],id)
            myresult = db.renew_select_from(id)
            session["login"] = myresult     
            res = make_response(jsonify({"ok":True}),200)
        return res
        
    
api.add_resource(API, '/api/member')

if __name__ == "__main__":
    app.run(port=3000, debug=True)
    

# 第三題 Patch
# 用 Postman 跑有成功的寫法，但是配合 Fetch 就失敗
# 還是放在這裡記錄下來
#
# response = jsonify({"error":True})
# new_name = req.form["renew"]
# print(new_name)
# updateName = {
#     "name": "新的使⽤者姓名"
# }
# print(updateName)
# updateName["name"] = new_name
# print(updateName)
# if session["login"]!="signOut":
#     response = jsonify({"ok":True})
# response.headers["Content-Type"] = "application/json"
# return response
