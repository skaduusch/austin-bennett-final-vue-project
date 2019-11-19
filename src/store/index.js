import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import firebase from 'firebase';
import firestore from '../firebase';

Vue.use(Vuex);
// Vue.use(firebase);

export default new Vuex.Store({
	state: {
		nextGameId: 2,
		/* user: {
			fname: 'Austin',
			lname: 'Bennett',
			players: [
				{
					id: 0,
					name: 'Austin',
					editing: false,
					scores: [],
				},
				{
					id: 1,
					name: 'Shae',
					editing: false,
					scores: [],
				},
				{
					id: 2,
					name: 'Josh',
					editing: false,
					scores: [],
				},
				{
					id: 3,
					name: 'Alex',
					editing: false,
					scores: [],
				},
				{
					id: 4,
					name: 'Brad',
					editing: false,
					scores: [],
				},
			],
			games: [
				{
					gameId: '0',
					gameName: 'Nertz 1',
					gamePlayers: [
						{
							name: 'Austin',
							scores: [
								23, 19, 53,
							],
						},
						{
							name: 'Shae',
							scores: [
								33, 10, 73,
							],
						},
						{
							name: 'Logan',
							scores: [
								23, 11, -10,
							],
						},
					],
				},
				{
					gameId: '1',
					gameName: 'Golf Austin/Shae',
					gamePlayers: [
						{
							name: 'Shae',
							scores: [
								8, 3, 2, 1, 4,
							],
						},
						{
							name: 'Austin',
							scores: [
								12, 3, 0, 1,
							],
						},
					],
				},
			],
		}, */
		user: null,
	},
	mutations: {
		setStateFromFirestore(user) {
			this.state.user = user;
		},
		addPlayer(state, player) {
			state.user.players.push(player);
		},
		editPlayer(state, player, index) {
			state.user.players[index] = player;
		},
		incrementGameId(state) {
			state.nextGameId += 1;
		},
		newGame(state, payload) {
			state.user.games.push({
				gameId: state.nextGameId.toString(),
				gameName: payload.gameName,
				gamePlayers: payload.players,
			});
		},
		setUser(state, payload) {
			state.user = payload;
		},
		// setUser: (state) => { state.user = firebase.auth().currentUser; },
		...vuexfireMutations,
	},
	actions: {
		// bindUser(context) {
		// db.collection('users').doc('austin')
		// .onSnapshot((doc) => {
		// console.log('doc.data(): ', doc.data());
		// context.commit('setStateFromFirestore', doc.data());
		// });
		// },
		bindUserRef: firestoreAction(({ bindFirestoreRef }) => {
			// context contains all original properties like commit, state, etc
			// and adds `bindFirestoreRef` and `unbindFirestoreRef`
			// we return the promise returned by `bindFirestoreRef` that will
			// resolve once data is ready
			return bindFirestoreRef('user', firestore.collection('users').doc('austin'));
		}),
		newGame(context, payload) {
			context.commit('newGame', payload);
			context.commit('incrementGameId');
		},
		createUser(context, payload) {
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(
					(user) => {
						console.log('user', user);
						const docRef = firestore.collection('users').doc('WWQhnwC6fsWAXtVw3ZJe16Nrcvu2');
						docRef.get().then((doc) => {
							console.log('doc.data(): outside: ', doc.data());
							if (doc.exists) {
								console.log('doc.data(): inside: ', doc.data());
								const newUser = {
									id: doc.data().user.uid,
									username: payload.username,
								};
								context.commit('setUser', newUser);
							} else {
								// doc.data() will be undefined in this case
								console.log('No user.uid document!');
							}
						}).catch((error) => {
							console.log('Error getting document:', error);
						});
						/* const newUser = {
							id: user.uid,
							username: payload.username,
						}; */
						// context.commit('setUser', newUser);
					},
				)
				.catch(
					(error) => {
						console.log(error);
					},
				);
		},
		signIn(context, payload) {
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(
					(user) => {
						console.log('firestore:', firestore);
						console.log('firestore.collection: ', firestore.collection('users'));
						console.log('user: ', user);
						const docRef = firestore.collection('users').doc('austin');
						console.log('docRef: ', docRef);
						docRef.get().then((doc) => {
							console.log('doc.data(): outside: ', doc.data());
							if (doc.exists) {
								console.log('doc.data(): inside: ', doc.data());
								const newUser = {
									id: doc.data().user.uid,
									username: payload.username,
								};
								context.commit('setUser', newUser);
							} else {
								// doc.data() will be undefined in this case
								console.log('No user.uid document!');
							}
						}).catch((error) => {
							console.log('Error getting document:', error);
						});
					},
				)
				.catch(
					(error) => {
						console.log('Error Logging In: ', error);
					},
				);
		},
	},
	getters: {
		user: state => state.user,
		players: state => state.user.players,
		playersLength: state => state.user.players.length,
		username: state => state.user.username,
		nextGameId: state => state.nextGameId,
		games: state => state.user.games,
		currentGame: state => gameId => state.user.games.find(o => o.gameId === gameId),
	},
});
