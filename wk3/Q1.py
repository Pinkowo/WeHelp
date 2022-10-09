import requests,csv

response = requests.get("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment.json")
data = response.json()
data_result = data["result"]["results"]

file = open('data.csv',mode='w', newline='')
writer = csv.writer(file)
reader = csv.reader(file)

list1=[]
for x in data_result:    
    year = int(x["xpostDate"][:4])
    district = x["address"][5:8]
    pic = "https:"+x["file"].split("https:")[1]
    if year >= 2015:
        writer.writerow([x["stitle"],district,x["longitude"],x["latitude"],pic])

file.close()