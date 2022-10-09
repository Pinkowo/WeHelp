import requests,time
from bs4 import BeautifulSoup

start = 9500
number = 10
end = start - number
good=[]
normal=[]
bad=[]

for i in range(start,end,-1):
    link = "https://www.ptt.cc/bbs/movie/index"+str(i)+".html"

    response = requests.get(link)
    soup = BeautifulSoup(response.text, "html.parser")
    
    titles = soup.find_all("div", class_="title")
    
    for title in titles:
        content = title.select_one("a").getText()
        if content[0:4] == "[好雷]":
            good.append(content)
        if content[0:4] == "[普雷]":
            normal.append(content)
        if content[0:4] == "[負雷]":
            bad.append(content)
path = 'movie.txt'
with open(path,'w',encoding="utf-8") as f:
    for i in good:
        f.write(str(i)+"\n")
    for i in normal:
        f.write(str(i)+"\n")
    for i in bad:
        f.write(str(i)+"\n")
    
