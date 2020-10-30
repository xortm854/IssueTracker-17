const express = require('express');
const router = express.Router();
const hasLabelController = require('../../controller/has_label');

router.get('/get/:issueId', hasLabelController.get);
router.post('/insert', hasLabelController.insert);
router.put('/update', hasLabelController.update);
router.delete('/delete', hasLabelController.delete);

module.exports = router;