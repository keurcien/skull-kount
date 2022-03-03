<template>
	<div class="home">
		<Header />
		<div v-if="!gameHasStarted" class="game-settings">
			<div class="players-container">
				<p
					v-for="(player, index) in players"
					:key="index"
					@click="togglePlayerStatus(index)"
					:class="{ active: player.isPlaying, inactive: !player.isPlaying }"
				>
					{{ player.name }}
				</p>
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
			players: [
				{ name: "Amine", isPlaying: true },
				{ name: "Arnaud", isPlaying: true },
				{ name: "Ayoub", isPlaying: true },
				{ name: "Erwan", isPlaying: true },
				{ name: "Idriss", isPlaying: true },
				{ name: "Keurcien", isPlaying: true },
				{ name: "Mathieu", isPlaying: true },
				{ name: "Omar", isPlaying: true },
				{ name: "Selim", isPlaying: true },
				{ name: "Thibaut", isPlaying: true },
			],
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
	},
	computed: {
		...mapGetters(["scoreboard", "roundNumber"]),
		gameHasStarted() {
			return this.roundNumber != null;
		},
	},
};
</script>

<style>
.home {
	width: 100%;
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
	display: flex;
	flex-wrap: wrap;
	position: relative;
	width: 100%;
	padding: 10px;
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
</style>
