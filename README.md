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

- Check User Registration

 * Description: Checks if a given user can be registered to a pool

 * Path: /pool/poolId/userId

 * Parameters: poolId, userId
 * Returns: True if user is already registered to a pool, false if he's already registered or the pool is closed.

 * Notice: parameter should be sent in the following way: /pool/poolId/userId.
 
 * Try with: curl -i -X GET http://localhost:8080/pool/poolId/userId

- Get Pools By User Id

 * Description: finds the pool a user is registered in.

 * Path: /pool/

 * Parameters: userId
 * Returns: An array of the pools the user with the given ID is registered in.

 * Notice: parameter should be sent in the following way: /pool/userId.
 
 * Try with: curl -i -X GET http://localhost:8080/pool/userId

- Get Users In Pool

 * Description: Retrieves the users registered to a given pool.

 * Path: /poolscore

 * Parameters: poolId
 * Returns: An array of the users registered to the pool with the given poolId.

 * Notice: parameter should be sent in the following way: /poolscore/poolId
 
 * Try with: curl -i -X GET http://localhost:8080/poolscore/poolId

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

- Register User To Pool

 * Description: registers the user to a given poolId.

 * Path: /pool/register/

 * Parameters: {poolId : <pool's id>, userId : <user's id>}
 * Returns: The pool object that corresponds to the given poolId, minus its stages.

 * Notice: the request's data type should be set to application/json. The json object should be sent like this: 
"{\"poolId\" : <poolId>, \"userId\" : <userId>}". ('\' before all double quotations except for the initial and final ones).
 
 * Try with: curl -i -X POST -H "Content-Type: application/json" -d "{\"poolId\" : <poolId>, \"userId\" : <userId>}" http://localhost:8080/pool/register


##Links
[Carpeta en drive] (https://drive.google.com/folderview?id=0B7RgRUtptFbYdUZkRXJIbWZ2T1U&usp=sharing)
