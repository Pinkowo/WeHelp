import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Bet@7878",
  database="mydatabase"
)
mycursor = mydb.cursor(buffered=True)
 
def signUp_select_from(username):
    sql = "SELECT * FROM member WHERE username = %s"
    val = (username,)
    mycursor.execute(sql,val)
    myresult = mycursor.fetchone()    
    return myresult
  
def signUp_insert_into(name, username, password):
    sql = "INSERT INTO member (name, username, password) VALUES (%s, %s, %s)"
    val = (name, username, password)
    mycursor.execute(sql, val)
    mydb.commit()
    
def signIn_select_from(account,password):
    sql = "SELECT * FROM member WHERE username = %s AND password = %s"
    val = (account,password)
    mycursor.execute(sql,val)
    myresult = mycursor.fetchone()
    return myresult

def renew_update_set(name,id):
    sql = "UPDATE member SET name = %s WHERE id = %s"
    val = (name,id)
    mycursor.execute(sql,val)
    mydb.commit()

def renew_select_from(id):
    sql = "SELECT * FROM member WHERE id = %s"
    val = (id,)
    mycursor.execute(sql,val)
    myresult = mycursor.fetchone()    
    return myresult
