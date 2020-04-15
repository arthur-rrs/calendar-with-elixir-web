<template>
  <div class="container">
    <div class="row">
      <div class="offset-4 col-md-4 col-12 mt-2">
        <h4 class="text-center">Calendário para registrar seus eventos</h4>
        <form @submit.prevent="login()">
          <div class="form-group">
            <label for="">Seu e-mail</label>
            <input type="email" class="form-control" :class="{'is-invalid': errors.email}" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="">Sua senha</label>
            <input type="password" class="form-control" :class="{'is-invalid': errors.password}" v-model="user.password">
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
      errormessage: "",
      errors: {
        email: false,
        password: false
      }
    };
  },
  methods: {
    login: function() {
      this.hasError = false;
      for (const key in this.errors) {
        this.errors[key] = false;
      }
      const url = process.env.VUE_APP_URL + "/login";
      axios.post(url, this.user)
        .then((response) => {
          localStorage.setItem('x-token', response.headers['x-token']);
          localStorage.setItem('user-id', response.data['id']);
       })
       .then(() => {
         this.$router.push({"name": "Home"})
       })
       .catch(error => {
          const status = error.response.status;
          const data = error.response.data;
          if (400 == status) {
            data.forEach(current => {
              const key = current[0];
              console.log(this.errors[key]);
              this.errors[key] = true;
            });
            this.hasError = "true";
            this.errormessage = "Verifique o campo incorreto!";
          } 
          if (401 == status) {
            this.hasError = true;
            this.errormessage = errorMessages[data];  
          }
          if (409 == status) {
            this.hasError = true;
            this.errormessage = "O Usuário já tem o email ou username cadastrado." 
          }
          if (500 == status) {
            this.hasError = true;
            this.errormessage = "Ocorreu um erro no servidor, " + data;
          }
        })
    }
  }
}
</script>
