<template>
	<v-container>
		<v-row>
			<v-col>
				<router-view></router-view>
				<h1>This is the Game Component</h1>
				<h2>{{ gameName }}</h2>
				<game-scores :game="game"></game-scores>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import gameScores from '../components/GameScores.vue';

export default {
	data() {
		return {
			gameId: this.$route.params.gameId,
		};
	},
	computed: {
		/* games() {
			return this.$store.getters.games;
		}, */
		game() {
			return this.$store.getters.currentGame(this.gameId);
		},
		gamePlayers() {
			return this.game.gamePlayers;
		},
		gameName() {
			return this.game.gameName;
		},
	},
	methods: {
		/* getGame(games, gameId) {
			return games.find(o => o.gameId === gameId);
		}, */
	},
	components: {
		gameScores,
	},
};
</script>

<style></style>
