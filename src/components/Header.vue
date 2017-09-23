<template>
  <section class="hero is-info is-bold is-small">
    <div class="hero-head">
      <header class="nav">
        <div class="container">
          <div class="nav-right nav-menu">
            <div class="nav-item">
              <button @click="addTask" class="button is-info is-inverted">New Task</button>
            </div>
          </div>
        </div>
      </header>
    </div>

    <div class="hero-body has-text-centered">
      <h1 class="title">Demo ToDo</h1>
      <h2 class="subtitle">Kongkow IT Meetup #2</h2>
    </div>

    <div class="hero-foot">
      <div class="tabs is-centered is-medium is-boxed">
        <ul>
          <router-link tag="li" :to="{ name: 'List' }">
            <a>Active &nbsp;<span class="tag is-rounded is-warning">{{ activeCount }}</span> </a>
          </router-link>
          <router-link tag="li" :to="{ name: 'Complete' }">
            <a> Complete &nbsp;<span class="tag is-rounded is-warning">{{ completeCount }}</span> </a>
          </router-link>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'header',

  computed: {
    activeCount () {
      return this.$store.getters['task/active'].length
    },

    completeCount () {
      return this.$store.getters['task/complete'].length
    },
  },

  methods: {
    addTask () {
      this.$store.dispatch('task/newTask')
    }
  }
}
</script>

