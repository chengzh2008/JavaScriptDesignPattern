'use strict';

var carManager = {
    // request info
    requestInfo: function (model, id) {
        console.log('the info for ' + model + ' with id' + ' is foo');
    },

    // purchase the car
    buyVehicle: function (model, id) {
        console.log('you have purchased the item ' + id + ', a ' + model);
    },

    // arrange a checkup
    arrangeTestDrive: function (model, id) {
        console.log('hope you feel good about the item ' + id + ', a ' + model);
    }

};


carManager.execute = function (name) {
    return carManager[name] && carManager[name].apply(carManager, [].slice.call(arguments, 1));
};

carManager.execute('arrangeTestDrive', 'Ferrari', '143234');
carManager.execute('requestInfo', 'Ford', '35153');
carManager.execute('requestInfo', 'Toyota', '565653');
carManager.execute('buyVehicle', 'Volvo', '899897');
