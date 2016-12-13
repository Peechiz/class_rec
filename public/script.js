var app = new Vue({
  el: '#app',
  data: {
    courses: null
  },
  created: function() {
    this.fetchCourses();
  },
  computed: {},
  methods: {
    fetchCourses: function() {
      var xhr = new XMLHttpRequest();
      var self = this;
      xhr.open('GET', '/courses');
      xhr.onload = function() {
        self.courses = JSON.parse(xhr.responseText);
        console.log(self.courses);
      }
      xhr.send();
    }
  }
})
