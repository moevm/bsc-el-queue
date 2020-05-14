import sys, os
sys.path.insert(0, os.path.dirname(os.path.realpath(__file__)))
from rest_api_routines import getApp, addResources
import logging


# set all errors output to stderr
logging.basicConfig(stream=sys.stderr)

addResources()
application = getApp()
