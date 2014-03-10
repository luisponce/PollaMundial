0. Inicien mongodb
mongodb

1. Hagan drop de la db chicken que tengan.
mongo 
use chicken
db.dropDatabase()
Ctrl + C

2. Importen cada colección (cada archivo .bson).
mongorestore --collection <nombre de la colección> --db chicken "path/a/colección.bson"