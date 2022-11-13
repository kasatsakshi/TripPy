import flickrapi
import webbrowser

api_key = u'69f5242985063efe826a63bcbecff463'
api_secret = u'1f4e8d122724d990'

flickr = flickrapi.FlickrAPI(api_key, api_secret, format='parsed-json')


# Only do this if we don't have a valid token already
if not flickr.token_valid(perms='read'):

    # Get a request token
    flickr.get_request_token(oauth_callback='oob')

    # Open a browser at the authentication URL. Do this however
    # you want, as long as the user visits that URL.
    authorize_url = flickr.auth_url(perms='read')
    webbrowser.open_new_tab(authorize_url)

    # Get the verifier code from the user. Do this however you
    # want, as long as the user gives the application the code.
    verifier = str(input('Verifier code: '))

    # Trade the request token for an access token
    flickr.get_access_token(verifier)
def connect ():
    return flickr