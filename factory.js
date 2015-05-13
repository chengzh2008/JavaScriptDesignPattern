'use strict';

// a constructor for defining new cars
function Car(options) {
    this.doors = options.doors || 4;
    this.state = options.state || 'brand new';
    this.colors = options.color || 'silver';
}

Car.prototype.drive = 'automatic';
Car.prototype.breakDown = 'abs';

// a constructor for defining new trucks
function Truck(options) {
    this.state = options.state || 'used';
    this.wheelSize = options.wheelSize || 'large';
    this.color = options.color || 'blue';
}



// define a skeleton vehicle factory
function VehicleFactory() {}

VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createVehicle = function (options) {
    switch(options.vehicleType) {
        case 'car':
            this.vehicleClass = Car;
            break;
        case 'truck':
            this.vehicleClass = Truck;
            break;
    }

    return new this.vehicleClass(options);
};

// create an object of carFactory
var carFactory = new VehicleFactory();

var car = carFactory.createVehicle({
    vehicleType: 'car',
    color: 'yellow',
    doors: 6
});

console.log(car instanceof Car);
console.log(car);


var movingTruck = carFactory.createVehicle({
    vehicleType: 'truck',
    state: 'like new',
    color: 'red',
    wheelSize: 'small'
});

console.log(movingTruck instanceof Truck);
console.log(movingTruck);



// subclass VehicleFactory to create a factory class that builds trucks
function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
    state: 'omg.. so bad',
    color: 'pink',
    wheelSize: 'so big'
});

console.log(myBigTruck instanceof Truck);
console.log(myBigTruck);



/////////////////////////////////
//    Abstrct Factories        //
/////////////////////////////////

var abstractVehicleFactory = (function () {
    // storage for our vehicle types
    var types = {};
    return {
        getVehicle: function (type, customizations) {
            var Vehicle = types[type];
            return Vehicle ? new Vehicle(customizations) : null;
        },

        registerVehicle: function (type, Vehicle) {
            // get Vehicle constructor
            var proto = Vehicle.prototype;
            // only register classes that fulfill the vehicle contract
            if (proto.drive && proto.breakDown) {
                // add Vehicle to its type collection
                types[type] = Vehicle;
            }
            return abstractVehicleFactory;
        }
    };
})();

// usage:
abstractVehicleFactory.registerVehicle('car', Car);
abstractVehicleFactory.registerVehicle('truck', Truck);

// instantiate a new car based on the abstract vehicle type
var car = abstractVehicleFactory.getVehicle('car', {
    color: 'lime green',
    state: 'like new'
});

// instantiate a new truck in a similar manner
var truck = abstractVehicleFactory.getVehicle('truck', {
    wheelSize: 'medium',
    color: 'neon yellow'
});

console.log(car);
console.log(Car.prototype);
console.log(car.__proto__);