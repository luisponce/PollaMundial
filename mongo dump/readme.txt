0. Inicien mongodb
mongodb

1. Hagan drop de la db chicken que tengan.
mongo 
use chicken
db.dropDatabase()
Ctrl + C

2. Importen cada colecci�n (cada archivo .bson).
mongorestore --collection <nombre de la colecci�n> --db chicken "path/a/colecci�n.bson"