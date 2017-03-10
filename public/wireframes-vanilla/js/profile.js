function uploadImage(file, path){
  path.put(file).then(function(snapshot) {
    console.log('Uploaded a blob or file!');
  }, downloadProfilePic());
}

function downloadImage(id, path){
  path.getDownloadURL().then(function(url) {
    // `url` is the download URL for 'images/stars.jpg'

    // Or inserted into an <img> element:
    var img = $(id)[0];
    console.log(id);
    img.src = url;
    console.log(url);
  }).catch(function(error) {
    // Handle any errors
  });
}


function uploadProfilePic() {
  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();

  // Create a storage reference from our storage service
  var profilePicsRef = storage.ref().child('profilePics');
  var uid = firebase.auth().currentUser.uid;
  var userRef = profilePicsRef.child(uid);
  var file = $("#profileUpload")[0].files[0];
  console.log(file);
  uploadImage(file, userRef);
}

function downloadProfilePic() {
  // Get a reference to the storage service, which is used to create references in your storage bucket
  var storage = firebase.storage();

  // Create a storage reference from our storage service
  var profilePicsRef = storage.ref().child('profilePics');
  var uid = firebase.auth().currentUser.uid;
  var userRef = profilePicsRef.child(uid);
  downloadImage('#profilePic', userRef)
}

function updateBio(){
  var uid = firebase.auth().currentUser.uid;
  text = $("#bioInput").val();
  if(text.length < 1) {
    alert("Enter a bio first");
    return;
  }
  firebase.database().ref('userBio/').child(uid).set({
    bio: text
  });
  displayBio(text);
}



function readBio() {
  var uid = firebase.auth().currentUser.uid;
  var userRef = firebase.database().ref('/userBio/').child(uid);
  return userRef.once('value').then(function(snapshot) {
    if(snapshot.val()) {
      displayBio(snapshot.val().bio);
    } else {
      displayBio("Add a bio!");
    }
  });
}

function deleteBio() {
  var uid = firebase.auth().currentUser.uid;
  var userRef = firebase.database().ref('/userBio/').child(uid);
  userRef.remove()
  .then(function() {
    displayBio("Add a bio!");
    console.log("Remove succeeded.");
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message);
  });

}


function displayBio(text) {
  console.log(text);
  $("#bioText").text(text);
}

function change
const user = firebase.auth().currentUser;
const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    userProvidedPassword
);
