import uproot
import numpy as np
import codecs
import json
import matplotlib.pyplot as plt

# file = uproot.open("MIPTestOnlyPhi_modified.root")
# file = uproot.open("MIP_ISO_FOCUSED_UpperHalf_modified.root")
file = uproot.open("material/MIP_ISO_FOCUSED_UpperHalf_modified.root")

raw_data_array_xy = np.array(file["outTree"]["data_yx"])
raw_data_array_zy = np.array(file["outTree"]["data_yz"])
all_startDir = np.array(file["outTree"]["startDir"])  # between 0 and -2 pi
all_startPoint = np.array(file["outTree"]["startPoint"])  # between 0 and pi/2


all_map_xy = []
for i, d in enumerate(raw_data_array_xy):
    all_map_xy.append(d.reshape(16, 32))


del all_map_xy[20:]

jsonString = '{"data":['

for i, d in enumerate(all_map_xy):
    jsonString += '{"index":' + str(i) + ','
    jsonString += '"startDir": [' + \
        np.array2string(all_startDir[i], separator=', ') + '],'
    jsonString += '"startPoint": [' + \
        np.array2string(all_startPoint[i], separator=', ') + '],'
    jsonString += '"values":['
    for j, e in enumerate(d):
        jsonString += '['
        for k, f in enumerate(e):
            jsonString += str(f) + ','
        jsonString = jsonString[:-1]
        jsonString += '],'
    jsonString = jsonString[:-1]
    jsonString += ']},'

jsonString = jsonString[:-1]
jsonString += ']}'

# open text file
text_file = open("output/xy.json", "w")

# write string to file
n = text_file.write(jsonString)


# close file
text_file.close()

plt.imshow(all_map_xy[0])
