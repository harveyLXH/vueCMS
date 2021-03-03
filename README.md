
## 制作首页App组件
1.完成 header区域，使用的是Mint-UI中的Header
2.制作底部的Tabbar区域，使用的是MUI中Tabber.html
 + 在制作 购物车 小图标的时候 操作会相对多一些
 + 先把扩展图标的CSS样式，拷贝到 项目中
 + 为 购物车 小图标 添加如下样式 `mui-icon-extra mui-icon-extra-cart` 
3.要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造tabbar 为 router-link

## 设置路由高亮

## 点击tabbar中的路由链接，展示对应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取，使用vue-resource
2. 使用vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到data身上
4. 使用v-for循环渲染每个item 项目

## 改造九宫格 区域的样式

## 改造 新闻资讯 路由链接

## 新闻资讯 页面 制作
1.绘制界面，使用MUI中的media-list.html
2.使用vue-resource 获取数据
3.渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link，同时，在跳转的时候应该提供唯一的id标识符
2. 创建新闻详情组件页面 NewsInfo.vue
3. 在路由模块，将新闻详情的 路由地址 和组件页面对应起来

## 实现新闻详情 的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件
2. 在需要使用comment组件的页面中，先手动导入comment组件
   +  `import comment from './comment.vue'`
3. 在父组件中，使用'components'属性，将刚才导入comment组件 注册为自己的 子组件
4. 将注册子组件时候的注册名称，以标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中
1. getComments

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求，下一页数据
2. 点击加载更多，让pageIndex++ ， 然后重新调用this.getComments() 方法 重新获取最新一页的数据
3. 为了防止 新数据 覆盖老数据的清空，我们在点击加载更多的时候，每当获取到新数据，应该让老数据调用数据的concat方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户评论不能为空
4. 通过Vue-resource 发送一个儿轻轻，把评论内容提交给服务器
5. 当发表评论Ok后，重新刷新列表，以查看最新的评论
   + 如果调用getComments 方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到
   + 换一种思路：当评论成功后，在客户端，手动拼接出一个，最新的评论对象，然后 调用 数组的unshift方法 把最新的评论，追加到 data 中 comments的开头，这样，就能 完美实现刷新评论列表的需求

## 改造图片分享 按钮为 路由链接并显示对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
1. 制作 顶部的滑动条
2. 制作 底部图片列表
### 制作顶部滑动条的坑：
1. 需要借助于MUI中 tab-top-webview-main.html
2. 需要把slider区域的 mui-fullscreen 类 去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要初始化一下：
   + 导入mui.js
   + 调用官方提供的方式初始化：
   ```
   mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
   });
   ```
4. 我们在初始化，滑动条的时候，导入的mui.js，但是，控制台报错：
`mui.min.js:940 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
   + 经过我们合理的推荐，觉得，可能是mui.js中用到了'caller', 'callee' and 'arguments'  东西，但是 ,webpack打包好的bundle.js中默认是启用严格模式的，所以，这两者冲突了；
   + 解决方案： 1.把mui.js中的非严格模式的代码改掉，但是不现实；2.把webpack打包时候的严格模式禁用掉；
   + 最终，我们选择了plan B 移除严格模式：使用这个插件：babel-plugin-transform-remove-strict-mode
   + 滑动时出现警告：Unable to preventDefault inside passive event listener due to target being treated as passive 解决方案：增加样式*{touch-action: pan-y;}
5. 刚进入 图片分享页面的时候，滑动条无法正常工作，经过我们认真的分析，发现，如果要初始化，滑动条，必须要等DOM元素加载完毕，所以，我们把初始化 滑动条的代码，搬到了mounted生命周期函数中；
6. 当滑动条调试OK后，发现,tabbar无法正常工作了，这时候，我们需要把每个tabbar按钮的样式中 'mui-tab-item' 重新改一下名字;
7.获取所有分类，并渲染 分类列表；

### 制作图片列表区域：
1. 图片列表需要使用懒加载技术，我们可以使用Mint-UI 提供的现成的组件`lazy-load`
2. 更加`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据

### 实现了图片列表的 懒加载改造和样式美化

## 实现了 点击图片 跳转到 图片详情页面
1. 在改造li 成 router-link 的时候，需要使用 tag 属性指定要渲染为那种元素

## 实现 详情页面的布局和美化，同时获取数据渲染页面

## 实现图片详细中 缩略图的功能
1.使用 插件 vue-preview 这个缩略图的插件
2.获取到所有的图片列表，然后使用v-for 指令渲染数据
3.注意：img标签上的class 不能去掉
4.注意：每个图片数据对象中，必须有 w 和 h 属性

## 绘制商品列表 页面基本结构并美化

## 尝试在手机上，去进行项目的预览和调试
1. 要保证自己的手机可以正常运行；
2. 要保证 手机 和 开发项目的电脑 处于同一个WIFI环境中，也就说手机 可以访问到电脑的IP
3. 打开自己的项目中package.json文件在，在dev 脚本中，添加一个--host指令，把当前电脑的wifi ip地址，设置为 --host的指令值；
   + 如何查看自己电脑所处WIFI的ip呢，在cmd中运行 `ipconfig ` 查看无线网的IP地址


