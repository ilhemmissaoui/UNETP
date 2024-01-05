import express from 'express';

const route = express.Router();

// route.get('/create-event', async (req, res) => {
//     try {
//         const data = {
//             api_key: 'c0b2db2b8215d71f3b8b39fbc331625d',
//             title: 'ilhemEvent',
//             enabled: 1,
//             category: 'general',
//             target: 'allgrp',
//             plugin: 'fgffbh',
//             timing: { year: [], months: [3, 8], days: [5, 23], hours: [1, 11], minutes: [0, 15] }
//         };

//         await axios.post('http://localhost:3012/api/app/create_event', data);
//         res.json({ status: 'ok' });
//     } catch (e) {
//         console.log(e);
//         res.status(500).end();
//     }
// });

route.get('/test-event', async (req, res) => {
    try {
        res.json({ status: 'ok' });
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
});

export default route;
