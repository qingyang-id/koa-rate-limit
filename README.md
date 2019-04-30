# API限流熔断服务
 接口限流熔断，基于nodejs，koa2搭建。

## 启动脚本
``` bash
# 安装依赖
npm install

# 本地启动服务
npm run start
```

## 程序目录

```
.
├── src                                            # 程序源文件
|   ├── controllers                                # 控制层
|   ├── routes                                     # 路由文件
│  └── tests                                      # 单元测试
└── README.md                                      # 项目介绍文件
```

# 限流熔断算法
- [x] 漏铜算法（已实现）
- [ ] 令牌桶算法
- [ ] 计数器算法

# 算法介绍

## 漏桶算法

漏桶算法思路很简单，水（请求）先进入到漏桶里，漏桶以一定的速度出水，当水流入速度过大会直接溢出，可以看出漏桶算法能强行限制数据的传输速率。

![leaky-bucket](https://github.com/yqsailor/koa-rate-limit/src/doc/img/leaky-bucket.png)

漏桶算法示意图

漏桶算法可以很好地限制容量池的大小，从而防止流量暴增。

这种算法，在使用过后也存在弊端：无法应对短时间的突发流量。

## 令牌桶算法

令牌桶算法的原理是系统会以一个恒定的速度往桶里放入令牌，而如果请求需要被处理，则需要先从桶里获取一个令牌，当桶里没有令牌可取时，则拒绝服务。

![leaky-bucket](https://github.com/yqsailor/koa-rate-limit/src/doc/img/token-bucket.png)

令牌桶算法示意图

令牌桶算法通过发放令牌，根据令牌的rate频率做请求频率限制，容量限制等。
