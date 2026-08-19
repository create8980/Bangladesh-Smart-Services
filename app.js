const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Google দিয়ে লগইন করার ফাংশন
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert("Login Failed: " + error.message);
        });
}

// সাধারণ ইমেইল/পাসওয়ার্ড লগইন (প্রয়োজন অনুযায়ী যুক্ত করতে পারেন)
function login() {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('pass').value;
    
    auth.signInWithEmailAndPassword(email, pass)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
}

// লগআউট করার ফাংশন
function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
}

// পেজ সিকিউরিটি চেক (লগইন ছাড়া ভেতরে ঢুকতে পারবে না)
auth.onAuthStateChanged(user => {
    const path = window.location.pathname;
    if (!user && !path.includes('login.html')) {
        window.location.href = 'login.html';
    } else if (user && path.includes('login.html')) {
        window.location.href = 'index.html';
    }
});
