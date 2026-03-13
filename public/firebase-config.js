// Firebase Configuration - Acuron IT Services

const firebaseConfig = {
  apiKey: "AIzaSyBVN8wfSsVUZQmkgETBCMiGRWh3ecR9W3w",
  authDomain: "acuron-portfolio1.firebaseapp.com",
  projectId: "acuron-portfolio1",
  storageBucket: "acuron-portfolio1.appspot.com",
  messagingSenderId: "877100215199",
  appId: "1:877100215199:web:b33352118bed1e7fe5abaa"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();

// Google provider
const googleProvider = new firebase.auth.GoogleAuthProvider();


// Auth state observer

auth.onAuthStateChanged(async (user) => {

  if (user) {

    console.log("User logged in:", user.email);

    updateNavForLoggedInUser(user);

    try {

      const doc = await db.collection("users").doc(user.uid).get();

      if (doc.exists) {

        const role = doc.data().role;

        console.log("User role:", role);

      }

    } catch (error) {

      console.error("Error getting role:", error);

    }

  } else {

    console.log("User signed out");

    updateNavForLoggedOutUser();

  }

});


// Update navigation for logged in user

function updateNavForLoggedInUser(user) {

  const loginBtn = document.getElementById("login-btn");
  const userMenu = document.getElementById("user-menu");

  if (loginBtn) loginBtn.style.display = "none";

  if (userMenu) {

    userMenu.style.display = "flex";

    const userAvatar = document.getElementById("user-avatar");
    const userName = document.getElementById("user-name");

    if (userAvatar)
      userAvatar.src = user.photoURL || "assets/icons/default-avatar.svg";

    if (userName)
      userName.textContent = user.displayName || user.email;

  }

}


// Update navigation for logged out user

function updateNavForLoggedOutUser() {

  const loginBtn = document.getElementById("login-btn");
  const userMenu = document.getElementById("user-menu");

  if (loginBtn) loginBtn.style.display = "flex";

  if (userMenu) userMenu.style.display = "none";

}


// Sign out function

function signOut() {

  auth.signOut()
    .then(() => {

      console.log("User signed out");

      window.location.href = "index.html";

    })
    .catch((error) => {

      console.error("Sign out error:", error);

    });

}// v2
