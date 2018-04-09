# -*- coding: utf-8 -*-
import os
import argparse
from xml.etree.ElementTree import ElementTree
import json
import os

i = 0
list = os.listdir('Donnees/GoT_dyn_ts10')
list.sort()
for val in list:
    if(i % 10 == 0):
        #os.system("python graphml_to_JSOND3.py Donnees/HoC_dyn_ts10/"+val)
        print(i)
        print(val)
    i = i+1
