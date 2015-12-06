import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;

export default Ember.Controller.extend({
  store: Ember.inject.service(),
  eventManager: Ember.inject.service('events'),
  classNames: ['strech-tree'],

  setup: Ember.on('init', function() {
    this.get('eventManager').on('assign', this.assign.bind(this));
    this.get('eventManager').on('unassign', this.unassign.bind(this));
  }),

  assign: function(data) {
    Ember.$(".debug").empty();
    Ember.$(".debug").append('assign member:' + data.id + ' to unit: ' + data.dest + " as " + data.destType);

    var self = this;
    this.store.findRecord('member', data.id).then(function (member) {
      self.store.findRecord('unit', data.dest).then(function (unit) {
        get(unit, 'members').pushObject(member);
        get(member, 'units').pushObject(unit);
      });
    });
  },


  unassign: function(data) {
    Ember.$(".debug").empty();
    Ember.$(".debug").append('unassign member:' + data.id + ' to unit: ' + data.dest + " from " + data.destType);

    var self = this;
    this.store.findRecord('member', data.id).then(function (member) {
      self.store.findRecord('unit', data.dest).then(function (unit) {
        get(unit, 'members').removeObject(member);
        get(member, 'units').removeObject(unit);
      });
    });
  },


});
