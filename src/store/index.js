import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { db } from '../db';

Vue.use(Vuex);
// Vue.use(firebase);

export default new Vuex.Store({
	state: {
		user: {
			fname: 'Austin',
			lname: 'Bennett',
			players: [
				{
					id: 0,
					name: 'Austin',
					editing: false,
				},
				{
					id: 1,
					name: 'Shae',
					editing: false,
				},
				{
					id: 2,
					name: 'Josh',
					editing: false,
				},
				{
					id: 3,
					name: 'Alex',
					editing: false,
				},
				{
					id: 4,
					name: 'Brad',
					editing: false,
				},
			],
		},
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
		// setUser: (state) => { state.user = firebase.auth().currentUser; },
		...vuexfireMutations,
	},
	actions: {
		bindUser: firestoreAction(({ bindFirestoreRef }) => {
			// return the promise returned by `bindFirestoreRef`
			return bindFirestoreRef('user', db.document('WWQhnwC6fsWAXtVw3ZJe16Nrcvu2'));
		}),
	},
	getters: {
		user: state => state.user,
		players: state => state.user.players,
		playersLength: state => state.user.players.length,
		firstname: state => state.user.fname,
		lastname: state => state.user.lname,
	},
});
