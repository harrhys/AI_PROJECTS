import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.interviewCounter.onCreated(function() {
  this.count = new ReactiveVar(0);
});

Template.interviewCounter.helpers({
  count() {
    return Template.instance().count.get();
  }
});

Template.interviewCounter.events({
  'click #incBtn'(event, instance) {
    instance.count.set(instance.count.get() + 1);
  }
});
