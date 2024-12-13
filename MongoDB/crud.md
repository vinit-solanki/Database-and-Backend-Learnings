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

### Comparision Operators: -> db.<collection_name>.find({'field_name':{ $opr : value }})
(a) $eq : equal to
(b) $ne : not equal
(c) $gte : greater than equal
(d) $lte : less than equal
(e) $lt : less than
(f) $gt : greater than
(g) $in : in an array []
(i) $nin : not in an array []

### Logical Operatos: -> db.<collection_name>.find({$opr: [...]})
With Examples,
1. $and: db.books.find({ $and: [{genre: 'Fiction'},{copiesSold: {$gt:5}}] });
2. $or: db.books.find({ $or: [{genre: 'Fiction'},{publishYear: {$gt: 2015}}] });
3. $not: db.books.find( $nor: [cond1,cond2,...] )
4. $nor: db.books.find( $nor: [{genre: 'Fiction'},{copiesSold: {$gt:5}}] )

### Expression Operator: -> db.<collection_name>.find({ $expr: {<aggreagation_exp>} });
  -> Ex: db.books.find({ $expr: { $gt: [{ $max: '$reviews.score' }, avgScore ] } }), 
    Finds at least one item in the review array has a score greater than the avgScore of the document

### Elements Operator: -> db.<collection_name>.find({ <field_name>: { $opr: true/false } })
With Examples,
1. $exists: db.books.find({ ratings: { $exits: true } })
2. $type: db.books.find({ ratings: { $type: "string/Number,Boolean,etc." } })
3. $size: db.books.find({ reviews: { $size: 5 } })
4. $regex: db.books.find({ field: {$regex: <pattern>,$option: <options>} })

* Cursor: It's a pointer that allows to traverse through the result of a query on a collection, When it is executed, MongoDB does not immediately returns all the matching docs Instead it provides the result batchwise.
* Cursor Methods:
1. .toArray() -> to convert the doc into an array
2. .forEach(it => arr.push(it.field)) -> Ideal for processing docs one at a time without loading everything into an array
3. .limit(n) -> Limits the result size
4. .skip(n) -> Skips n docs in result, useful for purpose like pagination
5. .sort({field1:1,field2:-1}) -> 1 means ascending sorting and -1 means descending sorting
6. .count() -> deprecated
7. .countDocuments(query) -> newer counting method
8. .project({field1:1,field2:0,...}) -> to view specific fields
9. .batchSize(n) -> used with the cursor
10. .hasNext() and .next() -> for checking the next document occurance

## Update:
