<template>
	<div>
		<p v-if="gameHasStarted" class="scoreboard-header">Scoreboard</p>
		<b-table hover :items="scores"></b-table>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	data() {
		return {};
	},
	methods: {
		calcPlayerScore(playerName) {
			let score = 0;
			for (let i = 1; i < this.roundNumber; i++) {
				let round = this.scoreboard[playerName][i];
				const diff = Math.abs(round.bet - round.result);

				if (diff == 0) {
					if (round.bet == 0) {
						score += 10 * round.number;
					} else {
						score += 20 * round.bet;
					}
				} else {
					if (round.bet == 0) {
						score -= 10 * round.number;
					} else {
						score -= 10 * diff;
					}
				}
				score += round.bonus;
			}
			return score;
		},
	},
	computed: {
		...mapGetters(["scoreboard", "roundNumber", "activePlayers"]),
		scores() {
			return this.activePlayers
				.map((p) => {
					return { player: p.name, score: this.calcPlayerScore(p.name) };
				})
				.sort((a, b) => (a.score > b.score ? -1 : 1));
		},
		gameHasStarted() {
			return this.roundNumber != null;
		},
	},
};
</script>

<style>
.scoreboard-header {
	color: rgb(5, 73, 83);
	font-size: 20px;
	font-weight: 700;
}
</style>
