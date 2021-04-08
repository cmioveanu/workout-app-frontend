import { rest } from 'msw';
import { setupServer } from 'msw/node'
import {
    exercises,
    routinesList,
    routinesExList,
    routineHistory,
    exerciseHistory,
    workoutExercises
} from './testData';


// Server handlers
const handlers = [
    // *** Workout route
    rest.get('/api/workout/19', (req, res, ctx) => {
        return res(ctx.json(workoutExercises));
    }),
    rest.post('/api/workout', (req, res, ctx) => {
        const { exercises } = req.body;
        const recordPermission = exercises.some(exercise => exercise.timeUnderLoad > 0);
        
        if(recordPermission) {
            return res(ctx.status(201));
        } else {
            return res(ctx.status(403));
        }
    }),


    // *** History route
    rest.get('/api/routines/history/:number', (req, res, ctx) => {
        return res(ctx.json([
            {
                name: 'Bodyweight Pro',
                total_time: 56,
                date: "2021-03-29T23:00:00.000Z",
                exercise: "Crunches",
                time_under_load: 6,
                negatives: 5
            },
            {
                name: 'Machines Full',
                total_time: 56,
                date: "2021-04-29T23:00:00.000Z",
                exercise: "Pushups",
                time_under_load: 25,
                negatives: 7
            }
        ]));
    }),


    // *** Exercises route
    //get the list of exercises
    rest.get('/api/exercises', (req, res, ctx) => {
        return res(ctx.json(exercises));
    }),

    //create a new exercise
    rest.post('/api/exercises', (req, res, ctx) => {
        const { name } = req.body;
        return res(ctx.json([...exercises, {
            id: 100,
            name: name,
            user_id: 10
        }]));
    }),

    //get the history of an exercise
    rest.get('/api/exercises/80/10', (req, res, ctx) => {
        return res(ctx.json(exerciseHistory));
    }),

    //change the name of an exercise
    rest.put('/api/exercises/79', (req, res, ctx) => {
        const exercisesCopy = [...exercises];
        exercisesCopy[1].name = req.body.newName;

        return res(ctx.json(exercisesCopy));
    }),

    //delete an exercise
    rest.delete('/api/exercises/79', (req, res, ctx) => {
        const exercisesCopy = exercises.filter(e => e.id !== 79);
        return res(ctx.json(exercisesCopy));
    }),


    // *** Routines route
    //get the list of routines
    rest.get('/api/routines/19/10', (req, res, ctx) => {
        return res(ctx.json(routineHistory));
    }),

    //create a new routine
    rest.post('/api/routines', (req, res, ctx) => {
        const { name } = req.body;

        const newRoutinesList = [...routinesList];
        newRoutinesList.push({
            name: name,
            id: 100
        });

        return res(ctx.json(newRoutinesList));
    }),

    //edit name for 'Bodyweight Pro' routine
    rest.put('/api/routines/19', (req, res, ctx) => {
        const routinesListCopy = [...routinesList];
        routinesListCopy[1].name = req.body.newName;

        return res(ctx.json(routinesListCopy));
    }),

    //delete 'Bodyweight Pro' routine
    rest.delete('/api/routines/19', (req, res, ctx) => {
        const routinesListCopy = routinesList.filter(e => e.id !== 19);
        return res(ctx.json(routinesListCopy));
    }),

    //add 'Crunches' to 'Bodyweight Full' routine
    rest.post('/api/routines/11/85', (req, res, ctx) => {
        const newRoutinesExList = [...routinesExList];
        newRoutinesExList.push({
            routine_id: 11,
            exercise_id: 85,
            id: 85,
            name: 'Crunches'
        });

        return res(ctx.json(newRoutinesExList));
    }),

    //remove 'Pushups' from 'Bodyweight Full' routine
    rest.delete('/api/routines/11/69', (req, res, ctx) => {
        const newRoutinesExList = routinesExList.filter(ex => !(ex.routine_id === 11 && ex.id === 69));
        return res(ctx.json(newRoutinesExList));
    }),


    // *** Account route
    //log in
    rest.post('/api/account/login', (req, res, ctx) => {
        const { username, password } = req.body;
        if (username === 'TestUser' && password === 'TestPassword') {
            return res(ctx.status(200));
        }
    }),

    //register
    rest.post('/api/account/register', (req, res, ctx) => {
        const users = ['test1', 'test2', 'test3'];

        const { username } = req.body;
        const userExists = users.find(user => user === username);

        if (userExists) {
            return res(ctx.status(403));
        } else {
            return res(ctx.status(201));
        }
    }),

    //change email
    rest.put('/api/account/email', (req, res, ctx) => {
        const { password } = req.body;
        if (password === 'testPassword') {
            return res(ctx.status(200));
        } else {
            return res(ctx.status(403));
        }
    }),

    //change password
    rest.put('/api/account/password', (req, res, ctx) => {
        const { oldPassword } = req.body;
        if (oldPassword === 'testPassword') {
            return res(ctx.status(200));
        } else {
            return res(ctx.status(403));
        }
    })
];


export const server = setupServer(...handlers);