<template>
	<v-container>
		<v-row>
			<v-col>
				<h3>This is the GameScores component</h3>
				<h2>The gameId is: {{ gameId }}</h2>
				<div class="players-list">
					<v-card class="player" v-for="player in players" :key="player.name">
						<player-scores :player="player"></player-scores>
					</v-card>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import playerScores from './PlayerScores.vue';

export default {
	props: ['game'],
	data() {
		return {
			gameId: this.$route.params.gameId,
			players: this.game.gamePlayers,
		};
	},
	components: {
		playerScores,
	},
};
</script>

<style scoped lang="scss">
.players-list {
	display: flex;
	justify-content: space-around;
}
</style>
