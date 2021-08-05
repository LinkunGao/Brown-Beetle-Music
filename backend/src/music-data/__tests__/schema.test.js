import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {User} from '../schema';

let mongod;
let user1, user2, user3;

/**
 * Before all tests, create an in-memory MongoDB instance so we don't have to test on a real database,
 * then establish a mongoose connection to it.
 */
beforeAll(async () => {

    mongod = new MongoMemoryServer();

    const connectionString = await mongod.getUri();
    await mongoose.connect(connectionString, { useNewUrlParser: true });

});

/**
 * Before each test, intialize the database with some data
 */
beforeEach(async () => {
    const coll = await mongoose.connection.db.createCollection('brown-beetle');

    const users = [
        {
            "username":"coco",
           "firstName":"linkun",
            "lastName": "Gao",
            "password": "dssa",
            "email" : "asddsa@gmail.com",
            "icon": "/images/default.png",
    
            "listenList" :[12]
        },
    ];

    // user1 = {
    //     username: "ll",
    //     firstName: "lin",
    //     lastName: "kun",
    //     password: "adss",

    //     email: "asa@gmail.com",
    //     icon:"images/default",

    //     listenList: []
    // };

    // user2 = {
    //     username: 'lll',
    //     firstName: "linlin",
    //     lastName: 'kun',
    //     password: 'adss978',

    //     email: 'asa@gmail.com',
    //     icon:'/images/default',

    //     listenList: []
    // };

    // user3 = {
    //     username: 'll',
    //     firstName: "linnn",
    //     lastName: 'kun',
    //     password: 'adss',

    //     email: 'asa@gmail.com',
    //     icon:'/images/default',

    //     listenList: []
    // };

    await coll.insertMany(users);
});

/**
 * After each test, clear the database entirely
 */
afterEach(async () => {
    await mongoose.connection.db.dropCollection('brown-beetle');
});

/**
 * After all tests, gracefully terminate the in-memory MongoDB instance and mongoose connection.
 */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

// it('get user info', async () => {

//     const user = await User.find();
//     expect(user).toBeTruthy();
//     expect(user.length).toBe(3);

//     expect(user[0].username).toBe('ll');
//     expect(user[0].firstName).toBe('lin');
//     expect(user[0].email).toBe('asa@gmail.com');

//     expect(user[1].lastName).toBe('kun');
//     expect(user[1].password).toBe('adss978');
//     expect(user[1].drink).toBeUndefined();

//     expect(user[2].icon).toBe('/images/default');
//     expect(user[2].listenList).toBe([]);
// });

// it('gets a single user', async () => {
//     const user = await User.findById(user3._id);
//     expect(user.icon).toBe('/images/default');
//     expect(user.password).toBe('adss');
//     expect(user.drink).toBeUndefined();
// });

// it('adds a user without crashing', async () => {
//     const user = new User({
//         username: 'll00',
//         firstName: "linnn",
//         lastName: 'kun',
//         password: 'Tea',

//         email: 'asadsadsa@gmail.com',
//         icon:'/images/default',

//         listenList: []
//     });

//     await user.save();

//     const fromDb = await mongoose.connection.db.collection('brown-beetle').findOne({ _id: user._id });
//     expect(fromDb).toBeTruthy();
//     expect(fromDb.username).toBe('ll00');
//     expect(fromDb.firstName).toBe('linnn');
//     expect(fromDb.password).toBe('Tea');
// });


it('fails when not add username', () => {
    const user = new User({
        firstName: "linnn",
        lastName: 'kun',
        password: 'Tea',

        email: 'asadsadsa@gmail.com',
        icon:'/images/default',

        listenList: []
    });

    return expect(user.save()).rejects.toThrow();
});


// etc...