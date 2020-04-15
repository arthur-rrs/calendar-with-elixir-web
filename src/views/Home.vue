<template>
  <div class="container">
    <top-bar :btnValue="'Novo Evento'" :btnPath="'/event/new'"></top-bar>
    <div class="row mt-3">
      <div class="col-6 offset-3">
        <h1 class="mt-2">{{nameOfMonth}} - {{this.year}}</h1>
        <calendar :year="2020" v-bind:month="month" :events="events" @clickedDate="clickDate"></calendar>
        <button class="btn btn-info" @click="previousMonth()">Anterior</button>
        <button class="btn btn-info float-right" @click="nextMonth()">Proximo</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Calendar from './../components/Calendar'
import TopBar from "./../components/TopBar"

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('x-token');

export default {
  name: 'Home',
  components: {
    Calendar,
    TopBar
  },
  mounted() {
    this.month = this.currentMonth;
    this.year = this.currentYear;
    this.updateCalendar();
  },
  methods: {
    clickDate: function(ev) {
      let monthWithZero = (this.month+1) >= 10 ? "-" : "-0";
      let day = ev.toElement.innerText;
      day = day >= 10 ? ("-" + day) : ("-0" + day);
      const month = monthWithZero + (this.month + 1);
      const year = this.year;
      const date = year + month + day;
      this.$router.push({ name: 'MyEvents', params: { 'date': date }})

    },
    updateCalendar: function() {
      axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('x-token');
      let withZero = (this.month+1) >= 10 ? "-" : "-0";
      const start = this.year + withZero + (this.month+1) + "-01";
      const last = this.year + withZero + (this.month+1) + "-" + this.lastday;
      const url = process.env.VUE_APP_URL + '/api/myevents/' + start + '/' + last;
      axios.get(url).then(response => {
        this.events = response.data;
     }).catch(error => {
       const status = error.response.status;
       if (401 === status) {
         localStorage.clear();
         this.$router.push({"name": "Login"});
       }
     });
    },
    previousMonth: function() {
      this.month -= 1;
      if (this.month == -1) {
        this.month = 11;
      }
      if( this.month == 11) {
        this.year = this.year -1;
      }
      this.updateCalendar();
    },
    nextMonth: function() {
      this.month = (this.month + 1) % 12;
      if( this.month === 0 ) {
        this.year = this.year + 1;
      }  
      this.updateCalendar();
    }
  },
  data() {
    return {
      month: 0,
      year: 0,
      events: []
    };
  },
  computed: {
    nameOfMonth: function() {
      const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 
        'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      
      return months[this.month];
    },
    currentMonth: function() {
      return (new Date()).getMonth();
    },
    currentYear: function() {
      return (new Date()).getFullYear();
    },
    lastday: function() {
      return 32 - (new Date(this.year, this.month, 32)).getDate();
    }
  }
}
</script>
