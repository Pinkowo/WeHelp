## 要求三：SQL CRUD
- ⽤ INSERT 指令新增⼀筆資料到 member 資料表中，這筆資料的 username 和password 欄位必須是 test。<br>接著繼續新增⾄少 4 筆隨意的資料。<br>
**INSERT INTO member (name,username,password,follower_count) VALUES ("測試","test","test",87);**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/3-1.png" width="50%">

- 使⽤ SELECT 指令取得所有在 member 資料表中的會員資料。<br>
**SELECT * FROM member;**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/3-2.png" width="50%">

- 使⽤ SELECT 指令取得所有在 member 資料表中的會員資料，並按照 time 欄位，由近到遠排序。<br>
**SELECT * FROM member ORDER BY time DESC;**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/3-3.png" width="50%">

- 使⽤ SELECT 指令取得 member 資料表中第 2 ~ 4 共三筆資料，並按照 time 欄位，由近到遠排序。<br>
**SELECT * FROM member ORDER BY time DESC LIMIT 3 OFFSET 1;**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/3-4.png" width="50%">

- 使⽤ SELECT 指令取得欄位 username 是 test 的會員資料。<br>
**SELECT * FROM member WHERE username="test";**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/3-5.png" width="50%">

- 使⽤ SELECT 指令取得欄位 username 是 test、且欄位 password 也是 test 的資料。<br>
**SELECT * FROM member WHERE username="test" and password="test";**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/3-6.png" width="50%">

- 使⽤ UPDATE 指令更新欄位 username 是 test 的會員資料，將資料中的 name 欄位改成 test2。<br>
**UPDATE member SET name="test2" WHERE username="test";**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/3-7.png" width="50%">

## 要求四：SQL Aggregate Functions
- 取得 member 資料表中，總共有幾筆資料 ( 幾位會員 )。<br>
**SELECT COUNT(*) AS 幾位會員 FROM member;**

- 取得 member 資料表中，所有會員 follower_count 欄位的總和。<br>
**SELECT SUM(follower_count) AS 總和 FROM member;**

- 取得 member 資料表中，所有會員 follower_count 欄位的平均數。<br>
**SELECT AVG(follower_count) AS 平均數 FROM member;**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/4.png" width="50%">

## 要求五：SQL JOIN (Optional)
- 在資料庫中，建立新資料表紀錄留⾔資訊，取名字為 message。<br>
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/5-1.png" width="50%">

- 使⽤ SELECT 搭配 JOIN 語法，取得所有留⾔，結果須包含留⾔者會員的姓名。<br>
**SELECT msg.content,meb.name FROM member AS meb LEFT OUTER JOIN message AS msg <br>
ON meb.id = msg.member_id;**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/5-2.png" width="50%">

- 使⽤ SELECT 搭配 JOIN 語法，取得 member 資料表中欄位 username 是 test 的所有留⾔，資料中須包含留⾔者會員的姓名。<br>
**SELECT msg.content,meb.name FROM member AS meb INNER JOIN message AS msg <br>
ON meb.id = msg.member_id AND meb.username="test";**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/5-3.png" width="50%">

- 使⽤ SELECT、SQL Aggregate Functions 搭配 JOIN 語法，取得 member 資料表中欄位 username 是 test 的所有留⾔平均按讚數。<br>
**SELECT AVG(msg.like_count),meb.username FROM member AS meb INNER JOIN message AS msg <br>
ON meb.id = msg.member_id AND meb.username="test";**
<img src="https://github.com/Pinkowo/WeHelp/blob/main/wk5/pics/5-4.png" width="50%">
