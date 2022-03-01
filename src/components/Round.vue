<template>
	<div style="margin-bottom: 25px">
		<div class="round-container">
			<p class="round-header">Round {{ roundNumber }} - {{ roundType }}</p>
			<RoundInput
				v-for="(player, index) in activePlayers"
				:key="index"
				:player="player"
			/>
		</div>
		<button id="submit-button" @click="submit">
			Validate {{ roundType.toLowerCase() }}
		</button>
		<hr />
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RoundInput from "./RoundInput.vue";

export default {
	components: {
		RoundInput,
	},
	props: {
		roundNumber: Number,
		players: Array,
	},
	data() {
		return {};
	},
	methods: {
		...mapActions([
			"submitPlayerBet",
			"changeRoundType",
			"incrementRoundNumber",
		]),
		submit() {
			if (this.roundType == "Bets") {
				this.changeRoundType();
				console.log(this.roundType);
			} else {
				this.changeRoundType();
				this.incrementRoundNumber();
			}
			console.log(this.scoreboard);
		},
	},
	computed: {
		...mapGetters(["scoreboard", "roundType"]),
		activePlayers() {
			return this.players.filter((p) => p.isPlaying);
		},
	},
};
</script>

<style>
.round-container {
	margin-bottom: 30px;
}

.round-header {
	font-weight: 700;
	color: black;
}

#submit-button {
	background: rgb(255, 145, 0);
	border: none;
	color: white;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: 700;
	border-radius: 20px;
	padding: 10px 15px 10px 15px;
	text-align: center;
	margin: 5px;
}
</style>
