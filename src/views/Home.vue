<template>
	<div class="home">
		<h1>Welcome back to Digital Scorecard {{ user.fname }}!</h1>
		<h3>Here you can track scores for card games, or any other kind of game.</h3>
		<v-btn class="primary mt-4" to="/players">Get Started</v-btn>
	</div>
</template>

<script>
// @ is an alias to /src
// import store from '../store';

export default {
	name: 'home',
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	components: {},
};
</script>
