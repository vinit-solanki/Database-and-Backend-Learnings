Database -> Collection -> Document({})

# Managing DBs and Collections:
1. show dbs;  -> to view all the databases
2. show collections; -> to view all the collections
3. use <db_name>; -> to use or create a new databse
4. db; -> to view current database 
5. db.dropDatabase(); -> to delete a database
6. db.createCollection("<collection_name>"); ->create a new collection
7. db.<collection_name>.drop(); -> delete an existing collection

# CRUD using mongodb:
## Create:
1. db.<collection_name>.insertOne({key:value})
2. db.<collection_name>.insertMany([{key:value},{key:value},...])

* Ordered Insert: Stops Iteration on error, By default, db.<collection_name>.insertMany([],{ordered:true})
* Unrdered Insert: Continouse execution, db.<collection_name>.insertMany([],{ordered:false})
* Importing JSON in MongoDB:
1. For Only Objects: mongoimport file_name.json -d database_name -c collection_name
2. For Array of Objects: mongoimport file_name.json -d database_name -c collection_name --jsonArray

## Read:
* To retrieve docs in a collection, use find methods
1. db.<collection_name>.find() -> Find all the docs
2. db.<collection_name>.findOne({conditon})
3. db.<collection_name>.find({key: {$opr: vaalue}}) -> coditional

* Comparision Operators: -> db.<collection_name>.find({'field_name':{ $opr : value }})
(a) $eq : equal to
(b) $ne : not equal
(c) $gte : greater than equal
(d) $lte : less than equal
(e) $lt : less than
(f) $gt : greater than
(g) $in : in an array []
(i) $nin : not in an array []

* Cursor: It's a pointer that allows to traverse through the result of a query on a collection, When it is executed, MongoDB does not immediately returns all the matching docs Instead it provides the result batchwise.
* Cursor Methods:
(a)