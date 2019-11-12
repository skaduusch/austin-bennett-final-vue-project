<template>
	<div id="app">
		<v-app>
			<div id="nav">
				<router-link to="/">Home</router-link>
				<router-link to="/players">Players</router-link>
				<router-link to="/games">Games</router-link>
			</div>
			<router-view />
		</v-app>
	</div>
</template>

<script>
export default {
	//
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
	padding: 3rem;

	a {
		font-weight: bold;
		color: #2c3e50;
		margin-left: 0.875rem;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
