function getRandomValue(minDamage, maxDamage) {
  return minDamage + Math.floor(Math.random() * (maxDamage - minDamage));
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
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
    attackMonster() {
      this.currentRound++;

      const damage = getRandomValue(5, 12);

      if (this.monsterHealth - damage > 0) {
        this.monsterHealth -= damage;
      } else {
        this.monsterHealth = 0;
      }

      this.attackPlayer();
    },

    specialAttackMonster() {
      this.currentRound++;

      const damage = getRandomValue(10, 25);

      if (this.monsterHealth - damage > 0) {
        this.monsterHealth -= damage;
      } else {
        this.monsterHealth = 0;
      }

      this.attackPlayer();
    },

    attackPlayer() {
      const damage = getRandomValue(8, 15);

      if (this.playerHealth - damage > 0) {
        this.playerHealth -= damage;
      } else {
        this.playerHealth = 0;
      }
    },

    healPlayer() {
      this.currentRound++;

      const healValue = getRandomValue(8, 20);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }

      this.attackPlayer();
    },
  },
}).mount("#game");
