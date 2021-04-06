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

];


export const server = setupServer(...handlers);