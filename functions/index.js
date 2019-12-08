const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

function addUser(userId, email) {
	console.log('setting new user doc:', userId, email);
	return admin
		.firestore()
		.collection('users')
		.doc(userId)
		.set({
			email,
			players: [],
		});
}

exports.createUser = functions.auth.user().onCreate(user => addUser(user.uid, user.email));