import webpack from 'webpack';
import CleanTerminalWebpackPlugin from 'clean-terminal-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

const rules: webpack.RuleSetRule[] = [
    {
        test: /.tsx?$/,
        use: 'ts-loader',
    },
];

const config: webpack.Configuration = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'eval',
    entry: {
        main: [__dirname + '/src/index.tsx'],
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist',
    },
    module: {
        rules,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.json'],
    },
    plugins: [new CleanTerminalWebpackPlugin()],
};

export default config;
