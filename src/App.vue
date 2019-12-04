<template>
	<div id="app">
		<v-app>
			<v-toolbar color="primary" id="nav-desktop" dark>
				<v-app-bar-nav-icon @click="navDrawer = !navDrawer" class="d-md-none"></v-app-bar-nav-icon>
				<v-toolbar-title>Virtual Scorecard</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items class="hidden-sm-and-down">
					<router-link v-for="item in navItems" :key="item.title" :to="item.route">
						<div v-if="item.conditional">
							<v-list-item link>
								<v-list-item-icon>
									<v-icon>{{ item.icon }}</v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title>{{ item.title }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</div>
					</router-link>
					<a href="#" v-if="userAuthenticated" @click.prevent="signOut">
						<v-list-item link>
							<v-list-item-icon>
								<v-icon>mdi-login</v-icon>
							</v-list-item-icon>

							<v-list-item-content>Sign Out</v-list-item-content>
						</v-list-item>
					</a>
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
							<div :v-if="item.conditional">
								<v-list-item link>
									<v-list-item-icon>
										<v-icon>{{ item.icon }}</v-icon>
									</v-list-item-icon>

									<v-list-item-content>
										<v-list-item-title>{{ item.title }}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</div>
						</router-link>
					</v-list>
					<!-- <router-link to="/">Home</router-link>
					<router-link to="/players">Players</router-link>
					<router-link to="/games">Games</router-link>
					<router-link to="/signin" v-if="!user">Sign In</router-link>
					<router-link to="/signup" v-if="!user">Sign Up</router-link>-->
					<span v-if="user">{{ username }}</span>
				</nav>
			</v-navigation-drawer>
			<transition name="fade" mode="out-in">
				<router-view />
			</transition>
			<!-- <v-container>
				<v-card v-if="!user">There is no User!</v-card>
				<v-card v-if="user">There is a User! {{ user }}</v-card>
			</v-container>-->
		</v-app>
	</div>
</template>

<script>
import firebase from 'firebase';

export default {
	/* created() {
		this.$store.dispatch('bindUser');
	}, */
	beforeCreate() {
		firebase.auth().onAuthStateChanged((currentUser) => {
			console.log('onAuthStateChange Triggered');
			if (currentUser) {
				console.log('There is a user - currentUser.uid: ', currentUser.uid);
				this.$store.dispatch('bindUserRef');
				this.$store.dispatch('bindGamesRef');
				this.$store.dispatch('setUid', currentUser.uid);
			} else {
				console.log('resetting state');
				this.$store.commit('resetState');
			}
		});
	},
	data() {
		return {
			navDrawer: false,
		};
	},
	computed: {
		user() {
			return this.$store.getters.user;
		},
		username() {
			return this.$store.getters.username;
		},
		navItems() {
			return [
				{
					title: 'Home',
					route: '/',
					icon: 'mdi-home',
					conditional: true,
				},
				{
					title: 'Players',
					route: '/players',
					icon: 'mdi-account-group',
					conditional: this.authenticated(),
				},
				{
					title: 'Games',
					route: '/games',
					icon: 'mdi-cards-playing-outline',
					conditional: this.authenticated(),
				},
				{
					title: 'Sign In',
					route: '/signin',
					icon: 'mdi-login',
					conditional: this.authenticated() === false,
				},
				{
					title: 'Sign Up',
					route: '/signup',
					icon: 'mdi-account-plus',
					conditional: this.authenticated() === false,
				},
			];
		},
		userAuthenticated() {
			return this.authenticated();
		},
	},
	methods: {
		authenticated() {
			if (this.user) {
				return true;
			}
			return false;
		},
		signOut() {
			this.$store.dispatch('signOut');
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

#nav-desktop {
	.v-list-item__icon {
		margin-right: 0.6rem;
	}
}

#nav {
	a {
		font-weight: bold;
		color: #42b983;
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
.v-toolbar__content {
	height: auto !important;
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
