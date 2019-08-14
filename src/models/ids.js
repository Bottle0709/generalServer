'use strict';
import mongoose from 'mongoose';

//创建表（Ids）
const idsSchema = new mongoose.Schema({
    restaurant_id: Number,
    food_id: Number,
    order_id: Number,
    user_id: Number,
    address_id: Number,
    cart_id: Number,
    img_id: Number,
    category_id: Number,
    item_id: Number,
    sku_id: Number,
    admin_id: Number,
    statis_id: Number
});

/**
 * 下一步在代码中使用Schema所定义的数据模型，需要将定义好的phoneSchema转换为Model。
 可以使用mongoose.model(modelName, schema)进行转换。
 在Mongoose的设计理念中，Schema用来也只用来定义数据结构，具体对数据的增删改查操作都由Model来执行
 */

const Ids = mongoose.model('Ids',idsSchema);

Ids.findOne((err,data) => {
    if(!data) {
        const newIds = new Ids({
            restaurant_id: 0,
            food_id: 0,
            order_id: 0,
            user_id: 0,
            address_id: 0,
            cart_id: 0,
            img_id: 0,
            category_id: 0,
            item_id: 0,
            sku_id: 0,
            admin_id: 0,
            statis_id: 0
        });
        newIds.save(); //保存数据
    }
});

export default Ids;