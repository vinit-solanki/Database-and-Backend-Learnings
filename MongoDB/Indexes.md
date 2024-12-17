# Index in Mongodb: 
## It is a specialized data structure that optimize data retrieval speed by storing a fraction of data in a more search efficient format and enable mongodb to locate data faster during queries.

# Indexing:
## It is the mechanism that allows locating the required data efficiently without scanning the entire collection

# Creating and Managing Indexes:
1. Create an Index: db.collection.createIndex({field: 1/-1});
2. View all Indexes: db.collection.getIndexes();
3. Drop an Index: db.collection.dropIndex('index_name');
4. Drop all Indexes: db.collection.dropIndexes();

# Types of Indexes:
1. Single Index: An index on the single field
2. Compound Index: An Index on multiple fields
3. Multikey Index: Supports indexing array fields, where mongodb creates separate index entries for each array element
4. Text Index: Used for full-text search on string fields
5. Geospatial Index: Supports queries on loc-based data

## Use '.explain()' method to examine the query execution
# Index Performance & Optimization:
1. Analyze Query Execution
2. Index Impact on Write Operation
3. Use Indexes Judiciously
----- use indexes carefully as, it requires extra disk spaces -----