Vue.component('edit', {
  props: ['title'],
  template: '<a :href="path">Edit</a>',
  computed: {
    path: function() {
      return `/program/${this.title}/edit`
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    programs: [],
    addProgram: false,
    newProgram: ''
  },
  created: function() {
    this.fetchPrograms();
  },
  methods: {
    fetchPrograms: function(){
      $.get('/api/program', data=>{
        this.programs = data;
      })
    },
    del: function(title){
      var self = this;
      $.ajax({
        method: 'DELETE',
        url: `/api/program/${title}`
      }).done( data => {
        console.log(data);
        self.refresh();
      })
    },
    addNew: function() {
      this.addProgram = !this.addProgram;
    },
    submitNew: function() {
      var self = this;
      $.ajax({
        method: 'POST',
        url: '/api/program',
        data: { title: self.newProgram }
      }).done( data => {
        self.refresh();
        console.log(data);
      })
    },
    refresh: function() {
      this.addProgram = false;
      this.newProgram = '';
      this.fetchPrograms();
    }
  }
})
