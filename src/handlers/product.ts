import prisma from "../db";


// Get All Products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    });

    res.json({data:user.products});
}

// Get A Product by id
export const getOneProduct = async (req, res) => {
    const id = req.params.id;
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    });

    res.json({data:product});
}

// Create A Product
export const createProduct = async (req, res, next) => {
    try{
        const {name} = req.body;
        const product = await prisma.product.create({
            data: {
                name,
                belongsToId: req.user.id
            }
        });

      res.json({data:product});
    } catch(e) {
        next(e);  // 500 error 
    }
}

// Update A Product
export const updateProduct = async (req, res) => {
    //const {name} = req.body;
    //const id = req.params.id;
    const product = await prisma.product.update({
        where: {
            id_belongsToId: {
               id: req.params.id,
               belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    });

    res.json({data:product});
}

// Delete A Product
export const deleteProduct = async (req, res) => {
    const id = req.params.id;  // This is the product id

    // This is the way to delete a product
    const product = await prisma.product.delete({
        where: {
             id_belongsToId: {
                id,
                belongsToId: req.user.id
             }
        }
    });

    res.json({data:product});
}


