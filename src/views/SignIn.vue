<template>
	<v-container>
		<v-row>
			<v-col>
				<form @click.prevent="signIn">
					<v-text-field type="email" label="Email Address" v-model="email" name="email" id="email"></v-text-field>
					<v-text-field
						type="password"
						label="Password"
						v-model="password"
						name="password"
						id="password"
					></v-text-field>
					<v-btn class="submit primary" type="submit">Sign In</v-btn>
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
			password: '',
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
