# TripPy #
Personalized Travel Planning Agent. It is a ful stack application that generates personalized itineraries based on user preferences.

## Pre-requisites ##
* Git
* Node.js >= 17.8.0 and npm >= 8.5.5
* MongoDB
* OpenAI GPT 3


## Setup
1. Clone the repository on your local machine.

### MongoDB
1. Create a repo on mongoDB server
2. Generate a .pem file and rename it as cert.pem
3. Save this in backend->src->dbconfig folder

### API Keys
1. OpenAI: generate an api key and store it in .env file in backend as OPEN_AI_KEY
2. GoogleMaps: generate api key and store it in .env file in frontend as GOOGLE_MAPS_API_KEY

### Data Pipeline
Apache Airflow DAGs are stored in airflow folder in datapipeline and a docker image is created.
Steps to run docker:
1. Initialize db: docker compose up airflow-init
2. Starting the service: docker compose up
3. Getting info: docker compose run airflow-worker airflow info
Docker runs in port 8080 of your server. 
Visit (*server*):8080 to see dags


### Backend
1. From the terminal, change the directory to the backend folder.
2. Run npm install.
3. Run npm start.

### Frontend
1. On a new terminal, change the directory to frontend.
2. Run npm install.
3. Run npm start.

## System Architecture
<img width="1154" alt="Screenshot 2023-05-08 at 10 23 31 PM" src="https://github.com/kasatsakshi/TripPy/assets/25169257/dbf21428-0778-4ebb-9612-b85422e1b71c">

## Application Screenshots

### The Home Page
![Screenshot 2023-04-07 at 6 59 38 PM](https://github.com/kasatsakshi/TripPy/assets/25169257/4739d46e-ca30-45f4-8fb5-7cc8f80668c2)

### Travel Planning Page
![Screenshot 2023-04-07 at 1 35 07 PM](https://github.com/kasatsakshi/TripPy/assets/25169257/6a8144d6-cf5c-4186-999c-c6d930a99d36)

### Itinerary Page
<img width="1511" alt="Screenshot 2023-05-08 at 10 49 04 PM" src="https://github.com/kasatsakshi/TripPy/assets/25169257/2d95c7d1-ad2c-4536-81e9-f37305b506ac">

### User Page

<img width="1490" alt="Screenshot 2023-05-19 at 10 47 01 AM" src="https://github.com/kasatsakshi/TripPy/assets/25169257/a1317d16-e073-44fc-8823-844d515b491e">
