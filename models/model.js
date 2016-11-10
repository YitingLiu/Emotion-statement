var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// See http://mongoosejs.com/docs/schematypes.html

var emotionSchema = new Schema({
	// name: String,
	// // name: {type: String, required: true}, // this version requires this field to exist
	// // name: {type: String, unique: true}, // this version requires this field to be unique in the db
	// age: Number,
	// tags: [String],
	// description: {
	// 	weight: Number,
	// 	color: String
	// },
	// url: String,
	// dateAdded : { type: Date, default: Date.now },

	emotions: [String],
	things: [String],
	people: [String],
	place: String,

	date: { type: Date, default: Date.now },

	steps: Number,

	sleepQuality: { type: Number, min: 0, max: 100 },
	sleepTime: Number,

	weather: String,
	temp:Number,
})

// export 'Animal' model so we can interact with it in other files
module.exports = mongoose.model('Emotion',emotionSchema);