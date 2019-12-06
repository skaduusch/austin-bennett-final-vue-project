<template>
	<v-container>
		<v-row>
			<v-col>
				<div class="game-players-list d-flex flex-wrap">
					<v-card class="game-player mb-3" v-for="player in players" :key="player.name">
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
		return {};
	},
	computed: {
		players() {
			return this.game.gamePlayers;
		},
	},
	components: {
		playerScores,
	},
};
</script>

<style scoped lang="scss">
.game-players-list {
	justify-content: space-around;
}
</style>
