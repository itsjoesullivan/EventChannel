/** An object for describing overlapping events, potentially with durations, monophonically.

*/
var EventChannel = module.exports = function() {
  //Array to hold equivalent
  this.durations = [];
};

EventChannel.prototype = new Array();


var unshift = EventChannel.prototype.unshift;
EventChannel.prototype.unshift = function() {
  this.durations = [];
  unshift.apply(this,arguments);
};

EventChannel.prototype.getClearDurations = function(ev) {

  var index = this.indexOf(ev);

  if(index < 0) {
    throw "Event not present";
  }

  //Is stored
  if(this.durations[index]) {
    return this.durations[index];
  }

  var durations = this.durations[index] = [],
    previousEvents = this.previousEvents(ev);

  //If we're just getting started...
  if(index === 0) {
    return durations.[0] = [{
      start: this.start,
      end: this.end
    }];
  }

  


};