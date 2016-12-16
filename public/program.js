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
      var path = window.location.pathname.replace(/\/edit/,'');
      $.get(path, function(data){
        console.log(data);
        Object.keys(data.properties).forEach(key => {
          self.fields.push({attr: key, val: data.properties[key]})
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
      this.fields.push({attr: '', val: ''});
      if (this.currentView !== 'attr-edit') this.toggle();
    },
    removeField:  function(index){
      // remove from this.fields by index
      this.fields.splice(index, 1);
    },
    submit: function(){
      this.fields.forEach(field => {
        console.log('Attr:', field.attr, ' Val:', field.val);
      })
      var path = window.location.pathname.replace(/\/edit/,'');
      $.post(path, {data: this.fields}, function(result) {
        console.log(result);
      })
    }
  }
})
