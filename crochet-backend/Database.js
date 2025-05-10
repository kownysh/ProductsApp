import { Sequelize, DataTypes, Model } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import path from 'path'

const sequelize = new Sequelize({
    dialect: MySqlDialect,
    database: 'crochetdb',
    user: 'root',
    password: 'kowshik',
    host: 'localhost',
    port: 3306,
});


class User extends Model { }

User.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'User',
    }
);


class Product extends Model {
}

Product.init(
    {
        productId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        imagePath: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Product',
    }
)

class CartProducts extends Model {
}

CartProducts.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    sequelize,
    modelName: "CartProducts",
    tableName: "CartProducts"
})

class WishListProducts extends Model {
}

WishListProducts.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
},
    {
        sequelize,
        modelName: "WishListProducts",
        tableName: "WishListProducts"
    }
)

await sequelize.sync({
    //force: true
    alter: true
})

async function newUser(firstName, lastName, email, password) {
    return await User.create({ firstName, lastName, email, password });
}

async function getUserDetails(email) {
    const user = await User.findOne({ where: { email } })
    return user
}

async function doesUserExist(email) {
    const user = await User.findOne({ where: { email } })
    return true ? user != null : false
}

async function comparePassword(email, password) {
    const user = await User.findOne({
        where: { email }
    })
    if (password === user.password) return true;
    return false;
}


async function addProductToCart(userId, productId) {
    try {
        await CartProducts.create({
            userId, productId
        })
    } catch (e) {
        console.log("product already exists")
    }
}

async function getCartProducts() {
    const products = await CartProducts.findAll()
    return products
}

async function removeCartProduct(userId, productId) {
    await CartProducts.destroy({
        where: { userId, productId }
    })
}

async function addProduct(imageName, price, description, category) {
    const imagePath = path.join('/images', imageName)
    await Product.create({
        imagePath, price, description, category
    })
}

async function getProducts() {
    return await Product.findAll()
}

async function addProductToWishlist(userId, productId) {
    try {
        await WishListProducts.create({
            userId, productId
        })
    } catch (e) {
        console.log("product already exists")
    }
}

async function removeProductFromWishlist(userId, productId) {
    await WishListProducts.destroy({
        where: { userId, productId }
    })
}

async function getWishlistedProducts(userId) {
    return await WishListProducts.findAll({
        where: { userId }
    })
}

export { newUser, doesUserExist, comparePassword, getUserDetails, addProductToCart, getCartProducts, removeCartProduct, addProduct, getProducts, addProductToWishlist, removeProductFromWishlist, getWishlistedProducts }