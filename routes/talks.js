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
      ...req.query.technologies && { technologies: { $all: req.query.technologies.split(',') } },
      ...req.query.firstName && { 'applicant.firstName': req.query.firstName },
      ...req.query.lastName && { 'applicant.lastName': req.query.lastName },
      ...req.query.email && { 'applicant.email': req.query.email },
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
    name: validator.escape(req.body.name || ''),
    description: validator.escape(req.body.description || ''),
    technologies: req.body.technologies.split(',').map((t) => validator.escape(t).toLowerCase()),
    applicant: {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    },
  }).save()
    .then(() => res.json({ error: false, message: 'Talk submitted' }))
    .catch((databaseError) => res.status(400).json({
      error: true,
      message: databaseError.message,
    }));
});

router.get('/remove', (req, res) => {
  Talk.findByIdAndRemove(req.query.id)
    .then(() => res.json({ error: false, message: 'Talk submitted' }))
    .catch((databaseError) => res.status(400).json({
      error: true,
      message: databaseError.message,
    }));
});

module.exports = router;
