<template>
	<transition-group>
		<li v-for="(player, index) in players" :key="player.id" class="player-name pa-3">
			<span v-if="player.editing === false">{{ player.name }}</span>
			<v-text-field
				@keyup.enter="doneEdit(player, index)"
				@keyup.esc="cancelEdit(index)"
				v-model="player.name"
				v-if="player.editing === true"
			/>
			<v-btn
				@click="doneEdit(player, index)"
				@keyup.enter="doneEdit(player, index)"
				@keyup.esc="cancelEdit(index)"
				v-if="player.editing === true"
			>Finish</v-btn>
			<div class="player-control">
				<span class="edit-player" @click="editPlayer(player, index)">Edit</span>
				<span class="remove-player" @click="removePlayer(index)">Remove</span>
			</div>
		</li>
	</transition-group>
</template>

<script>
// import store from '../store';

export default {
	props: ['players'],
	methods: {
		removePlayer(index) {
			this.players.splice(index, 1);
		},
		editPlayer(player, index) {
			this.players[index].editing = true;
		},
		doneEdit(player, index) {
			this.players[index].editing = false;
			this.$store.commit('editPlayer', {
				id: this.playerId,
				name: this.playerName,
				editing: false,
			}, index);
			if (!player.name.trim()) {
				this.removePlayer(index);
			}
		},
	},
};
</script>
