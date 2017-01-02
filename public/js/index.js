// sigma
//   .parsers
//   .json(
//     'myGraph.json', {
//       container: 'sigma-container'
//     },
//     function(sig) {
//       console.log(sig);
//     }
//   );

var app = new Vue({
  el: '#app',
  data: {},
  created: function(){
    this.fetchPaths();
  },
  methods: {
    fetchPaths: function() {
      $.ajax({
        method: 'POST',
        url: 'http://localhost:7474/db/data/transaction/commit',
        contentType: "application/json",
        data: JSON.stringify({
          statements: [{
            statement: "MATCH path = (x)-[y]->(z) RETURN path",
            params: {},
            resultDataContents: ["graph"]
          }]
        })
      }).done( result => {
        console.log(result);
      })
    }
  }
})
