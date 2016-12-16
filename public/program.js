Vue.component('attr-field', {
  props: ['field'],
})

var attrShow = {
  template: '<div>{{ attr }}: {{ val }}</div>',
  props: ['initAttr', 'initVal'],
  data: function(){
    return { attr: this.initAttr, val: this.initVal }
  }
}

var attrEdit = {
  template: '<div>\
    <input type="text" v-bind:value="attr" v-on:input="updateAttr($event.target.value)">\
    <input type="text" v-bind:value="val" v-on:input="updateVal($event.target.value)">\
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
    }
  }
}

var app = new Vue({
  el: '#app',
  data: {
    fields: [],
    currentView: 'attr-show'
  },
  components: {
    "attr-show": attrShow,
    "attr-edit": attrEdit
  },
  created: function() {
    this.fetchProgram();
    console.log('page loaded');
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
    submit: function(){
      this.fields.forEach(field => {
        console.log('Attr:', field.attr, ' Val:', field.val);
      })
    }
  }
})
