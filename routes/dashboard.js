const router = require('express').Router();
const path = require('path');

router.get('/',(req,res)=> {
  res.sendFile(path.join(__dirname,'/../frontend/templates/dashboard.html'));
});


module.exports.route = router;