<template>
	<div class="player">
		<h3>{{ name }}</h3>
		<ul>
			<li v-for="(score, index) in scores" :key="index" @click="editScore(index)">{{ score }}</li>
		</ul>
		<p class="sum">Total: {{ sumScore }}</p>
		<v-text-field
			type="tel"
			v-model="newScore"
			label="New Score"
			:rules="scoreRules"
			pattern="[0-9]*"
			lazy-validation="true"
			:clearable="true"
			class="scoreInput"
		></v-text-field>
		<v-btn @click="addScore">Add</v-btn>
	</div>
</template>

<script>
// import firebase from 'firebase';
import firestore from '../firebase';

const numRegex = /(^$|^[0-9]*$|null)/;
export default {
	props: ['player'],
	data() {
		return {
			scores: this.player.scores,
			name: this.player.name,
			newScore: null,
			scoreRules: [
				value => numRegex.test(value) || 'Only Numbers are Valid',
			],
		};
	},
	methods: {
		addScore() {
			const numScore = parseInt(this.newScore, 10);
			if (numScore && numRegex.test(this.newScore)) {
				this.scores.push(parseInt(this.newScore, 10));
				this.newScore = null;
			} else {
				console.log('numScore is not');
			}
		},
		editScore(index) {
			console.log(index);
		},
	},
	computed: {
		sumScore() {
			if (this.player.scores) {
				return this.player.scores.reduce((a, b) => a + b, 0);
			}
			return 0;
		},
		gameId() {
			return this.$route.params.gameId;
		},
		uid() {
			return this.$store.getters.uid;
		},
		userDocRef() {
			return firestore.collection('users').doc(this.uid);
		},
		currentGame() {
			return this.$store.getters.currentGame(this.gameId);
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
.sum {
	font-weight: 900;
}
</style>
