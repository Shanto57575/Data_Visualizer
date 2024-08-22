import mongoose from "mongoose"

const getAllProducts = async (req, res) => {
    try {
        const products = await mongoose.connection.db.collection('shopifyProducts').find({}).toArray()
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.json(products)
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
}

export default getAllProducts