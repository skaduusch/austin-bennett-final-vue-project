const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function addUser(userId, email, username) {
	return admin
		.firestore()
		.collection('users')
		.doc(userId)
		.set({
			email,
			username,
			players: [],
		});
}

exports.createUser = functions.auth.user().onCreate(user => addUser(user.uid, user.email, user.username));