<template>
  <div class="container">
    <div class="row">
      <div class="offset-4 col-4 mt-2">
        <h4 class="text-center">Calendário para registrar seus eventos</h4>
        <form @submit.prevent="login()">
          <div class="form-group">
            <label for="">Seu e-mail ou username</label>
            <input type="email" class="form-control" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="">Sua senha</label>
            <input type="password" class="form-control" v-model="user.password">
          </div>
          <button class="btn btn-primary">Entrar</button>
          <div class="alert alert-danger mt-2" v-show="hasError">
            {{errormessage}}
          </div>
          <hr>
          <p>ou <router-link to="/user/new">crie um usuário</router-link></p>  
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const errorMessages = {
  'invalid_credentials': 'Usuário não cadastrado no sistema',
  'invalid_password': 'A Senha está incorreta!',
  'user_not_active': 'Precisamos da confirmação de cadastro no seu email.'
}

export default {
  data() {
    return {
      user: {},
      hasError: false,
      errormessage: ""
    };
  },
  methods: {
    login: function() {
      const url = process.env.VUE_APP_URL + "/login";
      axios.post(url, this.user)
        .then((response) => {
          localStorage.setItem('x-token', response.headers['x-token']);
          localStorage.setItem('user-id', response.data['id']);
          this.$router.push("/")
        })
        .catch(error => {
          this.errormessage = errorMessages[error.response.data];
          this.hasError = true;
        })
    }
  }
}
</script>
