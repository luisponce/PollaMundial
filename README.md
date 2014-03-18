PollaMundial
============

App web para administrar pollas para el mundial.

API
---
####GET

####POST
- Register user

 * Description: registers the user if it doesn't already exist.

 * Path: /user/

 * Parameters: {user:<user json obj>}
 * Returns: True if user was inserted, false if not.

 * Notice: the request's data type should be set to application/json. The json object should be sent like this: 
"{\"user\" : {...}}". ('\' before all double quotations except for the initial and final ones).
 
 *Try with: curl -i -X POST -H "Content-Type: application/json" -d "{\"user\":{<user_doc>}}"

##Links
[Carpeta en drive] (https://drive.google.com/folderview?id=0B7RgRUtptFbYdUZkRXJIbWZ2T1U&usp=sharing)
