const shifts = [
  { id: 'shift-1', range: '08.00 - 09.30' },
  { id: 'shift-2', range: '09.45 - 11.15' },
  { id: 'shift-3', range: '13.00 - 14.30' },
  { id: 'shift-4', range: '15.15 - 16.45' },
]

function shiftIds () {
  return shifts.map(shift => shift.id)
}

function isValidShift (shiftId) {
  return shiftIds().indexOf(shiftId) !== -1;
}

module.exports = {
  isValidShift,
}
