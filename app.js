function getRandomValue(minDamage, maxDamage) {
  return minDamage + Math.floor(Math.random() * (maxDamage - minDamage));
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logsList: [],
      currLogId: 0,
    };
  },

  computed: {
    playerHealthBarStyles() {
      return { width: `${this.playerHealth}%` };
    },

    monsterHealthBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },

    isSpecialAttackDisabled() {
      return this.currentRound % 3 !== 0;
    },
  },

  methods: {
    decreasePlayerHealth(damage) {
      if (this.playerHealth - damage > 0) {
        this.playerHealth -= damage;
      } else {
        this.playerHealth = 0;
      }
    },

    decreaseMonsterHealth(damage) {
      if (this.monsterHealth - damage > 0) {
        this.monsterHealth -= damage;
      } else {
        this.monsterHealth = 0;
      }
    },

    attackMonster() {
      this.currentRound++;

      const damage = getRandomValue(5, 12);

      this.decreaseMonsterHealth(damage);

      this.addLogMessage("player", "attack", damage);

      this.attackPlayer();
    },

    specialAttackMonster() {
      this.currentRound++;

      const damage = getRandomValue(10, 25);

      this.decreaseMonsterHealth(damage);

      this.addLogMessage("player", "special-attack", damage);

      this.attackPlayer();
    },

    attackPlayer() {
      const damage = getRandomValue(8, 15);

      this.addLogMessage("monster", "attack", damage);

      this.decreasePlayerHealth(damage);
    },

    healPlayer() {
      this.currentRound++;

      const healValue = getRandomValue(8, 20);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }

      this.addLogMessage("player", "heal", healValue);

      this.attackPlayer();
    },

    surrender() {
      this.winner = "monster";
    },

    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logsList = [];
      this.currLogId = 0;
    },

    addLogMessage(actionBy, actionType, actionValue) {
      this.logsList.unshift({
        id: this.currLogId++,
        actionBy,
        actionType,
        actionValue,
      });
    },
  },

  watch: {
    currentRound(newRound) {
      if (newRound) {
        this.logsList.unshift({
          id: this.currLogId++,
          isRoundLog: true,
          message: `Round #${newRound}`,
        });
      }
    },

    playerHealth(playerHealthValue) {
      if (this.monsterHealth === 0 && playerHealthValue === 0) {
        this.winner = "draw";
      } else if (playerHealthValue === 0) {
        this.winner = "monster";
      }
    },

    monsterHealth(monsterHealthValue) {
      if (monsterHealthValue === 0 && this.playerHealth === 0) {
        this.winner = "draw";
      } else if (monsterHealthValue === 0) {
        this.winner = "player";
      }
    },

    winner(newWinner) {
      if (newWinner) {
        this.logsList.unshift({
          id: this.currLogId++,
          isOutcomeLog: true,
          message:
            newWinner === "draw"
              ? "The outcome is a draw!"
              : `The ${newWinner} wins!`,
        });
      }
    },
  },
}).mount("#game");
