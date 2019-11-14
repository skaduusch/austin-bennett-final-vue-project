<template>
	<div>
		<h3>{{ name }}</h3>
		<ul>
			<li v-for="(score, index) in scores" :key="index">{{ score }}</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['player'],
	data() {
		return {
			scores: this.player.scores,
			name: this.player.name,
		};
	},
};
</script>

<style>
</style>
