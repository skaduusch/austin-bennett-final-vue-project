<template>
	<div class="random-players">
		<h2>Here are some random player names to get you started. Click a name to add it to your list</h2>
		<!-- <v-card>{{ names }}</v-card> -->
		<v-row>
			<v-col cols="12" sm="6" md="4" lg="3" v-for="name in names" :key="name">
				<v-card link @click="addName(name)">
					<v-card-title>{{ name }}</v-card-title>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import firestore from '../firebase';

export default {
	data() {
		return {
			nameGenUrl: 'https://uinames.com/api/?amount=12',
			names: [],
		};
	},
	computed: {
		uid() {
			return this.$store.getters.uid;
		},
		userDocRef() {
			return firestore.collection('users').doc(this.uid);
		},
		players() {
			if (this.user) {
				return this.$store.getters.user.players;
			}
			return [];
		},
		playerId() {
			if (this.players && this.players.length > 0) {
				return this.players[this.players.length - 1].id + 1;
			}
			return 0;
		},
	},
	mounted() {
		axios
			.get(this.nameGenUrl)
			.then((data) => {
				console.log('data:', data.data);
				console.log('mappedArray,', data.data.map(obj => obj.name));
				const mappedArray = data.data.map(obj => obj.name);
				this.names = mappedArray;
			})
			.catch((error) => {
				console.error(error);
			});
	},
	methods: {
		addName(name) {
			return this.userDocRef.update({
				players: firebase.firestore.FieldValue.arrayUnion(
					{
						id: this.playerId,
						name,
						editing: false,
					},
				),
			}).then()
				.catch((error) => {
					console.log('error adding player', error);
				});
		},
	},
};
</script>

<style></style>
