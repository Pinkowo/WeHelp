from flask import Flask
from flask import request as req
from flask import redirect
from flask import render_template
from flask import session
from flask import url_for
import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="123",
  database="mydatabase"
)
mycursor = mydb.cursor()

app = Flask(
    __name__,
    static_folder="static",
    static_url_path="/static"    
)
app.secret_key="omega"
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/signup",methods=["POST"])
def signUp():
    name = req.form["name"]
    username = req.form["username"]
    password = req.form["password"]
    mycursor.execute("SELECT * FROM member WHERE username = '"+ username + "'")
    myresult = mycursor.fetchone()
    if not myresult == None:
        return redirect("/error?message=帳號已經被註冊")       
    sql = "INSERT INTO member (name, username, password) VALUES (%s, %s, %s)"
    val = (name, username, password)
    mycursor.execute(sql, val)
    mydb.commit()
    return render_template("index.html")  

@app.route("/signin",methods=["POST"])
def signIn():
    account = req.form["account"]
    password = req.form["password2"]   
    if account=="" or password=="":
        return redirect("/error?message=請輸入帳號、密碼")   
    mycursor.execute("SELECT * FROM member WHERE username = '"+ account +"' AND \
        password = '"+ password +"'")
    myresult = mycursor.fetchone()
    if not myresult == None:
        session["login"] = myresult
        return redirect("/member")   
    return redirect("/error?message=帳號或密碼輸入錯誤")

@app.route("/member")
def memberPage():
    if session["login"]=="signOut":
        return render_template("index.html")
    else:
        mycursor = mydb.cursor()
        sql = "SELECT member.name, message.content \
            FROM member INNER JOIN message ON member.id = message.member_id"
        mycursor.execute(sql)
        myresult = mycursor.fetchall()
        return render_template("member.html",\
            name=session["login"][0],message=myresult)

@app.route("/error")
def errorPage():
    msg = req.args.get("message",None)
    return render_template("error.html",error=msg)

@app.route("/signout")
def signOut():
    session["login"]="signOut"
    return render_template("index.html")

@app.route("/message", methods=['POST'])
def message():
    content = req.form["content"]
    sql = "INSERT INTO message (member_id, content) \
        VALUES((SELECT id FROM member WHERE username=%s),%s)"
    val = (session['login'][1],content)
    mycursor.execute(sql,val)
    mydb.commit()
    return redirect("/member")

app.run(port=3000)
