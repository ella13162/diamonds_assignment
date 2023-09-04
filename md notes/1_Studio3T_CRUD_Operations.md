## OPERATIONS IN STUDIO 3T:

# Step 1:
Import the dataset (csv) to mongodb using mongo db compass
# Step 2:
Make it a default database if is already exist, else create it using the same USE command:

"" 
use.diamonds;
show.collections;
db.diamonds.find({});
db.createCollection();

use DIAMOND_SHOP;
show.collections;
db.createCollection("diamonds");

db.diamonds.find({}).sort({price : 1}); // ascending order
db.diamonds.find({}).sort({price : -1}); // descending order

""

# Step 3:
Crud operations:

""
db.diamonds.find({"_id":  ObjectId("64a7d8fcde5d0a07e7b5be24") , "carat" : 0.23}); 

db.diamonds.find({ $or: [ { "clarity": { $in: ["SI2", "SI1"] } }, { "color": "F" } ] });

db.diamonds.deleteMany({"cut": "Fair" });

db.diamonds.insertOne({
"_id" : ObjectId("64a7d8fcde5d0a07e7b5be2c"),
"carat" : 0.22,
"cut" : "Fair",
"color" : "E",
"clarity" : "VS2",
"depth" : 65.1,
"table" : 61.0,
"price" : NumberInt(337),
"x" : 3.87,
"y" : 3.78,
"z" : 2.49
}); 


""
## Relational Operators in MongoDB:
Relational operators are:
-- $eq => equal to
-- $gt => greater than
-- $gte => greater than and equal to
-- $in => IN operator
-- $lt => less than
-- $lte => less than and equal to
-- $ne => not equal
-- $nin => NOT IN