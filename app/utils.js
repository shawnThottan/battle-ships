function getShipByName(ship) {
  switch (ship) {
    case 'battleship':
      return {
        id: 1,
        size: 4,
        count: 1
      };
    case 'cruiser':
      return {
        id: 2,
        size: 3,
        count: 2
      };
    case 'destroyer':
      return {
        id: 3,
        size: 2,
        count: 3
      };
    case 'submarine':
      return {
        id: 4,
        size: 3,
        count: 4
      };
    default:
      throw 'Ship name is not valid';
  }
}

function getShipById(id) {
  switch (id) {
    case 1:
      return 'battleship';
    case 2:
      return 'cruiser';
    case 3:
      return 'destroyer';
    case 4:
      return 'submarine';
    default:
      throw 'Ship Id is invalid';
  }
}

module.exports = { getShipByName, getShipById };
