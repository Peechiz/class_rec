Vue.component('edit', {
  props: ['title'],
  template: '<a :href="path">Edit</a>',
  data: function() {
    return {path: `/program/${this.title}/edit`}
  }
})

var app = new Vue({
  el: '#app',
  data: {
    programs: []
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
      $.ajax({
        method: 'DELETE',
        url: `/${title}`
      }).done( data => {
        console.log(data);
      })
    }
  }
})
