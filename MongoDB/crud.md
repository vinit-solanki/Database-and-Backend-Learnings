Database -> Collection -> Document({})

# Architecture:
 # |----------|    |----------|   |-----------------------------------------------|
 # | Frontend |===>| Backend  |==>|--->[Mongodb Server]<---(mongosh)              |    
 # |----------|    |----------|   |         ||                                    |
 #                                |         L==>[ Storage Engine(WildTIger)]      |
 #                                |             |                                 | 
 #                                |             |--->(JSON TO BSON)--->{Database} |
 #                                |-----------------------------------------------| 

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
(a) $and: db.books.find({ $and: [{genre: 'Fiction'},{copiesSold: {$gt:5}}] });

(b) $or: db.books.find({ $or: [{genre: 'Fiction'},{publishYear: {$gt: 2015}}] });

(c) $not: db.books.find( $nor: [cond1,cond2,...] )

(d) $nor: db.books.find( $nor: [{genre: 'Fiction'},{copiesSold: {$gt:5}}] )

### Expression Operator: -> db.<collection_name>.find({ $expr: {<aggreagation_exp>} });
  -> Ex: db.books.find({ $expr: { $gt: [{ $max: '$reviews.score' }, avgScore ] } }), Finds at least one item in the review array has a score greater than the avgScore of the document

### Elements Operator: -> db.<collection_name>.find({ <field_name>: { $opr: true/false } })

With Examples,
(a) $exists: db.books.find({ ratings: { $exits: true } }) 

(b) $type: db.books.find({ ratings: { $type: "string/Number,Boolean,etc." } })

(c) $size: db.books.find({ reviews: { $size: 5 } })

(d) $regex: db.books.find({ field: {$regex: <pattern>,$option: <options>} })

* Cursor: It's a pointer that allows to traverse through the result of a query on a collection, When it is executed, MongoDB does not immediately returns all the matching docs Instead it provides the result batchwise.
* Cursor Methods:
(a) .toArray() -> to convert the doc into an array

(b) .forEach(it => arr.push(it.field)) -> Ideal for processing docs one at a time without loading everything into an array

(c) .limit(n) -> Limits the result size

(d) .skip(n) -> Skips n docs in result, useful for purpose like pagination

(e) .sort({field1:1,field2:-1}) -> 1 means ascending sorting and -1 means descending sorting

(f) .count() -> deprecated 

(g) .countDocuments(query) -> newer counting method

(h) .project({field1:1,field2:0,...}) -> to view specific fields

(i) .batchSize(n) -> used with the cursor

(j) .hasNext() and .next() -> for checking the next document occurance

## Update:
1. UpdateOne(): db.collection.updateOne( {filter}, { $set: {existingField: "newValue", newField: "newValue"} } );
2. UpdateMany(): db.collection.updateMany( {filter}, { $set: {newField: "newValue", ...} } );
3. Renaming a Field: db.collection.updateOne( {filter}, { $rename: {oldFieldName: "newFieldName"} } );
4. Removing a Field: db.collection.updateOne( {filter}, { $unset: {fieldName: 1} } );

### Update Operators:
1. $set: sets a field to a specific value,
2. $unset: removes a field from a document,
3. $rename: renames an existing feild,
4. $min: returns the minimum value of a field,
5. $max: return the minimum value of a field,

#### Ex. Query: Set the rating field to 4.6 for a specific doc, in a movies database:
--> db.movies.updateOne( {title: "Inception"}, {$set: { rating: 4.6 }} );

## Array Update Operator:
1. $push: db.collection.updateOne({filter}, { $push: {fieldName: "value"} });
2. $pop: db.collection.updateOne({filter}, { $pop: { fieldName: "value"} });
3. $pull: db.collection.updateOne({filter}, { $pull: {fieldName: "value"} });
4. $addToSet: db.collection.updateOne({filter}, { $addToSet: {fieldName: "value"} });
5. $slice
6. $sort

### Upserts: It creates a nw doc if no matching doc is found during the update operation.
--> Ex: db.movies.updateOne({title: "Interstellar"}, {$set: {rating: 4.7}, {upsert: true}});

### Ex: Update docs where the rating is greater than 4.0 by incrementing views by 50, Adding a comment field to the review array
### Query: 
db.movies.updateMany(
  { rating: {$gt: 4.0} },
  { $inc: {views: 50} },
  { $push: {
    reviews: { $each: [{comments: "Ellecent Work!", user: "user4"}] }
  } }
)

## Delete:
1. deleteOne: db.collection.deleteOne({filter});
2. deleteMany: db.collection.deleteMany({filter});
3. findOneAndDelete: db.collection.delteMany({filter},{options}), options-> sort/projection 

### Ex: Delete all movies released before the year 2000 within rating less than 4.0
### Query:
db.movies.deleteMany({ $and: [ {releaseYear: {$lt: 2000}},{rating: {$lt: 4.0}} ] });
