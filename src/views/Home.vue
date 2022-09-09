<template>
	<div class="home">
		<Header />
		<div v-if="!gameHasStarted" class="game-settings">
			<div class="players-container">
				<div
					class="player-input"
					v-for="(player, index) in players"
					:key="index"
				>
					<input v-model="players[index]" />
					<button class="remove-player-btn" @click="removePlayer(index)">
						-
					</button>
				</div>
				<div class="input-error" v-if="!isUserNameValid">Le pseudo de l'utilisateur ne peux pas être vide</div>
				<button id="add-player-btn" @click="addPlayer">
					Ajouter un joueur
				</button>
			</div>
			<button id="start-button" @click="startGame">Start</button>
		</div>
		<Round
			v-if="gameHasStarted"
			:roundNumber="roundNumber"
			:players="players"
		/>
		<Scoreboard />
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Round from "@/components/Round.vue";
import Scoreboard from "@/components/Scoreboard.vue";
import Header from "@/components/Header.vue";

export default {
	components: {
		Header,
		Round,
		Scoreboard,
	},
	data() {
		return {
			isUserNameValid: true
		};
	},
	methods: {
		...mapActions(["initScoreboard"]),
		togglePlayerStatus(index) {
			this.players[index].isPlaying = !this.players[index].isPlaying;
		},
		initGame() {
			this.initScoreboard(this.players);
		},
		startGame() {
			this.initGame();
		},
		removePlayer(index) {
			let players = JSON.parse(JSON.stringify(this.players));
			players.splice(index, 1);
			this.$store.commit("setPlayers", players);
		},
		addPlayer() {
			if (this.players[this.players.length - 1]) {
				this.$store.commit("setPlayers", [...this.players, ""]);
				this.isUserNameValid = true
			} else {
				this.isUserNameValid = false
			}
			
		},
		handleInputError(isValid) {
			this.isUserNameValid = isValid
		}
	},
	computed: {
		...mapGetters(["scoreboard", "roundNumber", "players"]),
		gameHasStarted() {
			return this.roundNumber != null;
		},
		playersEdited: {
			get() {
				return this.$store.state.game.players;
			},
			set(value) {
				this.$store.commit("setPlayers", value);
			},
		},
	},
};
</script>

<style>
.home {
	width: 100%;
}

.input-error {
	margin-bottom: 5px;
	color: #e23d25;
}

#start-button {
	background: rgb(255, 145, 0);
	width: 100%;
	color: white;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: 700;
	height: 50px;
	border: None;
	padding: 5px 15px 5px 15px;
	text-align: center;
	position: fixed;
	bottom: 0;
	left: 0;
}

.players-container {
	width: 100%;
	padding: 20px;
}

.active {
	background: #e23d25;
	color: white;
	font-family: Arial, Helvetica, sans-serif;
	border-radius: 20px;
	padding: 5px 15px 5px 15px;
	text-align: center;
	margin: 5px;
}

.inactive {
	background: lightgray;
	color: darkgray;
	font-family: Arial, Helvetica, sans-serif;
	border-radius: 20px;
	padding: 5px 15px 5px 15px;
	text-align: center;
	margin: 5px;
}

.player-input {
	margin-bottom: 5px;
}

.remove-player-btn {
	border-radius: 8px;
	width: 32px;
	height: 32px;
	border: none;
	font-weight: 700;
	color: white;
	margin-left: 2px;
	background: #e23d25;
}

#add-player-btn {
	margin: auto;
	height: 32px;
	width: fit-content;
	padding-left: 10px;
	padding-right: 10px;
	border-radius: 12px;
	border: none;
	background: #f0ac2d;
	color: #ffffff;
	font-size: 14px;
	font-weight: 600;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
