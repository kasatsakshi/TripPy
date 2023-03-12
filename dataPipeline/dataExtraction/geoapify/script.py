import requests
import base64
import pandas as pd
import pymongo
import json

df = pd.read_csv('../us_cities.csv')


cities= {
   "New York":{
      "latitude":40.730610,
      "longitude":-73.935242
   },
   "Los Angeles":{
      "latitude":34.052235,
      "longitude":-118.243683
   },
   "Las Vegas":{
      "latitude":36.188110,
      "longitude":-115.176468
   },
   "Orlando":{
      "latitude":28.538336,
      "longitude":-81.379234
   },
   "Miami":{
      "latitude":25.761681,
      "longitude":-80.191788
   },
   "San Francisco":{
      "latitude":37.773972,
      "longitude":-122.431297
   }
}


def form_url(long, lat):
   
    url = "https://api.geoapify.com/v2/places?categories=tourism,entertainment,catering.restaurant&filter=circle:{},{},1000&bias=proximity:{},{}&limit=500&apiKey=c8a825d7da834647b40102fcad6d5b3f".format(long,lat,long,lat)
    return url

# df['URL'] = df.apply (lambda row: form_url(row), axis=1)
# top_cities = ["New York", "Los Angeles", "Las Vegas", "Orlando", "Miami", "San Francisco"]
# df_top = df[df['CITY'].isin(top_cities)]
# df_top = df_top.reset_index()  

pat = ""
authorization = str(base64.b64encode(bytes(':'+pat, 'ascii')), 'ascii')

# url="https://api.geoapify.com/v2/places?categories=tourism,entertainment,catering.restaurant,beach&filter=circle:-73.996705,40.74838,1000&bias=proximity:-73.996705,40.74838&limit=500&apiKey=c8a825d7da834647b40102fcad6d5b3f"

headers = {
 'Accept': 'application/json',
 'Authorization': 'Basic '+authorization
}



# df.to_csv('longLat.csv')

for k,v in cities.items():
    data=[]
    pages = 8
    city = k
    long = v['longitude']
    lat = v['latitude']
    filename= city+'-attractions.json'

    url = form_url(long, lat)
    response = requests.get(url, headers=headers)

    with open(filename, "wb") as text_file:
        text_file.write(response.content)




client = pymongo.MongoClient("mongodb://localhost:27017/")

# Select the database
db = client["mydatabase"]

# Select the collection
collection = db["mycollection"]

# Open the JSON file and load the data
with open("data.json", "r") as f:
    data = json.load(f)

# Insert the data into the collection
collection.insert_one(data)

# Print a success message
print("Data added to the collection.")