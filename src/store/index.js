import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { db } from '../db';

Vue.use(Vuex);
// Vue.use(firebase);

export default new Vuex.Store({
	state: {
		nextGameId: 1,
		user: {
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
					gameId: 0,
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
					gameId: 1,
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
		},
		users: [],
	},
	mutations: {
		setStateFromFirestore(state) {
			this.state = state;
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
		newGame(state, players) {
			state.user.games.push({
				gameId: this.nextGameId,
				gamePlayers: players,
			});
		},
		// setUser: (state) => { state.user = firebase.auth().currentUser; },
		...vuexfireMutations,
	},
	actions: {
		bindUser: firestoreAction(({ bindFirestoreRef }) => { bindFirestoreRef('user', db.collection('users').doc('austin').get().data()); }),
		bindUsers: firestoreAction(({ bindFirestoreRef }) => { bindFirestoreRef('users', db.collection('users')); }),
		newGame(context, players) {
			context.commit('newGame', players);
			context.commit('incrementGameId');
		},
	},
	getters: {
		user: state => state.user,
		players: state => state.user.players,
		playersLength: state => state.user.players.length,
		firstname: state => state.user.fname,
		lastname: state => state.user.lname,
		nextGameId: state => state.nextGameId,
		games: state => state.user.games,
	},
});
