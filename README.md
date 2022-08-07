# Hide NUSMods timetable blocks

## Usage

1. Edit the `hides` variable in `index.js`. These blocks will be hidden. It should contain strings of the format `moduleCode-classType`.

```js
const hides = [
  // e.g.
  'CS2100-LEC',
  'CS2100-REC',
  'CS2100-TUT',
]
```

2. Create new script in Tampermonkey
3. Replace script contents with `index.js` contents

## Caveats

- Does not support switching timeslots

## Devs

You may run `dev.js` in your console to test functionality.
