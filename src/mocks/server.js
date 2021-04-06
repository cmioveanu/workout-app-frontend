import { rest } from 'msw';
import { setupServer } from 'msw/node'


const exercises = [
    {
        id: 80,
        name: "Crunches",
        user_id: 10
    },
    {
        id: 79,
        name: "Hanging leg raises",
        user_id: 10
    },
    {
        id: 81,
        name: "One leg squats",
        user_id: 10
    }
];


const handlers = [


    //History route
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


    //Exercises route
    rest.get('/api/exercises', (req, res, ctx) => {
        return res(ctx.json(exercises));
    }),
    rest.post('/api/exercises', (req, res, ctx) => {
        const { name } = req.body;
        return res(ctx.json([...exercises, {
            id: 100,
            name: name,
            user_id: 10
        }]));
    }),
    rest.get('/api/exercises/80/10', (req, res, ctx) => {
        return res(ctx.json([
            {
                date: '2021-03-29T23:00:00.000Z',
                name: 'Crunches',
                time_under_load: 6,
                negatives: 5
            },
            {
                date: '2021-02-29T23:00:00.000Z',
                name: 'Crunches',
                time_under_load: 9,
                negatives: 2
            },
        ]));
    }),
    rest.put('/api/exercises/79', (req, res, ctx) => {
        const exercisesCopy = [...exercises];
        exercisesCopy[1].name = req.body.newName;

        return res(ctx.json(exercisesCopy));
    }),
    rest.delete('/api/exercises/79', (req, res, ctx) => {
        const exercisesCopy = exercises.filter(e => e.id === 79);
        return res(ctx.json(exercisesCopy));
    }),


    //Account route
    rest.post('/api/account/login', (req, res, ctx) => {
        const { username, password } = req.body;
        if(username === 'TestUser' && password === 'TestPassword') {
            return res(ctx.status(200));
        }
    }),

];


export const server = setupServer(...handlers);