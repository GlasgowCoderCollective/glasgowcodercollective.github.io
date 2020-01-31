const router = require('express').Router();
const validator = require('validator');
const Talk = require('../models/talk');

router.post('/propose', (req, res) => {
  new Talk({
    name: validator.escape(req.body.name || ''),
    description: validator.escape(req.body.description || ''),
    technologies: validator.escape(req.body.technologies || ''),
    applicant: {
      firstName: validator.escape(req.body.firstName || ''),
      lastName: validator.escape(req.body.lastName || ''),
      email: validator.escape(req.body.email || ''),
    },
  }).save()
    .then(() => res.json({ error: false, message: 'Talk submitted' }))
    .catch((databaseError) => res.status(400).json({
      error: true,
      message: databaseError.message,
    }));
});

module.exports = router;
