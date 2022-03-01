<template>
	<div class="round-input">
		<span>{{ player.name }}</span>
		<span>{{ value }}</span>
		<button class="increment-button" @click="increment">+</button>
		<button class="decrement-button" @click="decrement">-</button>
		<input v-if="isResultRound" class="bonus-input" v-model="bonus" />
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	props: {
		player: Object,
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
				this.submitPlayerBet({ playerName: this.player.name, bet: this.value });
			} else {
				this.submitPlayerResult({
					playerName: this.player.name,
					result: this.value,
				});
			}
		},
		decrement() {
			if (this.value > 0) this.value--;
			if (this.roundType == "Bets") {
				this.submitPlayerBet({ playerName: this.player.name, bet: this.value });
			} else {
				this.submitPlayerResult({
					playerName: this.player.name,
					result: this.value,
				});
			}
		},
	},
	computed: {
		...mapGetters(["roundNumber", "roundType"]),
		isResultRound() {
			return this.roundType == "Results";
		},
	},
	watch: {
		roundType: function () {
			this.value = 0;
			this.bonus = 0;
		},
		bonus: function (val) {
			this.submitPlayerBonus({
				playerName: this.player.name,
				bonus: parseInt(val),
			});
		},
	},
};
</script>

<style>
.round-input {
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	align-items: center;
}

.increment-button,
.decrement-button {
	border-radius: 8px;
	width: 40px;
	height: 25px;
	border: none;
	margin: 5px;
	font-weight: 700;
	color: white;
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
}
</style>
