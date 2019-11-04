import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		players: [],
	},
	mutations: {
		addPlayer(state, player) {
			state.players.push(player);
		},
	},
	actions: {

	},
	modules: {
	},
});
