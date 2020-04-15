<template>
  <div class="container">
    <top-bar :btnValue="'Calendário'" :btnPath="'/'"></top-bar>
    <div class="row mt-3">
      <div class="col-6 offset-3">
        <h3>Eventos de {{date_at}}</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Horario</th>
              <th>Evento</th>
              <th>Descrição</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="e of events" :key="e.id">
              <td>{{e.time_at}}</td>
              <td>{{e.name}}</td>
              <td>{{e.description}}</td>
              <td>
                <a class="text-danger" @click="deleteEvent(e.id)">excluir</a>
              </td>
            </tr>
          </tbody>
        </table>
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
  created() {
    this.update(); 
            
  },
  data() {
    return {
      date_at: "",
      events: []
    };
  },
  methods: {
    deleteEvent: function(id) {
      const url = process.env.VUE_APP_URL + "/api/event/" + id;
      axios.delete(url).then(() => {
        this.update();
      });
    },
    update: function() {
      const date = this.$route.params.date;
      const url = process.env.VUE_APP_URL +
                "/api/myevents/" + date + "/" + date;
      axios.get(url).then(response => {
        this.events = response.data;
      });
    }
  }
}
</script>