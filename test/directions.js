'use strict';

const test = require('tape');
const once = require('lodash.once');

test('directions', (tt) => {
  let container, directions;

  function setup(opts) {
    container = document.createElement('div');
    directions = mapboxgl.Directions(container, opts);
  }

  tt.test('initialized', t => {
    setup();
    t.ok(directions);
    t.end();
  });

  tt.test('set/get inputs', t => {
    setup();

    directions.setOrigin('Toronto');
    directions.setDestination([-77, 41]);

    directions.on('directions.origin', once((e) => {
      t.ok(directions.getOrigin().type, 'origin feature is present from get');
      t.ok(e.feature, 'origin feature is in the event object');
    }));

    directions.on('directions.destination', once((e) => {
      t.ok(directions.getDestination().type, 'destination feature is present from get');
      t.ok(e.feature, 'destination feature is in the event object');
    }));

    directions.on('directions.route', once((e) => {
      t.ok(e.route, 'routing data was passed');
    }));

    t.end();
  });

  tt.end();
});

