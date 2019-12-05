<template>
	<v-container>
		<v-row>
			<v-col>
				<form @submit.prevent="signIn">
					<v-text-field
						type="email"
						label="Email Address"
						v-model="email"
						name="email"
						id="email"
						:rules="emailRules"
					></v-text-field>
					<v-text-field
						type="password"
						label="Password"
						v-model="password"
						name="password"
						id="password"
						:rules="passwordRules"
					></v-text-field>
					<v-btn class="submit primary" type="submit">Sign In</v-btn>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default {
	data() {
		return {
			email: '',
			password: '',
			emailRules: [
				value => emailRegex.test(value) || 'Valid email is required',
			],
			passwordRules: [
				value => value.length > 7 || 'Password much be at least 8 characters',
			],
		};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	methods: {
		signIn() {
			this.$store.dispatch('signIn', { email: this.email, password: this.password });
		},
	},
	watch: {
		user(value) {
			if (value !== null && value !== undefined) {
				this.$router.push('/');
			}
		},
	},
};
</script>

<style>

</style>
