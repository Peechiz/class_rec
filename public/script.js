var app = new Vue({
  el: '#app',
  data: {
    students: null
  },
  created: function() {
    this.fetchStudents();
  },
  computed: {},
  methods: {
    fetchStudents: function() {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('GET', '/students');
      xhr.onload = function() {
        self.students = JSON.parse(xhr.responseText);
        console.log(self.students);
      }
      xhr.send();
    }
  }
})
