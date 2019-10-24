
<template>
	<v-container class="grey lighten-5">
		<v-row no-gutters>
			<v-col cols="12" sm="6" md="8">
				<v-card>
					<v-text-field class="player-input" v-model="playerName" label="Player Name"></v-text-field>
					<v-button @click="addPlayer">Add Player</v-button>
				</v-card>
				<v-card>
					<div class="players-list">
						<ol>
							<li v-for="player in players" :key="player.id"></li>
						</ol>
					</div>
				</v-card>
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
		};
	},
	methods: {
		addPlayer() {
			this.players.push({
				id: this.playerId,
				name: this.playerName,
			});
			this.playerId += 1;
			this.playerName = '';
		},
	},
};
</script>

<style scss>
</style>
