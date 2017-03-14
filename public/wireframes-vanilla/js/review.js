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
  var reviewText = $('#dropdown option:selected').text();
  var reviewID = $("#dropdown option:selected").attr('id');
  var uid = firebase.auth().currentUser.uid;
  var updatedReview = prompt("Would you like to update your review?", reviewText);
  var ref = firebase.database().ref("BallastPoint/").child(reviewID);
  ref.update({
    "review": updatedReview
  });
  var ref1 =  firebase.database().ref("user-reviews/").child(uid).child(reviewID);
  ref1.update({
    "review": updatedReview
  });
  location.reload();
}

function deleteReview() {
  var reviewID = $("#dropdown option:selected").attr('id');
  uid = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref("BallastPoint/").child(reviewID);
  var ref1 =  firebase.database().ref("user-reviews/").child(uid).child(reviewID);
  ref.remove();
  ref1.remove();
  location.reload();
}
