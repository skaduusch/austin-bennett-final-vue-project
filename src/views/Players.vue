
<template>
	<v-container class="grey lighten-5">
		<v-row no-gutters>
			<v-col cols="12">
				<v-card class="pa-4">
					<transition>
						<div class="error-message">{{ errorMessage }}</div>
					</transition>
					<ol class="players-list text-left">
						<li v-for="player in players" :key="player.id" class="player-name">
							{{ player.name }}
							<span class="remove-player">Remove</span>
						</li>
					</ol>
					<v-row>
						<v-col cols="12" sm="9">
							<v-text-field class="player-input" v-model="playerName" label="Player Name"></v-text-field>
						</v-col>
						<v-col cols="12" sm="3" class="d-flex align-center">
							<v-btn @click="addPlayer" block class="my-1 primary">Add Player</v-btn>
						</v-col>
					</v-row>
				</v-card>
				<v-card></v-card>
				<!-- <div>
					<h3>{{ playerName }}</h3>
					<h4>Players: {{ players }}</h4>
				</div>-->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data: () => {
		return {
			playerId: 1,
			playerName: '',
			players: [],
			showError: false,
			errorMessage: '',
		};
	},
	methods: {
		addPlayer() {
			this.clearError();
			if (this.playerName.length > 1) {
				this.players.push({
					id: this.playerId,
					name: this.playerName,
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
};
</script>

<style lang="scss">
.players-list {
	:nth-child(n + 1) {
		background-color: #888;
	}
}
.player-name {
	position: relative;
	.remove-player {
		position: absolute;
		right: 0;
		cursor: pointer;
		color: blue;
	}
}
</style>
