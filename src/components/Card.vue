<template>
  <div class="card">
    <div class="card-content" :class="{ 'no-padding': task.editable }">
      <textarea v-if="task.editable" class="textarea" v-model="content"></textarea>
      <p v-else class="subtitle">{{ task.content }}</p>
    </div>

    <footer class="card-footer">
      <template v-if="task.editable">
        <a @click="updateCard" class="card-footer-item">Save</a>
      </template>
      <template v-else-if="task.complete">
        <a @click="redoTask" class="card-footer-item">Redo</a>
      </template>
      <template v-else>
        <a @click="editCard" class="card-footer-item">Edit</a>
        <a @click="clearTask" class="card-footer-item">Done</a>
      </template>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'card',

  props: ['task'],

  data () {
    return {
      content: ''
    }
  },

  methods: {
    editCard () {
      this.$store.commit('task/enableEdit', { id: this.task.id })
      this.content = this.task.content
    },

    updateCard () {
      var task = this.task
      task.content = this.content
      this.$store.dispatch('task/saveTask', task)
      this.$store.commit('task/disableEdit', { id: this.task.id })
      this.$store.commit('task/updateContent', { id: this.task.id, content: this.content })
    },

    clearTask () {
      this.$store.commit('task/setComplete', { id: this.task.id })
    },

    redoTask () {
      this.$store.commit('task/setIncomplete', { id: this.task.id })
    }
  }
}
</script>

<style scoped>
.no-padding {
  padding: 0;
}

a {
  color: #3273dc;
}
</style>
