var express = require('express');
var router = express();
var path = require('path');
var port = process.env.PORT || 9001;

router.use(express.static(path.join(__dirname, 'public')));
router.use('/app', express.static(__dirname + '/app'));

router.get('/api', function(req, res) {
   res.json();
});



router.listen(port);
console.log('listening on port ' + port);