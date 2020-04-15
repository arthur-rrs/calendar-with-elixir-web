<template>
  <div class="container">
    <top-bar :btnValue="'Calendário'" :btnPath="'/'"></top-bar>
    <div class="row">
      <div class="col-md-6 offset-md-3 col-12">
        <form @submit.prevent="submitForm()">
          <div class="form-group">
          <label for="title-event">Titulo do evento</label>
          <input :class="{'is-invalid': errors.name}" id="input-name" type="text" class="form-control" v-model="eventInput.name">
          </div>
          <div class="form-group">
            <label for="">Data do evento</label>
            <input :class="{'is-invalid': errors.date_at}" id="input-date_at" type="date" class="form-control" v-model="eventInput.date_at">
          </div>
          <div class="form-group">
            <label for="">Horario do Evento</label>
            <input :class="{'is-invalid': errors.time_at}" id="input-time_at" type="time" class="form-control" v-model="eventInput.time_at">
          </div>
          <div class="form-group">
            <label for="">Descrição do Evento</label>
            <textarea :class="{'is-invalid': errors.description}" id="input-description" cols="3" class="form-control" v-model="eventInput.description">
            </textarea>
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" value="1">
            <label for="" class="form-check-label">Quero ser notificado desse evento por email</label>
          </div>
          <button class="btn btn-primary">Agendar</button>
          <div class="alert alert-primary mt-3" v-show="hasSave">
            O Evento foi registrado no calendario com sucesso.
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
      eventInput: {},
      hasSave: false,
      hasError: false,
      errormessage: "",
      errors: {
        "name": false,
        "date_at": false,
        "time_at": false,
        "description": false
      }
    };
  },
  methods: {
    submitForm: function() {
      this.hasError = false;
      for (const key in this.errors) {
        this.errors[key] = false;
      }
      axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('x-token');
      const url = process.env.VUE_APP_URL + '/api/event'
      this.eventInput['user_id'] = localStorage.getItem("user-id")
      axios.post(url, this.eventInput)
        .then(() => {
          this.eventInput = {}
          this.hasSave = true
        }).catch(error => {
          const status = error.response.status;
          const data = error.response.data;
          if (400 == status) {
            data.forEach(current => {
              const key = current[0];
              this.errors[key] = true;
            });
            this.hasError = "true";
            this.errormessage = "Verifique o campo incorreto!";
          } 
          if (401 === status) {
            localStorage.clear();
            this.$router.push({"name": "Login"});
          }
          if (500 <= status) {
            this.hasError = true;
            this.errormessage = "Ocorreu um erro no servidor, " + data;
          }
     })
    } 
  }
}
</script>

<style>

</style>