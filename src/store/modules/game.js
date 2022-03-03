const state = {
	scoreboard: null,
	roundNumber: null,
	roundType: "Bets",
	activePlayers: [],
};

const getters = {
	scoreboard: (state) => state.scoreboard,
	roundNumber: (state) => state.roundNumber,
	roundType: (state) => state.roundType,
	activePlayers: (state) => state.activePlayers,
};

const mutations = {
	setRoundNumber: (state, roundNumber) => (state.roundNumber = roundNumber),
	setScoreboard: (state, scoreboard) => {
		state.scoreboard = scoreboard;
	},
	setPlayerBet: (state, { playerName, bet }) => {
		state.scoreboard[playerName][state.roundNumber].bet = bet;
	},
	setPlayerResult: (state, { playerName, result }) => {
		state.scoreboard[playerName][state.roundNumber].result = result;
	},
	setRoundType: (state, roundType) => {
		state.roundType = roundType;
	},
	setActivePlayers: (state, activePlayers) => {
		state.activePlayers = activePlayers;
	},
	setPlayerBonus: (state, { playerName, bonus }) => {
		state.scoreboard[playerName][state.roundNumber].bonus = bonus;
	},
};

const actions = {
	initScoreboard({ commit }, players) {
		let scoreboard = {};
		const activePlayers = players.filter((p) => p.isPlaying);
		for (let k = 0; k < activePlayers.length; k++) {
			let rounds = {};
			for (let i = 1; i <= 12; i++) {
				rounds[i] = {
					number: i,
					bet: 0,
					result: 0,
					bonus: 0,
				};
			}
			scoreboard[activePlayers[k].name] = rounds;
		}
		commit("setScoreboard", scoreboard);
		commit("setRoundNumber", 1);
		commit("setActivePlayers", activePlayers);
	},
	submitPlayerBet({ commit }, { playerName, bet }) {
		commit("setPlayerBet", { playerName, bet });
	},
	submitPlayerResult({ commit }, { playerName, result }) {
		commit("setPlayerResult", { playerName, result });
	},
	submitPlayerBonus({ commit }, { playerName, bonus }) {
		commit("setPlayerBonus", { playerName, bonus });
	},
	changeRoundType({ state, commit }) {
		if (state.roundType == "Bets") {
			commit("setRoundType", "Results");
		} else {
			commit("setRoundType", "Bets");
		}
	},
	incrementRoundNumber({ state, commit }) {
		commit("setRoundNumber", state.roundNumber + 1);
	},
	updateScoreboard({ commit }, scoreboard) {
		commit("setScoreboard", scoreboard);
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};