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
		<span v-if="!submissionIsValid">{{ invalidSubmissionText }}</span>
		<button id="submit-button" @click="submit" :disabled="!submissionIsValid">
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
			} else {
				this.changeRoundType();
				this.incrementRoundNumber();
			}
		},
	},
	computed: {
		...mapGetters(["scoreboard", "roundType", "activePlayers"]),
		numberOfCards() {
			let nb_cards = 0;
			for (let j = 0; j < this.activePlayers.length; j++) {
				nb_cards +=
					this.scoreboard[this.activePlayers[j]][this.roundNumber].result;
			}
			return nb_cards;
		},
		submissionIsValid() {
			return (
				this.roundType == "Bets" ||
				(this.roundType == "Results" && this.numberOfCards == this.roundNumber)
			);
		},
		invalidSubmissionText() {
			const diff = Math.abs(this.roundNumber - this.numberOfCards);
			const plis_text = diff == 1 ? "pli" : "plis";
			if (!this.submissionIsValid) {
				if (this.numberOfCards > this.roundNumber) {
					return `⚠️ Il y a ${
						this.numberOfCards - this.roundNumber
					} ${plis_text} de trop.`;
				} else {
					return `⚠️ Il manque ${
						this.roundNumber - this.numberOfCards
					} ${plis_text}.`;
				}
			} else {
				return "";
			}
		},
	},
};
</script>

<style>
.round-container {
	margin-bottom: 30px;
	padding: 10px;
}

.round-header {
	font-weight: 700;
	color: black;
}

#submit-button {
	background: rgb(255, 145, 0);
	width: 100%;
	border: none;
	color: white;
	font-family: Arial, Helvetica, sans-serif;
	font-weight: 700;
	height: 50px;
	padding: 10px 15px 10px 15px;
	text-align: center;
	position: fixed;
	bottom: 0;
	left: 0;
}

#submit-button:disabled {
	background: lightgray;
	color: darkgray;
}
</style>
