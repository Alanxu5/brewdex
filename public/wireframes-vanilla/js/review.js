function writeReview() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      var uid = user.uid; // need the specific user to display their reviews
      var displayName = user.displayName;
      url = window.location.href;
      console.log(url);
      currentLocation = url.split('/').pop();
      console.log(currentLocation);
      currLocation = currentLocation.split('.')[0];
      console.log(currLocation);
      console.log("Beginning of writeReview()");
      var review = $("#review").val();
      var location;
      var reviewData = {
        uid: uid,
        review: review,
        location: currLocation
      };
      var newReviewKey = firebase.database().ref("reviews/").child('reviews').push().key;
      var updates = {};
      updates['/' + currLocation + '/' + newReviewKey] = reviewData;
      updates['/user-reviews/' + uid + '/' + newReviewKey] = reviewData;
      console.log("Value of currLocation in writeReview():" + currLocation);
      console.log("Value of newReviewKey in writeReview():" + newReviewKey);
      console.log("Value of userUid in writeReview():" + uid);
      console.log("Value of reviewData in writeReview():" + reviewData);
      firebase.database().ref().update(updates);
      console.log("Finished writing to Firebase - writeReview()");
      var form = document.getElementById("textForm");
      form.reset();
    }
    else {
      console.log("User is not verified - writeReview()");
    }
  });
}

function updateReview() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      var uid = user.uid; // need the specific user to display their reviews
      var displayName = user.displayName;
      url = window.location.href;
      console.log(url);
      currentLocation = url.split('/').pop();
      console.log(currentLocation);
      currLocation = currentLocation.split('.')[0];
      console.log(currLocation);
      console.log("Beginning of updateReview()");
      var reviewText = $('#dropdown option:selected').text();
      var reviewID = $("#dropdown option:selected").attr('id');
      var updatedReview = prompt("Would you like to update your review?", reviewText);
      console.log("Value of the review text - updatedReview()" + updatedReview);
      var ref = firebase.database().ref(currLocation + "/").child(reviewID);
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

function displayReview() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      var displayName = user.displayName;
      url = window.location.href;
      console.log(url);
      currentLocation = url.split('/').pop();
      console.log(currentLocation);
      currLocation = currentLocation.split('.')[0];
      console.log(currLocation);
      console.log("Beginning of displayReview()");
      var reviewRef = firebase.database().ref(currLocation);
      reviewRef.limitToLast(1).once('child_added', function(snapshot) {
        console.log(snapshot.val().review);
        var t = document.querySelector('#reviewRow'),
        td = t.content.querySelectorAll("td");
        console.log(snapshot);
        td[0].textContent = displayName;
        td[1].textContent = snapshot.val().review;
        var tb = document.querySelector("tbody");
        var clone = document.importNode(t.content, true);
        tb.appendChild(clone);

        var dropTemplate = document.querySelector('#deleteRow'); // obj ref to template
        var clone = dropTemplate.content.cloneNode(true);
        var option = clone.querySelectorAll('option');
        option[0].id += snapshot.val().uid;
        option[0].innerHTML =snapshot.val().review;
        dropTemplate.parentNode.appendChild(clone);
      });
    }
  });
  // reviewRef.limitToLast(1).once('child_changed', function(snapshot) {
  //   console.log(snapshot.val().review);
    // var t = document.querySelector('#reviewRow'),
    // td = t.content.querySelectorAll("td");
    // console.log(snapshot);
    // td[0].textContent = snapshot.val().uid;
    // td[1].textContent = snapshot.val().review;
    // var tb = document.querySelector("tbody");
    // var clone = document.importNode(t.content, true);
    // tb.appendChild(clone);
    //
    // var dropTemplate = document.querySelector('#deleteRow'); // obj ref to template
    // var clone = dropTemplate.content.cloneNode(true);
    // var option = clone.querySelectorAll('option');
    // option[0].id += snapshot.val().uid;
    // option[0].innerHTML =snapshot.val().review;
    // dropTemplate.parentNode.appendChild(clone);
  // });

}

function deleteReview() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      var uid = user.uid; // need the specific user to display their reviews
      var displayName = user.displayName;
      url = window.location.href;
      console.log(url);
      currentLocation = url.split('/').pop();
      console.log(currentLocation);
      currLocation = currentLocation.split('.')[0];
      console.log(currLocation);
      console.log("Beginning of deleteReview()");
      var reviewID = $("#dropdown option:selected").attr('id');
      var ref = firebase.database().ref(currLocation + "/").child(reviewID);
      var ref1 =  firebase.database().ref("user-reviews/").child(uid).child(reviewID);
      ref.remove();
      ref1.remove();
      console.log("Done - deleteReview()");
      location.reload();
    }
    else {
      console.log("User is not verified - deleteReview()");
    }
  });
}
