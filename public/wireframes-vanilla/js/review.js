function writeReview() {
  var review = $("#review").val();
  console.log(review);
  console.log(firebase.database().ref('reviews'));
  uid = firebase.auth().currentUser.uid;
  var reviewData = {
    uid: uid,
    review: review
  };
  var newReviewKey = firebase.database().ref("reviews/").child('reviews').push().key;
  var updates = {};
  updates['/reviews/' + newReviewKey] = reviewData;
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
