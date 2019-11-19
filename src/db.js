import firebase from 'firebase/app';
import 'firebase/firestore';
// import firestore from './firebase';

/* // Get a Firestore instance
export const db = firebase
	.initializeApp({
		apiKey: 'AIzaSyDjsuX-WdAAqO85E880HoPdJQBZtgeKg6I',
		authDomain: 'uvu-vue-final.firebaseapp.com',
		projectId: 'uvu-vue-final',
	})
	.firestore(); */

// // console.log('db.firestore', db.collection('users').doc('WWQhnwC6fsWAXtVw3ZJe16Nrcvu2').get().then());
/* const docRef = firestore.collection('users').doc('austin');
docRef.get().then((doc) => {
	if (doc.exists) {
		console.log('Document data:', doc.data());
	} else {
		// doc.data() will be undefined in this case
		console.log('No such document!');
	}
}).catch((error) => {
	console.log('Error getting document:', error);
}); */

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
