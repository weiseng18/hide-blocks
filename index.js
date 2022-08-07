// ==UserScript==
// @name         Hide certain blocks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://nusmods.com/timetable/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const hides = [
    'CS2100-LEC',
    'CS2100-REC',
    'CS2100-TUT',
    'CS2040S-LEC',
    'CS2040S-TUT',
  ]

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

  function mergeDay(x) {
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

  function main() {
    // hide some blocks
    toggleVisbility()
    // collapse multiple rows into one
    for (let i=0; i<=4; i++)
      mergeDay(i)
  }

  window.onload = function() {
    main()
  }
})();

