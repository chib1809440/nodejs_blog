const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const Course = new Schema(
	{
		_id: { type: 'Number' },
		name: { type: 'string' },
		description: { type: 'string' },
		image: { type: 'string' },
		slug: {
			type: String,
			slug: 'name',
			unique: true,
		},
		videoID: { type: 'string' },
		bought: { type: 'boolean', default: false },
		boughtAt: { type: 'Date' },
	},
	{ _id: false, timestamps: true },
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: ['count', 'countDocuments', 'find'],
});
Course.plugin(AutoIncrement);

module.exports = mongoose.model('Course', Course);
