# Aggregation: 
## It is a powerful framework for processing data & transforming it into a desired format
## It is used for data analysis, complex query and calculations and aggregating value like sums, average and counts from collections

# It operates using a pipeline model where docs are processed in  a sequence of stages, commonly as:
1. $match
2. $group
3. $project
4. $sort
5. $limit
6. $skip
7. $unwind
8. $lookup
9. $facet

### Common Syntax: db.collection.aggregate([ {$opr1: {field: "value"}}, {$opr2: {field: "value"}}, ... ]);