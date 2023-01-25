import express from 'express';
import chalk from 'chalk';
import { resolve } from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(resolve(__dirname, '../dist')));

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
    console.log(
        chalk.bold.rgb(255, 255, 0)('Server running...')
    );
});
