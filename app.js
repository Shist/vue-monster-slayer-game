function getRandomValue(minDamage, maxDamage) {
  return minDamage + Math.floor(Math.random() * (maxDamage - minDamage));
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      potionsAmount: 3,
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

    isHealingDisabled() {
      return this.playerHealth === 100 || this.potionsAmount === 0;
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

      let healthInfo = `${this.monsterHealth}`;

      this.decreaseMonsterHealth(damage);

      healthInfo += ` --> ${this.monsterHealth}`;

      this.addLogMessage("player", "attack", damage, healthInfo);

      this.attackPlayer();
    },

    specialAttackMonster() {
      this.currentRound++;

      const damage = getRandomValue(10, 25);

      let healthInfo = `${this.monsterHealth}`;

      this.decreaseMonsterHealth(damage);

      healthInfo += ` --> ${this.monsterHealth}`;

      this.addLogMessage("player", "special-attack", damage, healthInfo);

      this.attackPlayer();
    },

    attackPlayer() {
      const damage = getRandomValue(8, 15);

      let healthInfo = `${this.playerHealth}`;

      this.decreasePlayerHealth(damage);

      healthInfo += ` --> ${this.playerHealth}`;

      this.addLogMessage("monster", "attack", damage, healthInfo);
    },

    healPlayer() {
      this.currentRound++;

      this.potionsAmount--;

      const healValue = getRandomValue(8, 20);

      let healthInfo = `${this.playerHealth}`;

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }

      healthInfo += ` --> ${this.playerHealth}`;

      this.addLogMessage("player", "heal", healValue, healthInfo);

      this.attackPlayer();
    },

    surrender() {
      this.winner = "monster";
    },

    startGame() {
      this.playerHealth = 100;
      this.potionsAmount = 3;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logsList = [];
      this.currLogId = 0;
    },

    addLogMessage(actionBy, actionType, actionValue, healthInfo) {
      this.logsList.unshift({
        id: this.currLogId++,
        actionBy,
        actionType,
        actionValue,
        healthInfo,
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
