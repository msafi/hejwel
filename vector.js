function vector() {
  var vector = {}
  vector.x
  vector.y

  return vector
}

function point() {
  var point = {}
  point.x
  point.y

  point.addVector = function(vector) {
    var newPoint = {}
    newPoint.x = point.x + vector.x
    newPoint.y = point.y + vector.y

    return newPoint
  }

  return point
}