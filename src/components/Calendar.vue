<template>
  <div>
    <table>
      <tbody>
        <table class="table">
          <thead>
            <tr>
              <th>Domingo</th>
              <th>Segunda-Feira</th>
              <th>Terça-Feira</th>
              <th>Quarta-Feira</th>
              <th>Quinta-Feira</th>
              <th>Sexta-Feira</th>
              <th>Sábado</th>
            </tr>
          </thead>
          <tbody ref="calendar">
          </tbody>
        </table>
      </tbody>
    </table>
  </div>  
</template>

<script>
export default {
  created() {
    this.firstday = (new Date(this.year, this.month, 1)).getDay();
    this.lastday = 32 - (new Date(this.year, this.month, 32)).getDate(); 
  },
  mounted() {
      this.drawCalendar();
  },
  data() {
    return {
      lastday: 0,
      firstday: 0,
    };
  },
  watch: {
    month: function() {
      this.firstday = (new Date(this.year, this.month, 1)).getDay();
      this.lastday = 32 - (new Date(this.year, this.month, 32)).getDate(); 
    },
    events: function() {
      this.drawCalendar();
    }
  },
  props: {
    month: Number,
    year: Number,
    events: Array
  },
  methods: {
    hasEventDay: function(day) {
      let hasDay = false;
      this.events.forEach(event => {
        const current = new Date(event.date_at);
        const dayCurrent = (current.getDate() + 1)
        if (day == dayCurrent) hasDay = true; 
      });
      
      return hasDay;      
    },
    drawCalendar: function() {
      let $calendar = this.$refs.calendar;
      while($calendar.firstChild)
        $calendar.removeChild($calendar.firstChild);
      let cursor = 0;
      let dayCurrent = 1;
      for (let row = 0; row < 6; row++) {
        const $tr = document.createElement('tr');
        for (let col = 0; col < 7; col++) {
          let text = ' ';
          const $td = document.createElement('td');
          if (cursor >= this.firstday && cursor < (this.lastday+this.firstday) ) {
            text = dayCurrent;
            if (this.hasEventDay(dayCurrent)) {
              //$td.style.backgroundColor = "#f0f0f0";
              $td.classList += "bg-primary";
              $td.addEventListener('click', ev => {
                this.$emit('clickedDate', ev);
              });
            }
            dayCurrent++;
          }
          const $textNode = document.createTextNode(text);
          $td.appendChild($textNode);
          $tr.appendChild($td);
          cursor++;
        }
        $calendar.appendChild($tr);
      }
    }
  }
}
</script>