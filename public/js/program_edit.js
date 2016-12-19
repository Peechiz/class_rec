Vue.component('attr-field', {
  props: ['field'],
})

var attrShow = {
  template: '<div>{{ attr || "null" }}: {{ val || "null" }}</div>',
  props: ['initAttr', 'initVal'],
  data: function(){
    return { attr: this.initAttr, val: this.initVal }
  }
}

var attrEdit = {
  template: '<div>\
    <input type="text" v-bind:value="attr" v-on:input="updateAttr($event.target.value)">\
    <input type="text" v-bind:value="val" v-on:input="updateVal($event.target.value)">\
    <button @click="deleteRow">Remove</button>\
    </div>',
  props: ['initAttr','initVal', 'myIndex'],
  data: function(){
    return { attr: this.initAttr, val: this.initVal }
  },
  methods: {
    updateAttr: function(attr) {
      this.attr = attr;
      this.$emit('new-attr', {attr:this.attr, index: this.myIndex})
    },
    updateVal: function(val) {
      this.val = val;
      this.$emit('new-val', {val:this.val , index: this.myIndex})
    },
    deleteRow: function() {
      this.$emit('delete-row', this.myIndex)
    }
  }
}

var app = new Vue({
  el: '#app',
  data: {
    fields: [],
    currentView: 'attr-show',
    title: null
  },
  components: {
    "attr-show": attrShow,
    "attr-edit": attrEdit
  },
  created: function() {
    this.fetchProgram();
  },
  computed: {
    toggleLabel: function() {
      return this.currentView == 'attr-show' ? 'Edit' : 'Show'
    }
  },
  methods: {
    fetchProgram: function(){
      var self = this;
      var path = window.location.pathname.replace(/\/edit/,'').replace(/program\//, 'api/program/');
      $.get(path, function(data){
        console.log(data);
        Object.keys(data.properties).forEach(key => {
          self.fields.push({
            attr: key,
            val: data.properties[key],
            og: true // "original", for use with removeField() method
          })
        })
        if (data.properties.title){
          self.title = data.properties.title
        }
      })
    },
    updateAttr: function(data){
      this.fields[data.index].attr = data.attr;
    },
    updateVal: function(data){
      this.fields[data.index].val = data.val;
    },
    toggle: function(){
      this.currentView = this.currentView == 'attr-show' ? 'attr-edit' : 'attr-show'
    },
    addField: function() {
      this.fields.push({attr: '', val: '', og: false});
      if (this.currentView !== 'attr-edit') this.toggle();
    },
    removeField:  function(index){
      // remove from this.fields by index
      var self = this;
      if (this.fields[index].og === false){
        this.fields.splice(index, 1);
        this.toggle();
      } else {

        var path = window.location.pathname
                  .replace(/\/edit/,'')
                  .replace(/program\//, 'api/program/')
                  + `/${this.fields[index].attr}`

        $.ajax({
          method: 'DELETE',
          url: path,
          success: function(data) {
            console.log(data);
            self.fields.splice(index, 1)
            self.toggle();
          }
        })
      }
    },
    submit: function(){
      var payload = {};
      var self = this;
      this.fields.forEach(field => {
        console.log('Attr:', field.attr, ' Val:', field.val);
        payload[field.attr] = field.val;
      })
      console.log(payload);
      var path = window.location.pathname.replace(/\/edit/,'').replace(/program\//, 'api/program/');
      $.post(path, {data: this.fields}, function(result) {
        console.log(result);
        if (self.currentView != 'attr-show') {
          self.toggle();
        }
      })
    }
  }
})
