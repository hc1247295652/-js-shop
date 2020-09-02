import ajax from './ajax'

/*
*
* 首页板块
*
* */
// 定义一个基本路径
const BasePath = "http://demo.itlike.com/web/xlmc";
// 请求首页数据
export const getRotationChart = () => ajax(BasePath + "/api/homeApi");

/**
 *
 * 分类板块
 *
 * */
// 请求分类左边的标题数据
export const getSortLeft = () => ajax(BasePath + "/api/homeApi/categories");
// 请求分类右边的商品数据
export const getSortRight = (index) => ajax(BasePath + "/api/homeApi/categoriesdetail/lk00" + index);



/*
*
* 购物车板块
*
* */
// 添加商品
export const getAddCart = (user_id, goods_id, goods_name, goods_price, small_image) =>
    ajax(BasePath + "/api/cart/add",{user_id, goods_id, goods_name, goods_price, small_image},"POST");
// 获取购物车数据
export const getCart = (user_id) => ajax(BasePath + "/api/cart/search/" + user_id);
// 修改购物车数量<add, reduce>
export const getEditCartNum = (user_id, goods_id,type) => ajax(BasePath + "/api/cart/num",{user_id, goods_id,type},"POST");
// 删除购物车数据
export const getClearCart = (user_id) => ajax(BasePath + "/api/cart/clear/" + user_id);
// 单个商品的选中和取消选中
export const getSingleChoiceCart = (user_id, goods_id) => ajax(BasePath + "/api/cart/singer_select",{user_id, goods_id},"POST");
// 所有商品的选中和取消选中
export const getAllChoiceCart = (user_id, flag) => ajax(BasePath + "/api/cart/all_select",{user_id, flag},"POST");
// 查询所有已经被选中的商品
export const getSelectCart = (user_id) => ajax(BasePath + "/api/cart/selected/" + user_id);
// 删除已经生成订单的商品
export const getDeleteCart = (user_id) => ajax(BasePath + "/api/cart/del_checked/" + user_id);



/*
*
* 用户板块
*
* */
// 获取手机验证码
export const getPhoneCode= (phone) => ajax(BasePath + "/api/send_code",{phone});
// 手机验证码登录
export const getPhoneLogin= (phone,code) => ajax(BasePath + "/api/login_code",{phone,code},"POST");
// 用户名/密码登录
export const getPwdCode= (user_name,user_pwd,captcha) => ajax(BasePath + "/api/login_pwd",{user_name,user_pwd,captcha},"POST");
// 自动登录
export const getAutomaticLogin= () => ajax(BasePath + "/api/userinfo");
// 退出登录
export const getSignoutLogin= () => ajax(BasePath + "/api/logout");


/*
*
* 地址板块
*
* */
// 获取当前用户收货地址
// http://demo.itlike.com/web/xlmc:user_id
export const getShippingAddress = (user_id) => ajax(BasePath + "/api/address/search/" + user_id);

// 添加用户收货地址
export const getAddShippingAddress= (user_id, address_name, address_phone, address_area, address_area_detail,address_post_code, address_tag, province, city, county, areaCode) =>
    ajax(BasePath + "/api/address/add",{user_id, address_name, address_phone, address_area, address_area_detail,address_post_code, address_tag, province, city, county, areaCode},"POST");

// 获取修改用户信息
export const getModifiedUserInformation = (user_id, address_id) => ajax(BasePath + "/api/address/one",{user_id, address_id},"POST");

// 修改用户地址
export const getModifyUserAddress = (address_id,user_id, address_name, address_phone, address_area, address_area_detail,
    address_post_code, address_tag, province, city, county, areaCode) =>
    ajax(BasePath + "/api/address/edit",{address_id,user_id, address_name, address_phone, address_area, address_area_detail,
        address_post_code, address_tag, province, city, county, areaCode},"POST");

// 删除用户地址
export const getDeleteUserAddress = (address_id) => ajax(BasePath + "/api/address/del/" + address_id);


/*
*
* 订单模块
*
* */
// 提交订单
export const getPlaceOrder = (user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price) =>
    ajax(BasePath + "/api/order/post",{user_id, address_id, arrive_time, cart_shop, notice, shop_price, dis_price},"POST");
// 订单支付成功
export const getSuccessfulOrder = (user_id, order_id) => ajax(BasePath + "/api/order/change_status",{user_id, order_id},"POST");
// 查询订单
export const getQueryOrder = (user_id) => ajax(BasePath + "/api/order/get",{user_id},"POST");

// 删除已成订单的商品

export const getDleteOrder = (user_id) => ajax(BasePath + "/api/cart/del_checked/" + user_id);

/*
*
* 支付模块
*
* */
const PAYBASEPATH = "/pay";
// 生成微信支付二维码
export const getGenerateQRCode = (outTradeNo, totalFee) => ajax(PAYBASEPATH + "/createNative.do",{outTradeNo, totalFee});
// 查询是否支付成功
export const getIsPaymentSuccessful = (out_trade_no) => ajax(PAYBASEPATH + "/queryPayStatus.do",{out_trade_no});