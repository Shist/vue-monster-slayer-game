function getRandomDamage(minDamage, maxDamage) {
  return minDamage + Math.floor(Math.random() * (maxDamage - minDamage));
}

Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      minPlayerDamage: 5,
      maxPlayerDamage: 12,
      monsterHealth: 100,
      minMonsterDamage: 8,
      maxMonsterDamage: 15,
    };
  },

  computed: {
    playerHealthBarStyles() {
      return { width: `${this.playerHealth}%` };
    },

    monsterHealthBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },
  },

  methods: {
    attackMonster() {
      const damage = getRandomDamage(
        this.minPlayerDamage,
        this.maxPlayerDamage
      );

      if (this.monsterHealth - damage > 0) {
        this.monsterHealth -= damage;
      } else {
        this.monsterHealth = 0;
      }

      this.attackPlayer();
    },

    attackPlayer() {
      const damage = getRandomDamage(
        this.minPlayerDamage,
        this.maxPlayerDamage
      );

      if (this.playerHealth - damage > 0) {
        this.playerHealth -= damage;
      } else {
        this.playerHealth = 0;
      }
    },
  },
}).mount("#game");
