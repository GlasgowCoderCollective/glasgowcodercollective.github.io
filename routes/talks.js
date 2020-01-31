const router = require('express').Router();
const validator = require('validator');
const Talk = require('../models/talk');

router.get('/', (req, res) => {
  if (req.query.id) {
    return Talk.findById(req.query.id)
      .then((docs) => res.json({ error: false, data: docs }))
      .catch((databaseError) => res.status(400).json({
        error: true,
        message: databaseError.message,
      }));
  }

  if (Object.keys(req.query).length > 0) {
    return Talk.find({
      ...req.query.name && { name: req.query.name },
      ...req.query.description && { description: req.query.description },
      ...req.query.technologies && { technologies: { $all: req.query.technologies.split(',') } },
      ...req.query.firstName && { 'applicant.firstName': req.query.firstName },
      ...req.query.lastName && { 'applicant.lastName': req.query.lastName },
    })
      .then((docs) => res.json({ error: false, data: docs }))
      .catch((databaseError) => res.status(400).json({
        error: true,
        message: databaseError.message,
      }));
  }

  return Talk.find({})
    .then((docs) => res.json({ error: false, data: docs }))
    .catch((databaseError) => res.status(400).json({
      error: true,
      message: databaseError.message,
    }));
});

router.post('/propose', (req, res) => {
  new Talk({
    name: validator.escape(req.body.name || '').toLowerCase(),
    description: validator.escape(req.body.description || '').toLowerCase(),
    technologies: req.body.technologies.split(',').map((t) => validator.escape(t).toLowerCase()),
    applicant: {
      firstName: validator.escape(req.body.firstName || '').toLowerCase(),
      lastName: validator.escape(req.body.lastName || '').toLowerCase(),
      email: validator.escape(req.body.email || '').toLowerCase(),
    },
  }).save()
    .then(() => res.json({ error: false, message: 'Talk submitted' }))
    .catch((databaseError) => res.status(400).json({
      error: true,
      message: databaseError.message,
    }));
});

module.exports = router;
