// semaphore used to make sure user data is updated before redirect happens
var locked = false;

// Checks if the user is logged in, if they are redirect
function checkLogin() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user & locked == false) {
      window.location = "/wireframes-vanilla/html/home.html";
    }
  });
}

// SIGNUP
function registerWithEmail() {
  // Get user input
  var email = $("#registerEmail").val();
  var password = $("#registerPassword").val();
  var password2 = $("#registerPassword2").val();
  var firstname = $("#registerFirstName").val();
  var lastname = $("#registerLastName").val();

  // validate user input
  if(!validateRegistrationFields(password, password2, email, firstname, lastname)) {
    return;
  }

  console.log(password + password2 + email)

  // lock
  var success = true;
  locked = true;
  // Attempt to create account
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
    // Update profile with name info
    user.updateProfile({
        displayName: firstname + " " + lastname
    }).then(function() {
        // safe to unlock and redirect
        locked = false
        window.location = "/wireframes-vanilla/html/home.html";
        console.log(user.displayName);
        // Update successful.
    }, function(error) {
        // An error happened.
    });
  }, function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    alert(errorMessage);
  });

  if(success == false) {
    return;
  }
}

/* VALIDATION */
function validateRegistrationFields(password, password2, email, first, last) {
  var errors = ""
  errors += validatePassword(password, password2);
  errors += validateEmail(password, password2);
  errors += validateName(first, last);

  if(errors != "") {
    alert(errors);
    return false;
  }
  return true;
}

// Just checks lengths for validation
function validateName(first, last) {
  if(first < 1 || last < 1) {
    return "Password must be greater than 5 characters\n";
  }
  return "";
}

// Just checks lengths for validation
function validatePassword(password, password2) {
  if(password.length < 5) {
    $("#registerPassword").animate({border: '2px red'}, "fast");
    return "Password must be greater than 5 characters\n";
  }
  if(password != password2) {
    $("#registerPassword2").animate({border: '2px red'}, "fast");
    return "Passwords do not match\n";
  }
  return "";
}

// Email validation, must have @
function validateEmail(email) {
  var re = /\S+@\S+/
  //re.test(email)
  if(true) {
    return "";
  } else {
    return "Enter a valid email";
  }
}

/* SIGNIN */
function signIn() {
  if (firebase.auth().currentUser) {
    // Already logged in, redirect to home
    window.location = "/wireframes-vanilla/html/home.html";
  } else {
    var email = $('#loginEmail').val();
    var password = $('#loginPassword').val();

    if(!validateRegistrationFields(password, password, email)) {
      return;
    }
    // Sign in with email and pass.
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
      window.location = "/wireframes-vanilla/html/home.html";
    }, function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  }
}

// Checks if the user is on mobile
window.mobilecheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// Call google apis to sign in with a gmail account
function signInWithGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/plus.login');

  if(window.mobilecheck()) {
    googleRedirect(provider);
  } else {
    googlePopup(provider);
  }

}

// Call google apis to sign in with a gmail account (popup)
function googlePopup(provider) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    // var user = result.user;
    // var displayName = user.displayName;
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
}

// Call google apis to sign in with a gmail account (redirect) 
function googleRedirect(provider) {
    firebase.auth().getRedirectResult().then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = result.credential.accessToken;
    // The signed-in user info.
    // var user = result.user;
    // var displayName = user.displayName;
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}
