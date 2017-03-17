// writes reviews to Firebase. Called when the "submit" button is pressed
function writeReview() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      // user info
      var uid = user.uid;
      var displayName = user.displayName;
      // location for Firebase
      url = window.location.href;
      currentLocation = url.split('/').pop();
      currLocation = currentLocation.split('.')[0];
      var review = $("#review").val();
      var location;
      // data sent to Firebase
      var reviewData = {
        uid: uid,
        review: review,
        location: currLocation
      };
      var newReviewKey = firebase.database().ref("reviews/").child('reviews').push().key;
      var updates = {};
      updates['/' + currLocation + '/' + newReviewKey] = reviewData;
      updates['/user-reviews/' + uid + '/' + newReviewKey] = reviewData;
      // send the new data
      firebase.database().ref().update(updates);
      // clear the text form
      var form = document.getElementById("textForm");
      form.reset();
    }
    else {
      console.log("User is not verified - writeReview()");
    }
  });
}

// updates reviews to Firebase. Called when the "update" button is pressed
function updateReview() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      // user information
      var uid = user.uid;
      var displayName = user.displayName;
      // location for Firebase
      url = window.location.href;
      currentLocation = url.split('/').pop();
      currLocation = currentLocation.split('.')[0];
      // grab information from the dropdown
      var reviewText = $('#dropdown option:selected').text();
      var reviewID = $("#dropdown option:selected").attr('id');
      var updatedReview = prompt("Would you like to update your review?", reviewText);
      var ref = firebase.database().ref(currLocation + "/").child(reviewID);
      // update Firebase with new review
      ref.update({
        "review": updatedReview
      });
      var ref1 =  firebase.database().ref("user-reviews/").child(uid).child(reviewID);
      ref1.update({
        "review": updatedReview
      });
      location.reload();
    }
    else {
      console.log("User is not verified - writeReview()");
    }
  });
}

// displays reviews called when the "submit" button is pressed
function displayReview() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      // user information
      var displayName = user.displayName;
      url = window.location.href;
      // current location for Firebase
      currentLocation = url.split('/').pop();
      currLocation = currentLocation.split('.')[0];
      var reviewRef = firebase.database().ref(currLocation);
      // get the newest added review and display it
      reviewRef.limitToLast(1).once('child_added', function(snapshot) {
        // template for the reviews table
        var t = document.querySelector('#reviewRow'),
        td = t.content.querySelectorAll("td");
        td[0].textContent = displayName;
        td[1].textContent = snapshot.val().review;
        var tb = document.querySelector("tbody");
        var clone = document.importNode(t.content, true);
        tb.appendChild(clone);
        // template for dropdown
        var dropTemplate = document.querySelector('#deleteRow'); // obj ref to template
        var clone = dropTemplate.content.cloneNode(true);
        var option = clone.querySelectorAll('option');
        option[0].id += snapshot.val().uid;
        option[0].innerHTML =snapshot.val().review;
        dropTemplate.parentNode.appendChild(clone);
      });
    }
  });
}

// Deletes reviews from Firebase. Called when the "delete" button is pressed
function deleteReview() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      // user information
      var uid = user.uid;
      var displayName = user.displayName;
      url = window.location.href;
      // location for Firebase
      currentLocation = url.split('/').pop();
      currLocation = currentLocation.split('.')[0];
      var reviewID = $("#dropdown option:selected").attr('id');
      var ref = firebase.database().ref(currLocation + "/").child(reviewID);
      var ref1 =  firebase.database().ref("user-reviews/").child(uid).child(reviewID);
      // remove the review specified
      ref.remove();
      ref1.remove();
      location.reload();
    }
    else {
      console.log("User is not verified - deleteReview()");
    }
  });
}
