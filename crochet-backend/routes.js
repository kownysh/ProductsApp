import express from 'express'
import cors from 'cors'
import { addProduct, addProductToCart, doesUserExist, getCartProducts, getUserDetails, newUser, removeCartProduct, getProducts, addProductToWishlist, removeProductFromWishlist, getWishlistedProducts } from './Database.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { authenticate } from './authmiddleware.js';
import 'dotenv/config';
import multer from 'multer';
import fs from 'fs'
import https from 'https'

const app = express()
const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, './images' )
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://192.168.1.15:5173'], credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use('/', router)
app.use('/images', express.static('images'))

const PORT = process.env.PORT

router.get('/', function(req, res) {
    res.status(200).send('Hello World!')
})

router.post('/signup', async function(req, res) {
    const { firstName, lastName, email, password } = req.body

    try {
        const user = await doesUserExist(email)
        if (user) {
            return res.redirect('/')
        }
        let hashedPassword = await bcrypt.hash(password, 10)
        const newuser = await newUser(firstName, lastName, email.toLowerCase(), hashedPassword)
        res.status(201).json({ message: 'User created successfully!', newuser})
    } catch (error) {
        console.log("Error creating. See logs:")
        console.log(error)
        res.status(500).json({message: "Server Error"})
    }
})

router.post('/login', async function(req, res) {
    const { email, password } = req.body
    try {
        const userExists = await doesUserExist(email);
        if (!userExists) {
            return res.redirect('/')
        }
        const user = await getUserDetails(email)
        const pwd = await bcrypt.compare(password, user.password)
        if (!pwd) return res.redirect('/')

        const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, { expiresIn: "1h" })
        console.log("Cookie is being created")
        res.cookie("_CS-AT", token, { httpOnly: true, sameSite: "none", secure: true })   
        console.log("user logged in")
        return res.status(200).json({ message: "User logged In!" })
    } catch (err) {
        console.log("Error = " , err)
    }
})

router.post('/addtocart', async function(req, res) {
    const { productId, imageName } = req.body
    await addProductToCart(productId, imageName)

    return res.status(201).json({message: "Successfully added to Cart!"})
})

router.post('/userdetails', async function(req, res) {
    const { email } = req.body
    const userDetails = await getUserDetails(email)
    return res.status(200).send({ userDetails })
})

router.get("/getcartproducts", async function(req, res) {
    const products = await getCartProducts()
    return res.status(200).send({ products })
})

router.delete('/removeproductfromcart', async function(req, res) {
    const { productId } = req.body
    await removeCartProduct(productId)
    return res.status(200).send()
})

router.post('/uploadimage', upload.single('image'), async function(req, res) {
    const { imageName, price, description, category } = req.body
    await addProduct(imageName, price, description, category)
    return res.status(200).send({
        message: "Image has been uploaded succesfully!"    
    })
})

router.get('/getproducts', async function(req, res) {
    const products = await getProducts();
    return res.status(200).send({ products })
})

router.post('/user/addtowishlist', authenticate ,async function(req, res) {
    const { productId } = req.body
    await addProductToWishlist(req.userId, productId)
    return res.status(200).send({
        message: "The product has been wishlisted!"
    })
})

router.delete('/user/removefromwishlist', authenticate, async function(req, res) {
    const { productId } = req.body
    await removeProductFromWishlist(req.userId, productId)

    return res.sendStatus(200)
})

router.get('/user/getwishlistedproducts', authenticate, async function(req, res) {
    const wishlistedProducts = await getWishlistedProducts(req.userId)
    return res.status(200).send({ wishlistedProducts })
})

router.post('/moveproducts', authenticate, async function(req, res) {
    const { updatedItems } = req.body

    for (let productId of updatedItems) {
        await addProductToWishlist(req.userId, productId)
    }

    return res.sendStatus(200)
})

const options = {
    key: fs.readFileSync("server.key"),
    cert: fs.readFileSync("server.cert"),
};

https.createServer(options, app).listen(PORT, function() {
    console.log(`App is running on ${PORT}`)
})


