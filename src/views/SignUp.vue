<template>
	<v-container>
		<v-row>
			<v-col>
				<form @click.prevent="signUp">
					<v-text-field type="email" label="Email Address" v-model="email" name="email" id="email"></v-text-field>
					<v-text-field label="Username" v-model="username" name="username" id="username"></v-text-field>
					<v-text-field
						type="password"
						label="Password"
						v-model="password"
						name="password"
						id="password"
					></v-text-field>
					<v-text-field
						type="password"
						label="Confirm Password"
						v-model="confirmPassword"
						name="confirmPassword"
						id="confirmPassword"
					></v-text-field>
					<v-btn class="submit primary" type="submit">Sign Up</v-btn>
				</form>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
	methods: {
		signUp() {
			this.$store.dispatch('createUser', { email: this.email, username: this.username, password: this.password });
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
