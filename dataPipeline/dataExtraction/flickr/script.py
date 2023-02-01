import auth

flickr = auth.connect()
sets   = flickr.photosets.getList(user_id='73509078@N00')
title  = sets['photosets']['photoset'][0]['title']['_content']
photos = flickr.photos.geo.photosForLocation(lat=37.773972, lon=-122.431297, accuracy=11)
print(photos)