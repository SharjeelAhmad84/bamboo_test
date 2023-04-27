import {INTEGER, QueryInterface} from 'sequelize';
import {DataType} from "sequelize-typescript";

export default {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I don't want to configure the seating for every show
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  up: async (queryInterface: QueryInterface): Promise<void> => {

    try{

      let createTimeSlotsTable = await queryInterface.createTable('TimeSlots', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true
        },
        Slot: {
          type: DataType.TIME
        }
      });
      let createShowRoomsTable = await queryInterface.createTable('ShowRooms', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true
        },
        name: {
          type: DataType.STRING
        },
        seatingCapacity: {
          type: DataType.INTEGER
        }
      });


      let showAdministration = await queryInterface.createTable('ShowAdministration', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true
        },
        movieId: {
          type: DataType.STRING,
          references: {
            model: 'Movies',
            key: 'id'
          }
        },
        movieTime: {
          type: DataType.TIME,
          references: {
            model: 'TimeSlots',
            key: 'id'
          }
        },
        showRoomID: {
          type: DataType.INTEGER,
          references: {
            model: 'ShowRooms',
            key: 'id'
          }
        },
        movieTicketPrice : {
          type : DataType.INTEGER
        }
      });

      let createMoviesTable = await queryInterface.createTable('Movies', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true
        },
        name: {
          type: DataType.STRING
        }
      });

      let createSeatsCategory = await queryInterface.createTable('SeatCategory', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true
        },
        seatType: {
          type: DataType.STRING
        },
        seatPrice: {
          type: DataType.INTEGER
        }
      });

    /**Seating**
    * As a user I want to book a seat
      * As a user I want to book a vip seat/couple seat/super vip/whatever
      * As a user I want to see which seats are still available
      * As a user I want to know where I'm sitting on my ticket
      * As a cinema owner I don't want to configure the seating for every show
      */

      let movieBookings = await queryInterface.createTable('SeatCategory', {
        id: {
          type: DataType.INTEGER,
          primaryKey: true
        },
        seatNumber: {
          type: DataType.INTEGER,
          references:{
            model: "SeatCategory",
            key: 'id'
          }
        },
        movieId: {
          type: DataType.INTEGER,
          references:{
            model: "ShowAdministration",
            key: 'id'
          }
        }
      });


    }catch (e) {
      //throw new Error('TODO: implement migration in task 4');
      throw new Error(e);
    }


  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: (queryInterface: QueryInterface) => {
    // do nothing
  },
};
