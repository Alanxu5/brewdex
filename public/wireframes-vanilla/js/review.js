function writeReview() {
  var review = $("#review").val();
  url = window.location.href;
  currentLocation = url.split('/').pop();
  currentLocation = currentLocation.split('.')[0];
  var location;
  uid = firebase.auth().currentUser.uid;

  var reviewData = {
    uid: uid,
    review: review,
    location: currentLocation
  };
  var newReviewKey = firebase.database().ref("reviews/").child('reviews').push().key;
  var updates = {};
  updates['/' + currentLocation + '/' + newReviewKey] = reviewData;
  updates['/user-reviews/' + uid + '/' + newReviewKey] = reviewData;
  return firebase.database().ref().update(updates);
}

function updateReview() {

}

function deleteReview() {
  var reviewVal = $("#delete").val();
  uid = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref('reviews');
  console.log(reviewVal);
  ref.on('value', function(snapshot) {
    var data = snapshot.val();
    console.log(data);
  });
}
