var EventChannel = require('./index.js');
var assert = require('assert');

describe('EventChannel', function() {

	it('exists', function() {
		assert.equal(typeof EventChannel,'function');
	});

	var eventChannel;

	beforeEach(function() {
		eventChannel = new EventChannel();
	})

	describe('#unshift', function() {
		it('clears EventChannel.durations', function() {
			eventChannel.eventDurationsArray.push('aloha');
			eventChannel.unshift('asdf');
			assert.equal(eventChannel.eventDurationsArray.length,1); //otherwise would be 2
		});
	});





	describe('#getClearDurations', function() {
		it('returns an array', function() {
			eventChannel.push({
				start: 1,
				end: 2
			});
			eventChannel.push({
				start:0,
				end:1
			});
			var durations = eventChannel.getClearDurations(eventChannel[1]);
			assert.equal(typeof durations.length,'number');
		});

		it('returns the entire first duration', function() {
			var ev = {
				start: 0,
				end: 1
			}
			eventChannel.unshift(ev);
			var durations = eventChannel.getClearDurations(ev);
			assert.equal(durations.length,1);
			assert.equal(durations[0].start,0);
		});

		it('returns the entire second duration if they don\'t overlap', function() {
			var ev = {
				start: 0,
				end: 1
			};
			eventChannel.unshift(ev);
			eventChannel.unshift({
				start: 20,
				end: 23
			});
			var durations = eventChannel.getClearDurations(ev);
			assert.equal(durations.length,1);
			assert.equal(durations[0].start,0);
		});

		it('returns an empty second duration if it is completely overlapped', function() {
			var ev = {
				start: 2,
				end: 1
			};
			eventChannel.unshift(ev);
			eventChannel.unshift({
				start: 0,
				end: 10
			});
			var durations = eventChannel.getClearDurations(ev);
			assert.equal(durations.length,0);
		});

		it('returns a shortened duration if the end of the event is clipped', function() {
			var ev = {
				start: 0,
				end: 10
			};
			eventChannel.unshift(ev);
			eventChannel.unshift({
				start: 5,
				end: 20
			});
			var durations = eventChannel.getClearDurations(ev);
			assert.equal(durations.length,1);
			assert.equal(durations[0].end,5);
		});

		it('returns a shortened duration if the beginning of the event is clipped', function() {
			var ev = {
				start: 10,
				end: 30
			};
			eventChannel.unshift(ev);
			eventChannel.unshift({
				start: 5,
				end: 20
			});
			var durations = eventChannel.getClearDurations(ev);
			assert.equal(durations.length,1);
			assert.equal(durations[0].start,20);
		});

		it('returns two durations when the overriding event is in the middle', function() {
			var ev = {
				start: 0,
				end: 30
			};
			eventChannel.unshift(ev);
			eventChannel.unshift({
				start: 5,
				end: 20
			});
			var durations = eventChannel.getClearDurations(ev);
			assert.equal(durations.length,2);
			assert.equal(durations[0].start,0);
			assert.equal(durations[0].end,5);
			assert.equal(durations[1].start,20);
			assert.equal(durations[1].end,30);
		});

		it('handles three events', function() {
			var ev = {
				start: 0,
				end: 30,
				which: 'a'
			};
			eventChannel.unshift(ev);
			var ev2 = {
				start: 5,
				end: 20,
				which: 'b'
			};
			eventChannel.unshift(ev2);
			var durations = eventChannel.getClearDurations(ev);
			eventChannel.unshift({
				start: 1,
				end: 3,
				which: 'c'
			});
			var durations = eventChannel.getClearDurations(ev);
			assert.equal(durations.length,3);
			assert.equal(durations[0].start,0);
			assert.equal(durations[0].end,1);
			assert.equal(durations[1].start,3);
			assert.equal(durations[1].end,5);
			assert.equal(durations[2].start,20);
			assert.equal(durations[2].end,30);
		});

	})
});