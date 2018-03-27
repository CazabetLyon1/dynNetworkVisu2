import os
import argparse
from xml.etree.ElementTree import ElementTree
import json
import os

list = os.listdir('Donnees/BB_dyn_ts10')
for val in list:
    os.system("python graphml_to_JSOND3.py Donnees/BB_dyn_ts10/"+val)