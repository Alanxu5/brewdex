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
  // location.reload();
}

function displayReview() {
  $("#ReviewArea").load("#ReviewArea");
  console.log("displayreview()");
  // var t = document.querySelector('#reviewRow'),
  // td = t.content.querySelectorAll("td");
  //
  // var ref = firebase.database().ref('BallastPoint');
  // ref.on('value', function(snapshot) {
  //   var reviewArr = [];
  //   var userArr = [];
  //   var data = snapshot.val();
  //   for (var key in data) {
  //     if (data.hasOwnProperty(key)) {
  //       reviewArr.push(data[key].review);
  //       userArr.push(data[key].uid);
  //     };
  //   }
  //   var i;
  //   for(i = 0; i < reviewArr.length; i++){
  //     td[0].textContent = userArr[i];
  //     td[1].textContent = reviewArr[i];
  //     var tb = document.querySelector("tbody");
  //     var clone = document.importNode(t.content, true);
  //     tb.appendChild(clone);
  //   }
  // });
  // // <!--Delete/Update Reviews-->
  // var template = document.querySelector('#deleteRow'); // obj ref to template
  // var currUid = firebase.auth().currentUser; // need the specific user to display their reviews
  // if (currUid) {
  //   currUid = currUid.uid;
  // }
  // var ref = firebase.database().ref('BallastPoint');
  // ref.on('value', function(snapshot) {
  //   var reviewArr = [];
  //   var reviewIDArr = [];
  //   var data = snapshot.val();
  //   for (var key in data) {
  //     if (data.hasOwnProperty(key) && data[key].uid == currUid) {
  //       reviewArr.push(data[key].review);
  //       reviewIDArr.push(key);
  //     };
  //   }
  //   var i;
  //   for(i = 0; i < reviewArr.length; i++){
  //     var clone = template.content.cloneNode(true);
  //     var option = clone.querySelectorAll('option');
  //     option[0].id += reviewIDArr[i];
  //     option[0].innerHTML = reviewArr[i];
  //     template.parentNode.appendChild(clone);
  //   }
  // });
}

function deleteReview() {
  var reviewID = $("#dropdown option:selected").attr('id');
  uid = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref("BallastPoint/").child(reviewID);
  var ref1 =  firebase.database().ref("user-reviews/").child(uid).child(reviewID);
  ref.remove();
  ref1.remove();
}
