<template>
	<div class="random-players mt-8">
		<h2>Here are some random player names to get you started. Click a name to add it to your list</h2>
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
			return this.$store.getters.players;
		},
		playersLength() {
			return this.$store.getters.playersLength;
		},
		playerId() {
			if (this.playersLength > 0) {
				return this.players[this.playersLength - 1].id + 1;
			}
			return 0;
		},
	},
	mounted() {
		axios
			.get(this.nameGenUrl)
			.then((data) => {
				const mappedArray = data.data.map(obj => obj.name);
				this.names = mappedArray;
			})
			.catch((error) => {
				console.error(error);
			});
	},
	methods: {
		addName(name) {
			return this.userDocRef
				.update({
					players: firebase.firestore.FieldValue.arrayUnion({
						id: this.playerId,
						name,
						editing: false,
					}),
				})
				.then()
				.catch((error) => {
					console.log('error adding player', error);
				});
		},
	},
};
</script>

<style></style>
