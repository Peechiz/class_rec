var app = new Vue({
  el: '#app',
  data: {
    path: {
      nodes: [],
      edges: []
    }
  },
  created: function(){
    this.fetchPaths();
  },
  methods: {
    runSigma: function() {
      var self = this;
      var s = new sigma({
        graph: self.path,
        container: 'sigma-container',
        settings: {
          defaultNodeColor: '#ec5148',
          // defaultEdgeColor: '#ec5148'
        }
      })
    },
    fetchPaths: function() {
      var self = this;
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
        // console.log(result);
        var data = result.results[0].data.map(obj => obj.graph);
        // console.log(data);

        var nodes = data.reduce((output, graph) => {
                          graph.nodes.forEach(node => {
                            output[node.id] = {
                              id: node.id,
                              labels: node.labels,
                              properties: node.properties
                            }
                          })
                          return output;
                        }, {})
        var edges = data.reduce((output, graph) => {
          graph.relationships.forEach(rel => {
            output[rel.id] = {
              id: rel.id,
              source: rel.startNode,
              target: rel.endNode,
              color: '#ec5148'
            }
          })
          return output
        }, {})

        console.log(nodes,edges);

        Object.keys(nodes).forEach(key => {
          var label = nodes[key].properties.name || nodes[key].properties.title
          var size = nodes[key].labels[0] === "Program" ? 3 : 2;
          var color = nodes[key].labels[0] === "Person" ? "#44eeee" : '#ec5148';
          self.path.nodes.push({
            id: key,
            label: label,
            size: size,
            x: Math.random(),
            y: Math.random(),
            color: color
          })
        })

        Object.keys(edges).forEach(key => {
          self.path.edges.push(edges[key])
        })
        // console.log(self.path);
        self.runSigma();
      })
    }
  }
})
