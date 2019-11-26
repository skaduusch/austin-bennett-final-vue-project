
<template>
	<v-container class="grey lighten-5">
		<v-row no-gutters>
			<v-col cols="12">
				<h2>Ready for a new game {{ username }}?</h2>
				<v-card class="pa-4">
					<transition>
						<div class="error-message" v-if="showError">{{ errorMessage }}</div>
					</transition>
					<ol class="players-list text-left pa-0">
						<player></player>
					</ol>
					<v-form @submit.prevent="addPlayer">
						<v-row>
							<v-col cols="12" sm="9">
								<v-text-field class="player-input" v-model="playerName" label="Player Name"></v-text-field>
							</v-col>
							<v-col cols="12" sm="3" class="d-flex align-center">
								<v-btn type="submit" block class="my-1 primary">Add Player</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-card>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-text-field class="game-name-input" v-model="gameName" label="Game Name"></v-text-field>
				<v-btn class="primary" @click="newGame">Start A New Game With These Players</v-btn>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Player from '../components/Player.vue';
// import db from '../db';
// import store from '../store';

export default {
	data: () => ({
		playerName: '',
		showError: false,
		errorMessage: '',
		gameName: 'UnnamedGame',
	}),
	components: {
		Player,
	},
	methods: {
		addPlayer() {
			this.clearError();
			if (this.playerName && this.playerName.length > 1) {
				this.$store.commit('addPlayer', {
					id: this.playerId,
					name: this.playerName,
					editing: false,
					scores: [],
				});
				// this.playerId = this.$store.getters.playersLength;
				this.playerName = '';
			} else {
				this.error('A name must be at least 2 characters');
			}
		},
		error(message) {
			this.errorMessage = message;
			this.showError = true;
		},
		clearError() {
			this.showError = false;
		},
		newGame() {
			this.$store.commit('newGame', {
				players: this.players,
				gameName: this.gameName,
			});
			this.$router.push(`/games/${this.nextGameId}`);
			this.$store.commit('incrementGameId');
		},
	},
	computed: {
		user() {
			if (this.$store.getters.user) {
				return this.$store.getters.user;
			}
			return null;
		},
		username() {
			if (this.user) {
				return this.user.username;
			}
			return '';
		},
		players() {
			if (this.user) {
				return this.$store.getters.user.players;
			}
			return [];
		},
		playerId() {
			if (this.players) {
				return this.players[this.players.length - 1].id + 1;
			}
			return 0;
		},
		nextGameId() {
			return this.$store.getters.nextGameId;
		},
	},
};
</script>

<style lang="scss">
.players-list {
	list-style: none;
	padding: 0;
	& > :nth-child(even) {
		background-color: #eee;
	}
}
.player-name {
	position: relative;
	.player-control {
		display: inline-block;
		position: absolute;
		right: 1.2rem;
		span {
			cursor: pointer;
			color: blue;
			&:last-child {
				margin-left: 1rem;
			}
		}
	}
}
</style>
