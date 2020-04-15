<template>
  <div class="container">
    <top-bar :btnValue="'Calendário'" :btnPath="'/'"></top-bar>
    <div class="row">
      <div class="col-6 offset-3">
        <form @submit.prevent="submitForm()">
          <div class="form-group">
          <label for="title-event">Titulo do evento</label>
          <input id="input-name" type="text" class="form-control" v-model="eventInput.name">
          </div>
          <div class="form-group">
            <label for="">Data do evento</label>
            <input id="input-date_at" type="date" class="form-control" v-model="eventInput.date_at">
          </div>
          <div class="form-group">
            <label for="">Horario do Evento</label>
            <input id="input-time_at" type="time" class="form-control" v-model="eventInput.time_at">
          </div>
          <div class="form-group">
            <label for="">Descrição do Evento</label>
            <textarea id="input-description" cols="3" class="form-control" v-model="eventInput.description">
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
        </form>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import TopBar from '../components/TopBar'

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('x-token');

export default {
  components: {
    TopBar
  },
  data() {
    return {
      eventInput: {},
      hasSave: false
    };
  },
  methods: {
    submitForm: function() {
      const url = process.env.VUE_APP_URL + '/api/event'
      this.eventInput['user_id'] = localStorage.getItem("user-id")
      axios.post(url, this.eventInput)
        .then(() => {
          this.eventInput = {}
          this.hasSave = true
        })
    } 
  }
}
</script>

<style>

</style>