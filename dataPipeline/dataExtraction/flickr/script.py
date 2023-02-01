import auth
import requests
import base64
import json
import pandas as pd
flickr = auth.connect()
# sets   = flickr.photosets.getList(user_id='73509078@N00')
# title  = sets['photosets']['photoset'][0]['title']['_content']
# photos = flickr.photos.search(lat=37.773972, lon=-122.431297, accuracy=11)
# print(photos)
# tags =


df = pd.read_csv('../us_cities.csv')


top_cities = ["New York", "Los Angeles", "Las Vegas", "Orlando", "Miami", "San Francisco"]
df_top = df[df['CITY'].isin(top_cities)]
df_top = df_top.reset_index()  

pat = ""
authorization = str(base64.b64encode(bytes(':'+pat, 'ascii')), 'ascii')

url="https://api.geoapify.com/v2/places?categories=tourism,entertainment,catering.restaurant,beach&filter=circle:-73.996705,40.74838,1000&bias=proximity:-73.996705,40.74838&limit=500&apiKey=c8a825d7da834647b40102fcad6d5b3f"

headers = {
 'Accept': 'application/json',
 'Authorization': 'Basic '+authorization
}

# df.to_csv('longLat.csv')
for index, row in df_top.iterrows():
    
    city = row["CITY"]
    state = row["STATE_CODE"]
    county = row["COUNTY"]
    long = row.LONGITUDE
    lat = row.LATITUDE
    photos = flickr.photos.search(lat=lat, lon=long, accuracy=11)
    
    filename = city+'-'+state+'photos.json'
    
    print(photos)
    with open(filename, "w") as text_file:
        json.dump(photos, text_file)