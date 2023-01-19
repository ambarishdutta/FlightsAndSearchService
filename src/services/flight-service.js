const { FlightRepository, AirplaneRepository } = require('../repository/index');
const { compareTime } = require('../utils/helper');

class FlightService {

    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }

    async createFlight(data) {
        try {
            if(!compareTime(data.arrivalTime, data.departureTime)) {
                throw {error: 'Arrival time cannot be less than departure time'};
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({...data, totalSeats:airplane.capacity});
            return flight
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
    /*
        data = {
            flightNumber,
            airplaneId,
            departureAirportId,
            arrivalAirportId,
            arrivalTime,
            departureTime,
            price,
            totalSeats -> fetch from airplane
        }
    */
    async getAllFlightData(data) {
        try {
            const flights = await this.flightRepository.getAllFlights(data);
            return flights;
        } catch (error) {
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
    
}

module.exports = FlightService;