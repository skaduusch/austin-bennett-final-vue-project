import firebase from 'firebase/app';
import 'firebase/firestore';

// Get a Firestore instance
export const db = firebase
	.initializeApp({ projectId: 'uvu-vue-final' })
	.firestore();

console.log('db.firestore', db.collection('users').doc('austin'));
// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
