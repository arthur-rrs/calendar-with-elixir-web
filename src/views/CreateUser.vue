<template>
  <div class="container">
    <top-bar :btnValue="'Login'" :btnPath="'/login'"></top-bar>
    <div class="row">
      <div class="col-md-6 offset-md-3 col-12">
        <form @submit.prevent="submitForm()">
          <div class="form-group">
          <label for="">Um Username</label>
          <input type="text" class="form-control" :class="{'is-invalid': errors.username}" v-model="user.username">
          </div>
          <div class="form-group">
            <label for="">Seu nome</label>
            <input type="text" class="form-control" :class="{'is-invalid': errors.name}" v-model="user.name">
          </div>
          <div class="form-group">
            <label for="">Seu e-mail</label>
            <input type="email" class="form-control" :class="{'is-invalid': errors.email}" v-model="user.email">
          </div>
          <div class="form-group">
            <label for="">Sua Senha</label>
            <input type="password" class="form-control" :class="{'is-invalid': errors.password}" v-model="user.password">
          </div>
          <button class="btn btn-primary">Criar</button>
          <div class="alert alert-primary mt-3" v-show="hasSave">
            O Usuário foi registrado com sucesso. enviamos um e-mail de confirmação.
          </div>
          <div class="alert alert-danger mt-3" v-show="hasError">
            {{errormessage}}
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
      hasSave: false,
      hasError: false,
      errormessage: "",
      errors: {
        username: false,
        name: false,
        email: false,
        password: false
      }
      
    };
  },
  methods: {
    submitForm: function() {
      const url = process.env.VUE_APP_URL + '/user' 
      axios.post(url, this.user)
        .then(() => {
          this.user = {}
          this.hasError = false;
          this.hasSave = true
        }).catch((error) => {
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
          if (409 == status) {
            this.hasError = true;
            this.errormessage = "O Usuário já tem o email ou username cadastrado." 
          }
          if (500 == status) {
            this.hasError = true;
            this.errormessage = "Ocorreu um erro no servidor, " + data;
          }
        });
    } 
  }
}
</script>

<style>

</style>