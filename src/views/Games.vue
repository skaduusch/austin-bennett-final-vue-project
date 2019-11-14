<template>
	<v-container>
		<v-row>
			<v-col>
				<v-list>
					<v-list-item v-for="game in games" :key="game.gameId">
						<router-link :to="'/games/' + game.gameId">{{ game.gameName }}</router-link>
					</v-list-item>
				</v-list>
				<!-- <router-view></router-view> -->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	computed: {
		games() {
			return this.$store.getters.games;
		},
	},
};
</script>

<style>

</style>
