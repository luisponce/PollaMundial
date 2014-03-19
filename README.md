PollaMundial
============

App web para administrar pollas para el mundial.

API
---
####GET
- Get Pools By User Id

 * Description: finds the pool a user is registered in.

 * Path: /pool/

 * Parameters: userId
 * Returns: An array of the pools the user with the given ID is registered in.

 * Notice: parameter should be sent in the following way: /pool/userId.
 
 * Try with: curl -i -X GET http://localhost:8080/pool/userId

####POST
- Insert user

 * Description: registers the user if it doesn't already exist.

 * Path: /user/

 * Parameters: {user : <user json obj>}
 * Returns: True if user was inserted, false if not.

 * Notice: the request's data type should be set to application/json. The json object should be sent like this: 
"{\"user\" : {...}}". ('\' before all double quotations except for the initial and final ones).
 
 * Try with: curl -i -X POST -H "Content-Type: application/json" -d "{\"user\":{<user_doc>}}" http://localhost:8080/user

- Insert Pool
 * Description: inserts a pool json object into the pools collection.

 * Path: /pool/

 * Parameters: {pool : <pool json obj>}
 * Returns: true if it was successfully inserted, false if not.

 * Notice: the request's data type should be set to application/json. The json object should be sent like this: 
"{\"pool\" : {...}}". ('\' before all double quotations except for the initial and final ones).
 
 * Try with: curl -i -X POST -H "Content-Type: application/json" -d "{\"pool\":{<pool_doc>}}" http://localhost:8080/pool


##Links
[Carpeta en drive] (https://drive.google.com/folderview?id=0B7RgRUtptFbYdUZkRXJIbWZ2T1U&usp=sharing)
