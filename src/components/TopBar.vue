<template>
  <div>
    <nav class="navbar navbar-light bg-white">
      <span class="navbar-brand mb-0 h1">Calendar with Elixir</span>
      <router-link :to="btnPath" class="btn btn-primary mb-0">
          {{btnValue}}
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    btnValue: String,
    btnPath: String
  }
}
</script>