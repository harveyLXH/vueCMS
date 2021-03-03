//由于webpack是基于Node进行构建的，所以，webpack的配置文件中，任何合法的node代码都是支持的
var path = require('path');
//在内存中，根据指定的模板页面，生成一份内存中的首页，同时自动把打包好的bundle注入到页面底部
//入股要配置插件，需要在导出的对象中，挂载一个plugins 节点
var htmlWebpackPlugin = require('html-webpack-plugin'); 
//当以命令形式运行webpack 或 webpack-dev-server 的时候，工具会发现，我们并没有提供 要打包的文件的入口和出口文件，此时，它会检查项目根目录中的配置文件，并读取这个文件，就按到了导出的这个配置对象，然后根据这对象 进行打包构建
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry : './src/main.js',    //入口文件
    output : {
        path : path.join(__dirname,'/dist'),    //输出路径
        filename : 'bundle.js'      //指定的输出文件
    },
    mode : 'development',
    devServer:{
        contentBase: 'src',
        port : 3000,
        open : true,
        host : '192.168.0.105'
    },
    plugins:[   //所有webpack 插件的配置节点
        new htmlWebpackPlugin({
            template : path.join(__dirname,'./src/index.html'), //指定模板的文件路径
            filename : 'index.html' //设置生成的内存页面的名称
        }),
        new VueLoaderPlugin()
    ],
    module:{    //配置所有第三方loader模块
        rules:[ //第三方模块的匹配规则
            {test: /\.css$/,use:['style-loader','css-loader']}, //处理css loader的规则
            {test: /\.less$/,use:['style-loader','css-loader','less-loader']}, //处理less loader的规则
            {test: /\.scss$/,use:['style-loader','css-loader','sass-loader']}, //处理sass loader的规则
            
            //{test: /\.(jpg|png|gif|bmp|jpeg)$/, use:'url-loader?limit=12960&name=[hash:8]-[name].[ext]'}, //处理图片路径的loader的规则
           // limit给定的值，是图片的大小，单位是byte，如果我们引用的是图片，大于或等于给定的limit值，
           // 则不会被转换为base64格式的字符串，如果图片小于给定的limit值，则会被转化base64的字符串
            
           {
                test:/\.(jpg|png|gif|bmp|jpeg)$/,
                loader: 'url-loader',
                options:{
                    limit : 8 * 1024,
                    name : '[hash:10].[ext]',
                    esModule : false
                }
           },
           {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},   //处理字体文件的 loader
           {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},    //配置Babel来转换高级的ES6语法
           { test:/\.vue$/,use:'vue-loader' }   //处理 vue文件的Loader
        ]
    },
    resolve:{
        alias:{ //修改vue被导入时候的包的路径
            //"vue$":"vue/dist/vue.js"
        }
    }
}
