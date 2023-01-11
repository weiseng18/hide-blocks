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

Supports both horizontal and vertical modes, but refresh your page if you want to toggle

## Caveats

- Does not support switching timeslots
- Does not support NUSMods built-in export features, because my implementation is just a visual change

## Devs

You may run `dev.js` in your console to test functionality.
