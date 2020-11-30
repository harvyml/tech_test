module.exports = {
	mode: "development",
 	entry:{ 
		 app_bundle: './src/hydrated/App.js'
	},
 	module: {
 		rules: [//These are the loaders
 			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			{test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
			},	
		]
		 
 	},
 	output: {
		filename: '[name].js',
		path: __dirname + '/public/bundles',
		publicPath: '/public/bundles'
	},
	watch: true
 }