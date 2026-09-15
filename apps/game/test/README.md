# Tests

## Logic — `logic.test.mjs`

Pure functions: level generation, the flight sim, and the telemetry codec. No
DOM, no browser.

```bash
node --test apps/game/test/logic.test.mjs
```

15 tests. Covers level validity across 200 seeds (three reachable survivors,
non-solid spawn, no sealed floor), deterministic replay, idle drift, battery,
pickup rules on and across floors, single-tap traverse and its refusal into
solid rubble, and the telemetry budget.

## Browser — `dom.test.js`

The part logic tests cannot reach: **whether a player can see and use the
controls on a phone.** Loads the published bundle inside a reproduction of the
artifact environment — the publish wrapper, inside an iframe — and drives it
with synthetic `TouchEvent`s.

13 checks: controls exist, none uses `position:fixed`, the app box matches the
visual viewport, every control is fully inside the visible area, controls do not
overlap, opacity is high enough to find, the floor button meets a 44px touch
target, and each stick produces the right axes with no cross-talk — including
both thumbs at once and the knob visually tracking the thumb.

Run it by serving the wrapper and iframe, then calling
`window.__rubbleRunTests(iframe.contentDocument, iframe.contentWindow)`.
Verified at 320x568, 402x874 and landscape 874x402.

## Why the browser suite exists

Four playtest defects in a row had the same shape: the simulation was correct
and the client said nothing about it. The worst was the last — touch controls
rendered *behind the iOS browser toolbar*, present in the DOM, invisible on the
device. **Device emulation did not reproduce it**, because emulated viewports
have no browser chrome. These checks encode that lesson: presence in the DOM is
not visibility, and visibility is not usability.
