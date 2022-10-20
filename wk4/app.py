from flask import Flask
from flask import request as req
from flask import redirect
from flask import render_template
from flask import session
from flask import url_for
app = Flask(
    __name__,
    static_folder="static",
    static_url_path="/static"    
)
app.secret_key="omega"
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/signin",methods=["POST"])
def signIn():
    account = req.form["account"]
    password = req.form["password"]
    if account=="test" and password=="test":
        session["login"]="signIn"
        return redirect("/member")
    elif account=="" or password=="":
        return redirect("/error?message=請輸入帳號、密碼")
    else:
        return redirect("/error?message=帳號、或密碼輸入錯誤")

@app.route("/member")
def memberPage():
    if session["login"]=="signIn":
        return render_template("member.html")
    else:
        return render_template("index.html")

@app.route("/error")
def errorPage():
    msg = req.args.get("message",None)
    return render_template("error.html",error=msg)

@app.route("/signout")
def signOut():
    session["login"]="signOut"
    return render_template("index.html")

# @app.route("/square",methods=["POST"])
# def redirectCount():
#     number = req.form["number"]
#     return redirect("/square/"+number)

@app.route("/square/<int:number>",methods=["POST"])
def printSquare(number):
    answer = number**2
    return render_template("result.html",ans=str(answer))


app.run(port=3000)
