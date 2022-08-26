import Mock from 'mockjs';

const { data } = Mock.mock({
  // 20条数据
  'data|20': [
    {
      // 商品种类
      goodsClass: '女装',
      // 商品Id
      'goodsId|+1': 1,
      //商品名称
      goodsName: '@ctitle(10)',
      //商品地址
      goodsAddress: '@county(true)',
      //商品等级评价★
      'goodsStar|1-5': '★',
      //商品图片
      goodsImg: "@Image('100x100','@color','小甜甜')",
      //商品售价
      'goodsSale|30-500': 30,
    },
  ],
});

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { data: data },

  // GET 可忽略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req: any, res: any) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.end('ok');
  },
};
