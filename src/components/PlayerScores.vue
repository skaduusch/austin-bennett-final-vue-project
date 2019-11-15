<template>
	<div class="player">
		<h3>{{ name }}</h3>
		<ul>
			<li v-for="(score, index) in scores" :key="index" @click="editScore(index)">{{ score }}</li>
		</ul>
		<v-text-field
			type="tel"
			v-model="newScore"
			label="New Score"
			:rules="scoreRules"
			pattern="[0-9]*"
		></v-text-field>
		<v-btn @click="addScore">Add</v-btn>
	</div>
</template>

<script>
export default {
	props: ['player'],
	data() {
		return {
			scores: this.player.scores,
			name: this.player.name,
			newScore: '',
			scoreRules: [
				value => /^[0-9]*$/.test(value) || 'Only Numbers are Valid',
			],
		};
	},
	methods: {
		addScore() {
			const numScore = parseInt(this.newScore, 10);
			if (numScore) {
				this.scores.push(parseInt(this.newScore, 10));
				this.newScore = '';
			} else {
				console.log('numScore is not');
			}
		},
		editScore(index) {
			console.log(index);
		},
	},
};
</script>

<style scoped lang="scss">
.player {
	padding: 1rem;
	ul {
		list-style: none;
		padding: 0;
	}
}
</style>
