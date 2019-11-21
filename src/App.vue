<template>
	<div id="app">
		<v-app>
			<v-toolbar color="primary">
				<v-app-bar-nav-icon @click="navDrawer = !navDrawer" class="visible-sm-and-down"></v-app-bar-nav-icon>
				<v-toolbar-title>Virtual Scorecard</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items class="hidden-sm-and-down">
					<router-link v-for="item in navItems" :key="item.title" :to="item.route">
						<v-list-item link>
							<v-list-item-icon>
								<v-icon>{{ item.icon }}</v-icon>
							</v-list-item-icon>

							<v-list-item-content>
								<v-list-item-title>{{ item.title }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</router-link>
				</v-toolbar-items>
			</v-toolbar>
			<v-navigation-drawer id="nav" v-model="navDrawer" app floating>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="title">Virtual Scorecard</v-list-item-title>
						<!-- <v-list-item-subtitle>subtext</v-list-item-subtitle> -->
					</v-list-item-content>
				</v-list-item>

				<v-divider></v-divider>

				<nav>
					<v-list dense nav>
						<router-link v-for="item in navItems" :key="item.title" :to="item.route">
							<v-list-item link>
								<v-list-item-icon>
									<v-icon>{{ item.icon }}</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>{{ item.title }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</router-link>
					</v-list>
					<!-- <router-link to="/">Home</router-link>
					<router-link to="/players">Players</router-link>
					<router-link to="/games">Games</router-link>
					<router-link to="/signin" v-if="!user">Sign In</router-link>
					<router-link to="/signup" v-if="!user">Sign Up</router-link>-->
					<span v-if="user">{{ user.username }}</span>
				</nav>
			</v-navigation-drawer>
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
		</v-app>
	</div>
</template>

<script>
export default {
	// created() {
	// this.$store.dispatch('bindUser');
	// },
	data() {
		return {
			navDrawer: false,
			navItems: [
				{
					title: 'Home',
					route: '/',
					icon: 'mdi-home',
				},
				{
					title: 'Players',
					route: '/players',
					icon: 'mdi-account-group',
				},
				{
					title: 'Games',
					route: '/games',
					icon: 'mdi-cards-playing-outline',
				},
				{
					title: 'Sign In',
					route: '/signin',
					icon: 'mdi-login',
				},
				{
					title: 'Sign Up',
					route: '/signup',
					icon: 'mdi-account-plus',
				},
			],
		};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
	},
};
</script>

<style lang="scss">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	@media (min-width: 996px) {
		padding: 3rem;
	}

	a {
		font-weight: bold;
		color: #2c3e50;
		margin-left: 0.875rem;
		display: flex;
		&:hover {
			text-decoration: none;
		}

		&.router-link-exact-active,
		&.router-link-exact-active .v-list-item__icon i {
			color: #42b983;
		}
		.v-list-item__title {
			text-align: left;
		}
	}
}
header.v-toolbar {
	flex: 0;
}
.fade-leave-active {
	transition: opacity 0.1s ease;
	opacity: 0;
}

.fade-leave {
	opacity: 1;
	transform: translateX(0);
}
.fade-enter {
	opacity: 0;
}
.fade-enter-active {
	transition: opacity 0.1s ease;
}
</style>
