#菜谱小程序

##鸣谢

本次使用demo主要是在 github上找到的开源项目
[demo地址](https://github.com/caochangkui/miniprogram-project)

##部分截图

![用户界面](http://212.64.68.219:9090/IMG_20200625_222544.jpg)

![筛选界面](http://212.64.68.219:9090/IMG_20200625_222616.jpg)

![主界面](http://212.64.68.219:9090/IMG_20200625_222624.jpg)

##项目结构

```
.
├── README.md
├── project.config.json                              // 项目配置文件
├── cloudfunctions | 云环境                           // 存放云函数的目录
│   ├── login                                        // 用户登录云函数
│   │   ├── index.js
│   │   └── package.json
│   └── collection_get                               // 数据库查询云函数
│   │   ├── index.js
│   │   └── package.json
│   └── collection_update                               // 数据库更新云函数
│       ├── index.js
│       └── package.json
└── miniprogram
    ├── images                                        // 存放小程序图片
    ├── lib                                           // 配置文件
    ├── pages                                         // 小程序各种页面
    |   ├── index                                     // 首页
    |   └── menu                                      // 分类页
    |   └── user                                      // 用户中心
    |   └── search                                    // 搜索页
    |   └── list                                      // 列表页 搜索结果页
    |   └── detail                                    // 详情页
    |   └── collection                                // 收藏页
    |   └── ...                                       // 其他
    ├── style                                         // 样式文件目录
    ├── app.js                                        // 小程序入口文件
    ├── app.json                                      // 全局配置
    └── app.wxss                                      // 全局样式

```

###部分代码细节

####查询数据、分页查询

编辑 index.js：

```
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()

exports.main = async (event, context) => {

  /**
   * page: 第几页
   * num: 每页几条数据
   * condition： 查询条件，例如 { name: '养生' }
   */

  const {database, page, num, condition} = event
  console.log(event)

  try {
    return await db.collection(database)
                  .where(condition)
                  .skip(num * (page - 1))
                  .limit(num)
                  .get()
  } catch (err) {
    console.log(err)
  }
}

```

####使用 collection_get 云函数

例如，按照查询条件`{tags: '荤菜'}`查询菜品列表，每页`num = 6`条数据:

```
let {list, page, num} = this.data
let that = this

this.setData({
    loading: true
})

wx.cloud.callFunction({
    name: 'collection_get',
    data: {
        database: 'gushici',
        page,
        num,
        condition: {
            tags: '荤菜'
        }
    },
    }).then(res => {
        if(!res.result.data.length) {
            that.setData({
                loading: false,
                isOver: true
            })
        } else {
            let res_data = res.result.data
            list.push(...res_data)
            that.setData({
                list,
                page: page + 1, // 页面加1
                loading: false
            })
        }
    })
    .catch(console.error)
}
```

####更新数据

编辑 index.js:

```
// 更新数据 - 根据 _id 更新已打开人数
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {

  const { id } = event
  console.log(event)

  try {
    return await db.collection('gushici').doc(id)
      .update({
        data: {
          opened: _.inc(1)
        },
      })
  } catch (e) {
    console.error(e)
  }
}
```

####使用 collection_update 云函数

更新某_id数据的打开人数：

```
let _id = e.currentTarget.dataset.id
wx.cloud.callFunction({
    name: 'collection_update',
    data: {
        id: _id
    },
}).then(res => {
    console.log(res.data)
})
.catch(console.error)
```


####数据库模糊查询

```
let database = 'gushici'
let condition =  {
    name: {
        $regex:'.*'+ inputValue,
        $options: 'i'
    }
}

let { list, page, num } = this.data
let that = this

this.setData({
    loading: true
})

// 模糊查询
wx.cloud.callFunction({
    name: 'collection_get',
    data: {
        database,
        page,
        num,
        condition
    },
}).then(res => {
    if (!res.result.data.length) {
        that.setData({
            loading: false,
            isOver: true
        })
    } else {
        let res_data = res.result.data
        list.push(...res_data)
        that.setData({
            list,
            loading: false
        })
    }
})
.catch(console.error)
```

####使用 async/await 处理异步

参考文章：[微信小程序中使用Async/await方法处理异步请求](https://www.cnblogs.com/cckui/p/10231801.html)