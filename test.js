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
			eventChannel.durations.push('aloha');
			eventChannel.unshift('asdf');
			assert.equal(eventChannel.durations.length,0);
		});
	});

	describe('#previousEvents', function() {
		it('returns events earlier in the array than arg', function() {
			var ev = {};
			eventChannel.push(ev);
			eventChannel.unshift('hi');
			
			var earlier = eventChannel.previousEvents(ev);
			assert.equal(earlier[0],'hi');
		});
	});
});