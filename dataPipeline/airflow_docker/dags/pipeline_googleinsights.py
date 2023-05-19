from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
import pandas as pd
import flickrapi
import json

api_key = u'69f5242985063efe826a63bcbecff463'
api_secret = u'1f4e8d122724d990'

flickr = flickrapi.FlickrAPI(api_key, api_secret, format='parsed-json')

cities = {
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
default_args = {
    'owner': 'ratikabhuwalka',
    'depends_on_past': False,
    'start_date': datetime(2023, 4, 14, 2),
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=30),
}

dag = DAG(
    dag_id='google_insights_pipeline',
    default_args=default_args,
    schedule_interval=timedelta(weeks=2),
    tags=['trippy'],
    catchup=False,
)

def extract():

    for k,v in cities.items():
        data=[]
        pages = 1
        city = k
        long = v['longitude']
        lat = v['latitude']
        filename= city+'-photos.pkl'

        for p in range(1, pages+1):
            
            photos = flickr.photos.search(lat=lat, lon=long, accuracy=11, radius = 20, radius_units='mi',min_date_taken='2010-01-01', max_date_taken='2023-12-31', extras="geo, tags, date, date_upload, date_taken, owner_name",per_page=500, page=p)

            data.append(pd.DataFrame(photos['photos']['photo']))
        data = pd.concat(data)
        print("test", data)
        data.to_pickle(filename) 



def transform():
    for k,v in cities.items():
        city = k
        filename= city+'-photos.pkl'
        df_photos = pd.read_pickle(filename)         
        df_photos = df_photos.drop(['secret', 'farm', 'server', 'ispublic', 'isfriend', 'isfamily', 'datetakengranularity', 'datetakenunknown'], axis=1)
        df_photos = df_photos.drop_duplicates()
        df_photos.to_pickle(filename)
        
def load():
    # code to load data to destination
    for k,v in cities.items():
    
        pd.read_pickle(k+'-photos.pkl').to_csv(k+'-photos.csv')

with dag:
    extract_data = PythonOperator(task_id='extract', python_callable=extract)
    transform_data = PythonOperator(task_id='transform', python_callable=transform)
    load_data = PythonOperator(task_id='load', python_callable=load)

    extract_data >> transform_data >> load_data
