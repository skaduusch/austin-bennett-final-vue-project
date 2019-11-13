import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Players from '../views/Players.vue';
import Games from '../views/Games.vue';
import Game from '../views/Game.vue';

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
		children: [
		],
	},
	{
		path: '/games/:id',
		name: 'game',
		component: Game,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
