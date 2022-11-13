import requests
import base64
import pandas as pd

df = pd.read_csv("us_cities.csv")

def form_url(row):
    
    long = row.LONGITUDE
    lat = row.LATITUDE
    
    url = "https://api.geoapify.com/v2/places?categories=tourism,entertainment,catering.restaurant&filter=circle:{},{},1000&bias=proximity:{},{}&limit=500&apiKey=c8a825d7da834647b40102fcad6d5b3f".format(long,lat,long,lat)
    return url

df['URL'] = df.apply (lambda row: form_url(row), axis=1)
top_cities = ["New York", "Los Angeles", "Las Vegas", "Orlando", "Miami", "San Francisco"]
df_top = df[df['CITY'].isin(top_cities)]

pat = ""
authorization = str(base64.b64encode(bytes(':'+pat, 'ascii')), 'ascii')



url="https://api.geoapify.com/v2/places?categories=tourism,entertainment,catering.restaurant,beach&filter=circle:-73.996705,40.74838,1000&bias=proximity:-73.996705,40.74838&limit=500&apiKey=c8a825d7da834647b40102fcad6d5b3f"

headers = {
 'Accept': 'application/json',
 'Authorization': 'Basic '+authorization
}

response = requests.get(url, headers=headers)

with open("data.json", "wb") as text_file:
    text_file.write(response.content)
