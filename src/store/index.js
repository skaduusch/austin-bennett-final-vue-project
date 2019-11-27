import Vue from 'vue';
import Vuex from 'vuex';
// import { vuexfireMutations, firestoreAction } from 'vuexfire';
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
			username: 'skaduusch',
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
					name: 'Thor',
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
							id: 0,
							name: 'Austin',
							editing: false,
							scores: [
								23, 19, 53,
							],
						},
						{
							id: 1,
							name: 'Shae',
							editing: false,
							scores: [
								33, 10, 73,
							],
						},
						{
							id: 2,
							name: 'Logan',
							editing: false,
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
		username: '',
		games: [],
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
		setUser(state, userData) {
			state.user = userData;
		},
		setUsername(state, username) {
			state.username = username;
		},
		// setUser: (state) => { state.user = firebase.auth().currentUser; },
		// ...vuexfireMutations,
	},
	actions: {
		// bindUser(context) {
		// db.collection('users').doc('austin')
		// .onSnapshot((doc) => {
		// console.log('doc.data(): ', doc.data());
		// context.commit('setStateFromFirestore', doc.data());
		// });
		// },
		// bindUserRef: firestoreAction(({ bindFirestoreRef }) => bindFirestoreRef('user', firestore.collection('users').doc(firebase.currentUser.uid))),
		/* newGame(context, payload) {
			context.commit('newGame', payload);
			context.commit('incrementGameId');
		}, */
		createUser(context, payload) {
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(
					(authData) => {
						authData.user.updateProfile({
							displayName: payload.username,
						}).then(() => {
							context.commit('setUsername', authData.user.displayName);
							// firestore.collection('users').doc(authData.user.uid).set({ username: authData.user.displayName });
						}).catch((error) => {
							console.log('updateProfile failed: ', error);
						});

						/* const docRef = firestore.collection('users').doc(authData.user.uid);
						docRef.onSnapshot((snapshot) => {
							console.log('createUser().onSnapshot(): ', snapshot.data());
						}); */
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
					/* (authData) => {
						context.commit('setUserName', authData.user.displayName);
						const docRef = firestore.collection('users').doc(authData.user.uid);
						docRef.onSnapshot((snapshot) => {
							console.log('signIn().onSnapshot(): ', snapshot.data());
							if (snapshot.exists) {
								console.log('signIn().onSnapshot() snapshot exists, user logged in');
							} else {
								console.log('signIn().onSnapshot() No user.uid document!');
							}
						});
					}, */
				)
				.catch(
					(error) => {
						console.log('signIn() Error Logging In: ', error);
					},
				);
		},
		setUser(context, uid) {
			firestore.collection('users').doc(uid).onSnapshot((snapshot) => {
				if (snapshot.exists) {
					console.log('setUser().onSnapshot(): ', snapshot.data());
					context.commit('setUser', snapshot.data());
				}
			});
		},
		setUsername(context, username) {
			context.commit('setUsername', username);
		},
	},
	getters: {
		user: state => state.user,
		players: state => (state.user ? state.user.players : []),
		playersLength: state => (state.user ? state.user.players.length : 0),
		username: state => state.username || '',
		nextGameId: state => state.nextGameId || 0,
		games: state => state.games || [],
		currentGame: state => gameId => state.user.games.find(o => o.gameId === gameId),
	},
});
