
<template>
	<v-container class="grey lighten-5">
		<v-row no-gutters>
			<v-col cols="12">
				<v-card class="pa-4">
					<transition>
						<div class="error-message">{{ errorMessage }}</div>
					</transition>
					<ol class="players-list text-left pa-0">
						<transition-group>
							<li
								v-for="(player, index) in players"
								:key="player.id"
								class="player-name pa-3"
							>
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
									>Finish</v-btn
								>
								<div class="player-control">
									<span class="edit-player" @click="editPlayer(player, index)"
										>Edit</span
									>
									<span class="remove-player" @click="removePlayer(index)"
										>Remove</span
									>
								</div>
							</li>
						</transition-group>
					</ol>
					<v-form @submit.prevent="addPlayer">
						<v-row>
							<v-col cols="12" sm="9">
								<v-text-field
									class="player-input"
									v-model="playerName"
									label="Player Name"
								></v-text-field>
							</v-col>
							<v-col cols="12" sm="3" class="d-flex align-center">
								<v-btn type="submit" block class="my-1 primary">Add Player</v-btn>
							</v-col>
						</v-row>
					</v-form>
				</v-card>
				<v-card></v-card>
				<!-- <div>
					<h3>{{ playerName }}</h3>
					<h4>Players: {{ players }}</h4>
				</div>-->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
export default {
	data: () => {
		return {
			playerId: 1,
			playerName: '',
			players: [],
			editedPlayer: {},
			showError: false,
			errorMessage: '',
		};
	},
	methods: {
		addPlayer() {
			this.clearError();
			if (this.playerName.length > 1) {
				this.players.push({
					id: this.playerId,
					name: this.playerName,
					editing: false,
				});
				this.playerId += 1;
				this.playerName = '';
			} else {
				this.error('A name must be at least 2 characters');
			}
		},
		removePlayer(index) {
			this.players.splice(index, 1);
		},
		editPlayer(player, index) {
			console.log('editPlayer');
			this.players[index].editing = true;
		},
		doneEdit(player, index) {
			console.log('doneEdit');
			this.players[index].editing = false;
			if (!player.name.trim()) {
				this.removePlayer(index);
			}
		},
		error(message) {
			this.errorMessage = message;
			this.showError = true;
		},
		clearError() {
			this.showError = false;
		},
	},
};
</script>

<style lang="scss">
.players-list {
	list-style: none;
	padding: 0;
	& > :nth-child(even) {
		background-color: #eee;
	}
}
.player-name {
	position: relative;
	.player-control {
		display: inline-block;
		position: absolute;
		right: 1.2rem;
		span {
			cursor: pointer;
			color: blue;
			&:last-child {
				margin-left: 1rem;
			}
		}
	}
}
</style>
