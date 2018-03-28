<template>
<div class="modal fade" id="askModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Ask a Question</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Title" v-model="title">
          <textarea name="user-message" id="user-message" class="form-control" cols="20" rows="10" placeholder="Description . . ." v-model="description"></textarea>
        </div>
      </form>
      </div>
      <div class="modal-footer">
      <button type="button" class="btn btn-primary mr-auto" data-dismiss="modal">
        Cancel
      </button>
      <button type="button" class="btn btn-success" data-dismiss="modal" @click="ask()">
        Ask now !
      </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      title: ``,
      description: ``
    }
  },
  methods: {
    ask: function () {
      let question = {
        title: this.title,
        description: this.description
      }
      this.$store.dispatch('askQuestion', question)
        .then(() => {
          this.title = ``
          this.description = ``
        })
    }
  }
}
</script>

<style>

</style>
