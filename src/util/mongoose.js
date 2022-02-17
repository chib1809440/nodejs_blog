module.exports = {
	multipleMongooseToObject: function (mongooses) {
		return mongooses.map((mongoose) => mongoose.toObject());
	},

	mongoosetoOject: function (mongoose) {
		return mongoose ? mongoose.toObject() : mongoose;
	},
};
