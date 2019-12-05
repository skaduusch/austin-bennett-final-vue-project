<template>
	<div class="home pa-6">
		<h1>Welcome to Digital Scorecard {{ username }}!</h1>
		<h3>Here you can track scores for card games, or any other kind of game.</h3>
		<v-btn class="primary mt-4" @click="getStarted">Get Started</v-btn>
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
		username() {
			return this.$store.getters.username;
		},

	},
	components: {},
	methods: {
		getStarted() {
			if (this.user) {
				this.$router.push('/players');
			} else {
				this.$router.push('/signup');
			}
		},
	},
};
</script>
