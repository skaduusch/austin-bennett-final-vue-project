
<template>
	<v-container class="grey lighten-5">
		<v-row no-gutters>
			<v-col cols="12">
				<v-card class="pa-4">
					<transition>
						<div class="error-message">{{ errorMessage }}</div>
					</transition>
					<ol class="players-list text-left pa-0">
						<player :players="getPlayers"></player>
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
				<v-card></v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import Player from '../components/Player.vue';
import store from '../store';

export default {
	data: () => {
		return {
			playerId: 1,
			playerName: '',
			players: store.players,
			editedPlayer: {},
			showError: false,
			errorMessage: '',
			bros: 'bros',
		};
	},
	components: {
		Player,
	},
	methods: {
		addPlayer() {
			this.clearError();
			if (this.playerName.length > 1) {
				store.commit('addPlayer', {
					id: this.playerId,
					name: this.playerName,
					editing: false,
				});
				this.playerId += 1;
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
	},
	computed: {
		getPlayers() {
			return store.state.players;
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
