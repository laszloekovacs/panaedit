# two n's, two l's

### current redux actions

- load file /
- reset /
- add scene /
- remove scene /
- add hotspot /
- remove hotspot /
  
- set first scene /
- set title of scene /
- set north offset on scene /


markdown articles 
- add article /
- remove aricle /
images are contained on the articles
- change photo label /
- add photo /
- delete photo /


scene selection
- setActiveScene /

### caching 
- there's no point converting the whole scene when sending to the view
  

### folder structure
- ./project -> root directory
- ./project/data.json  -> the project file
- ./project/panoramas -> the panorama images
- ./project/photos
- ./project/articles

TODO: 
- maybe store the writer and not close the file at save, for save function
- maybe have the project check if the store changed, and make a save reminder, auto save etc.