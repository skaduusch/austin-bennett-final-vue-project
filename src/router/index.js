import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Players from '../views/Players.vue';
import Games from '../views/Games.vue';
import Game from '../views/Game.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	/* {
		path: '/about',
		name: 'about',
		route level code-splitting
		this generates a separate chunk (about.[hash].js) for this route
		which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about"***re-add end block comment here*** '../views/About.vue'),
	}, */
	{
		path: '/players',
		name: 'players',
		component: Players,
	},
	{
		path: '/games',
		name: 'games',
		component: Games,
	},
	{
		path: '/games/:gameId',
		name: 'game',
		component: Game,
	},
	{
		path: '/signIn',
		name: 'Sign In',
		component: SignIn,
	},
	{
		path: '/signUp',
		name: 'Sign Up',
		component: SignUp,
	},
	{
		path: '*',
		redirect: '/',
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
