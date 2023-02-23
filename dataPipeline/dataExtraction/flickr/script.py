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
top_cities = ["New York"]

df_top = df[df['CITY'].isin(top_cities)]
df_top = df_top.reset_index()  

# df.to_csv('longLat.csv')
for index, row in df_top.iterrows():
    
    city = row["CITY"]
    state = row["STATE_CODE"]
    county = row["COUNTY"]
    long = row.LONGITUDE
    lat = row.LATITUDE
    photos = flickr.photos.search(lat=lat, lon=long, accuracy=11,min_date_taken='2010-01-01', max_date_taken='2023-12-31', extras = 'geo, tag, date_taken')
    df_photos = pd.DataFrame(photos['photos']['photo'])
    print(df_photos)
    
    filename = city+'-'+state+'photos.json'
    
    with open(filename, "w") as text_file:
        json.dump(photos, text_file)