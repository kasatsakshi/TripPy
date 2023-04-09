import lxml
import cchardet 
import requests
from bs4 import BeautifulSoup
import csv

user_agent = ({'User-Agent':
			'Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
			AppleWebKit/537.36 (KHTML, like Gecko) \
			Chrome/90.0.4430.212 Safari/537.36',
			'Accept-Language': 'en-US, en;q=0.5'})


url = "https://www.tripadvisor.com/TravelersChoice-Destinations-cTop-g191"

response = requests.get(url, headers=user_agent)
soup = BeautifulSoup(response.text, 'lxml')

main_content = soup.find('div', class_='tcListMainContentWrapper')
winning_places = main_content.find('div', class_='winnerWrapper posRel')
name_list = winning_places.find_all('div', class_="winnerLayer")
description_list = winning_places.find_all('div', class_="descr_lb")
image_list =  winning_places.find_all('ul', class_='tcphotos_lb')

with open('trending_places.csv', mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['Place Name', 'Description', 'Image URL'])

    # Loop through each winning place and extract the place name, description, and image URL
    for i in range(len(name_list)):
        place_name = name_list[i].find('div', class_='winnerName').text.strip()
        place_desc = description_list[i].text.strip()
        img_url = image_list[i].find('img')['src']

        # Write the extracted data to the CSV file
        writer.writerow([place_name, place_desc, img_url])

        # Print the extracted data to the console
        print(place_name)
        print(place_desc)
        print(img_url)
        print()


