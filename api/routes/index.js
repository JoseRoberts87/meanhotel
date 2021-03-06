var express = require('express');
var router = express.Router();

var ctrlHotels = require('../controllers/hotels.controllers.js');
var ctrlReviews = require('../controllers/reviews.controllers.js');
var ctrlUsers = require('../controllers/users.controllers');

router
.route('/hotels')
.get(ctrlHotels.hotelsGetAll)
.post(ctrlHotels.hotelsAddOne);
// .get(ctrlUsers.authenticate, ctrlHotels.hotelsGetAll)


router
.route('/hotels/:hotelId')
.get(ctrlHotels.hotelsGetOne)
.put(ctrlHotels.hotelsUpdateOne)
.delete(ctrlHotels.hotelsDeleteOne);

// .post(function(req, res){
//     console.log('POST the json');
//     res
//     .status(200)
//     .json({"jsonData": 'post received'});
// });

//review routes
router
.route('/hotels/:hotelId/reviews')
.get(ctrlReviews.reviewsGetAll)
.post(ctrlReviews.reviewsAddOne);

router
.route('/hotels/:hotelId/reviews/:reviewId')
.get(ctrlReviews.reviewsGetOne)
.put(ctrlReviews.reviewsUpdateOne)
.delete(ctrlReviews.reviewsDeleteOne);

router
.route('/users/register')
.post(ctrlUsers.register);

router
.route('/users/login')
.post(ctrlUsers.login);

module.exports = router;