/**
 * This script does not support switching between timeslots.
 * As such, make your timetable changes before using this script.
 *
 * dev notes
 * NUSMods currently uses:
 * - margins to place the timetable blocks within each row
 * - separate rows in the case of clashing mods
 * - separate rows for showing the possible timeslots for a mod
 */

const hides = [
  'CS2040-LEC',
  'CS2040-TUT',
  'CS3230-LEC',
]

let isVertical;

/**
 * Toggle visibility of items in hides array.
 */
function toggleVisbility() {
  Array.prototype.slice.call(document.getElementsByClassName("timetable-cell"))
    .filter(isHide)
    .forEach(x => {
      x.style.visibility = "hidden"
    });
}

/**
 * Returns true if the element is something to be hidden.
 */
function isHide(e) {
  const classNames = e.className.split(" ")
  // some class name
  return classNames.some((c) =>
    // starts with some hide class name
    hides.some((h) => c.startsWith(h))
  )
}

/**
 * Gets element containing a day of the week's timetable.
 * 0 <= x <= 4
 */
function getDay(x) {
  return document.getElementsByClassName("timetable")[0].children[1].children[x].children[1]
}

function mergeDayHorz(x) {
  const dayTimetable = getDay(x)
  const width = window.getComputedStyle(dayTimetable).width
  dayTimetable.style.position = "relative"

  // Overlay the DIVs
  const rows = Array.prototype.slice.call(dayTimetable.children).slice(1)
  let newHeight = 0
  rows.forEach((c) => {
    c.style.position = "absolute"
    c.style.width = width
    c.style.top = 0
    c.style.left = 0

    const thisHeight = parseInt(
      window.getComputedStyle(c).height.slice(0, -2))
    newHeight = Math.max(newHeight, thisHeight)
  })

  // Set parent DIV to max height so far
  dayTimetable.style.minHeight = newHeight + "px"

  // Set children of each DIV to max height
  rows.forEach((c) => {
    c.children.forEach((block) => {
      block.style.minHeight = newHeight + "px"
    })
  })
}

function mergeDayVert(x) {
  const dayTimetable = getDay(x)
  const height = window.getComputedStyle(dayTimetable).height
  dayTimetable.style.position = "relative"

  // For vertical mode, the width of 5 days is fixed
  const all = document.getElementsByClassName("timetable")[0].children[1];
  const width = window.getComputedStyle(all).width.slice(0, -2);

  // Overlay the DIVs
  const cols = Array.prototype.slice.call(dayTimetable.children).slice(1)

  cols.forEach((c) => {
    c.style.position = "absolute"
    c.style.height = height
    c.style.top = 0
    c.style.left = 0
  })

  // Set parent DIV to 1/5 of the total width
  dayTimetable.style.minWidth = width/5 + "px"

  // Set children of each DIV to max width
  cols.forEach((c) => {
    c.children.forEach((block) => {
      block.style.minWidth = width/5 + "px"
    })
  })
}

/**
 * Check if horizontal or vertical mode
 */
function checkMode() {
  isVertical = document.getElementsByClassName("main-content")[0]
  .children[0].classList.contains("verticalMode");
}

function main() {
  // check horizontal or vertical mode
  checkMode()
  // hide some blocks
  toggleVisbility()
  // collapse multiple rows into one
  for (let i=0; i<=4; i++) {
    if (isVertical)
      mergeDayVert(i)
    else
      mergeDayHorz(i)
  }
}

main()
