const mongoose = require('mongoose');

const { Schema } = mongoose;

const ApplicantSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
}, { _id: false });

const TalkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  applicant: {
    type: ApplicantSchema,
    required: true,
  },
  scheduled: {
    type: Boolean,
    default: false,
  },
  time: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('talk', TalkSchema);
