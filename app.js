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

  methods: {
    attackMonster() {
      this.monsterHealth -= getRandomDamage(
        this.minPlayerDamage,
        this.maxPlayerDamage
      );

      this.attackPlayer();
    },

    attackPlayer() {
      this.playerHealth -= getRandomDamage(
        this.minMonsterDamage,
        this.maxMonsterDamage
      );
    },
  },
}).mount("#game");
