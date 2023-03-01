import auth
import pandas as pd
flickr = auth.connect()


#need to move this in a separate file
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

def getlonglat(row):
    res = flickr.photos.geo.getLocation(photo_id=str(row['id']))
    
    location = res['photo']['location']
    row['latitude'] = location['latitude']
    row['longitude'] = location['longitude']
    return row

for k,v in cities.items():
    data=[]
    pages = 8
    city = k
    long = v['longitude']
    lat = v['latitude']
    filename= city+'-photos.csv'

    for p in range(1, pages+1):
        
        photos = flickr.photos.search(lat=lat, lon=long, accuracy=11, radius = 20, radius_units='mi',min_date_taken='2010-01-01', max_date_taken='2023-12-31', extras=["date", "date_upload", "date_taken", "owner_name"], page=p)

        df_photos = pd.DataFrame(photos['photos']['photo'])
        df_photos = df_photos.drop(['secret', 'farm', 'server', 'ispublic', 'isfriend', 'isfamily'], axis=1)
        df_photos = df_photos.apply(getlonglat, axis=1)
        df_photos = df_photos.drop(df_photos.columns[0], axis=1)
        df_photos = df_photos.drop_duplicates()
        data.append(df_photos)
    data = pd.concat(data)
    data.to_csv(filename)
