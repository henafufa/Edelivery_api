const mongoose = require('mongoose');

const GeoSchema = mongoose.Schema({
  type: {
    type: String,
    default: "Point"
  },
  coordinates:
  {
    type: [Number],
    index: "2dsphere"
  }
});


const LocationSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    agent: {
      type: mongoose.Schema.Types.Object,
      ref: 'User',
      required: true
    },
    location: GeoSchema
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const Location = module.exports = mongoose.model('Location', LocationSchema);

module.exports.setLocation = function (locationData, callback) {
  locationData
    .save(callback);
}

module.exports.updateLocation = function (query, update, callback) {
  const options = { upsert: true };
  Location
    .updateOne(query, update, options)
    .exec(callback)

}
module.exports.getLocationById = function (id, callback) {
  Location
    .findById("user.id", callback)
    .exec();
}

module.exports.getLocation = function (callback) {
  Location
    .find(callback)
    .exec();
}

