import auth

flickr = auth.connect()
sets   = flickr.photosets.getList(user_id='73509078@N00')
title  = sets['photosets']['photoset'][0]['title']['_content']

print(sets)