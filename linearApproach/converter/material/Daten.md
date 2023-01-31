# Daten

Die Daten für das Trainieren, Validieren, und Testen des Neuronalen Netzwerks sind in ROOT Dateien gespeichert.

Die Datei `MIPTestOnlyPhi_modified.root` enthält Daten von denen nur der phi-Winkel mit Hilfe der Y-X Projektion gelernt werden soll.

Die Datei `MIP_ISO_FOCUSED_UpperHalf_modified.root` enthält Daten von denen der phi- und der tehta-Winkel gelernt werden soll. Die Tracks kommen jedoch nur aus einer Hemisphäre, was das Training vereinfachen soll.

 Die Datei `MIP_ISO_FOCUSED_modified.root` enthält Daten von denen der phi- und der tehta-Winkel gelernt werden soll. Die Tracks kommen aus allen Raumrichtungen, d.h. aus $4\pi$. 

## Datenformat

Alle drei Dateien sind gleich Aufgebaut. Es sind sogennannte ROOT-Files. [ROOT](https://root.cern/) ist ein Softwareframework, welches in der Teilchenphysik weit verbreitest ist. Es wird unter anderem als Datenformat für Daten von Experimenten in der Hochenergiephysik eingesetzt.

Die Daten bestehen aus einem Satz einzelner gemessener Ereignisse, sogenannter Events. Sie liegen in sogenannten ROOT-Trees. ROOT-Trees sind aus Branches aufgebaut. Ein Branch kann als ein Array angesehen werden, welches z.B. eine Variable  für alle Events in dem Tree enthält.

ROOT-Trees können in Python mit Hilfe des [uproot](https://uproot.readthedocs.io/en/latest/) Modules geladen werden.

## Tree- und Brachnamen

The Name des Trees lautet `outTree`.

Die Y-X und Y-Z Projektionen der gemessenen Detektorsignale liegen in folgenen Branches:

- `data_yx`

- `data_yz`

Die Projektionen haben je 16 Ebenen entlang der Y-Richtung und 32 Fibers entlang der X- oder Z-Richtung.
Sie sind als Tupel der Länge 512 in den Branches gespeichert, welche in ein (16, 32) Array umgeformet werden müssen um ein Bild zu erhalten

Die Richtung der Teilchenspuren ist in folgenden Branches gespeichert:

- `startDir`: Richtung der Teilchenspur. Tuple aus den beiden Winkeln (phi, theta) 

- `startPoint`: Aufpunkt der Teilchenspur. Tuple aus den Koordinaten (x, y, z)
