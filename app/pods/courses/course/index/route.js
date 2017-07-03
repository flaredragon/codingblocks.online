/**
 * Created by abhishek on 27/06/17.
 */
'use strict';

import Ember from 'ember';

export default Ember.Route.extend({
  currentUser: Ember.inject.service(),
  model () {
    return this.modelFor('courses.course')
  },
  setupController (controller, model) {
    const userEnrollled = model.get('runs').objectAt(0).get('users').findBy('id', this.get('currentUser.user').id );
    controller.set('isEnrolled', userEnrollled != null);
    controller.set("courseRuns", model.get('runs'));
    controller.set("course", model)
  }
});