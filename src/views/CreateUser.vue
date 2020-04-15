<template>
  <div class="container">
    <top-bar :btnValue="'Login'" :btnPath="'/login'"></top-bar>
    <div class="row">
      <div class="col-6 offset-3">
        <form @submit.prevent="submitForm()">
          <div class="form-group">
          <label for="">Um Username</label>
          <input type="text" class="form-control" v-model="user.username">
          </div>
          <div class="form-group">
            <label for="">Seu nome</label>
            <input type="text" class="form-control" v-model="user.name">
          </div>
          <div class="form-group">
            <label for="">Seu e-mail</label>
            <input type="email" class="form-control" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="">Sua Senha</label>
            <input type="password" class="form-control" v-model="user.password">
          </div>
          <button class="btn btn-primary">Criar</button>
          <div class="alert alert-primary mt-3" v-show="hasSave">
            O Usuário foi registrado com sucesso. enviamos um e-mail de confirmação.
          </div>
        </form>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import TopBar from '../components/TopBar'

export default {
  components: {
    TopBar
  },
  data() {
    return {
      user: {},
      hasSave: false
    };
  },
  methods: {
    submitForm: function() {
      const url = process.env.VUE_APP_URL + '/api/user' 
      axios.post(url, this.user)
        .then(() => {
          this.user = {}
          this.hasSave = true
        })
    } 
  }
}
</script>

<style>

</style>