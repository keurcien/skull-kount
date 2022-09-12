<template>
	<div class="round-input">
		<span class="round-player-name">{{ player }}</span>
		<span style="font-weight: 700" v-if="!isResultRound">{{ value }}</span>
		<span
			v-else
			:class="{ 'result-correct': betIsCorrect, 'result-wrong': !betIsCorrect }"
			>{{ resultValue }}</span
		>
		<input v-if="isResultRound" class="bonus-input" v-model="bonus" />
		<span v-else></span>
		<span style="display: flex">
			<button class="increment-button" @click="increment">+</button>
			<button class="decrement-button" @click="decrement">-</button>
		</span>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	props: {
		player: String,
	},
	data() {
		return {
			value: 0,
			bonus: 0,
		};
	},
	methods: {
		...mapActions([
			"submitPlayerBet",
			"submitPlayerResult",
			"submitPlayerBonus",
		]),
		increment() {
			if (this.value < this.roundNumber) this.value++;
			if (this.roundType == "Bets") {
				this.submitPlayerBet({ playerName: this.player, bet: this.value });
			} else {
				this.submitPlayerResult({
					playerName: this.player,
					result: this.value,
				});
			}
		},
		decrement() {
			if (this.value > 0) this.value--;
			if (this.roundType == "Bets") {
				this.submitPlayerBet({ playerName: this.player, bet: this.value });
			} else {
				this.submitPlayerResult({
					playerName: this.player,
					result: this.value,
				});
			}
		},
	},
	computed: {
		...mapGetters(["roundNumber", "roundType", "scoreboard"]),
		isResultRound() {
			return this.roundType == "Results";
		},
		resultValue() {
			if (this.roundType == "Bets") {
				return this.value;
			} else {
				return `${this.value}/${this.currentBet}`;
			}
		},
		currentBet() {
			return this.scoreboard[this.player][this.roundNumber].bet;
		},
		betIsCorrect() {
			return this.currentBet == this.value;
		},
	},
	watch: {
		roundType: function () {
			this.value = 0;
			this.bonus = 0;
		},
		bonus: function (val) {
			if (val) {
				this.submitPlayerBonus({
					playerName: this.player,
					bonus: parseInt(val),
				});
			}
		},
	},
};
</script>

<style>
.round-input {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	align-items: center;
	grid-row-gap: 50px;
	justify-items: center;
}

.round-input > span {
	padding: 5px;
}

.round-player-name {
	width: 100px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: 700;
}

.increment-button,
.decrement-button {
	border-radius: 8px;
	width: 40px;
	height: 25px;
	border: none;
	font-weight: 700;
	color: white;
	margin-left: 5px;
}

.increment-button {
	background: rgb(5, 73, 83);
}

.decrement-button {
	background: #e23d25;
}

.bonus-input {
	width: 50px;
	text-align: right;
	border-radius: 8px;
	border: 1px solid rgb(5, 73, 83);
	height: 25px;
	padding-right: 5px;
}

.result-correct {
	color: #00863f;
	font-weight: 700;
}

.result-wrong {
	color: red;
	font-weight: 700;
}
</style>
