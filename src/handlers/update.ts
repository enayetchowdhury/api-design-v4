import prisma from "../db";

export const getOneUpdate = async (req, res) => {
    const id = req.params.id;
    const update = await prisma.update.findUnique({
        where: {
            id
        }
    });

    res.json({data:update});
}

export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    });

    const updates = await products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, []);

    res.json({data:updates});
}
// correct the following createUpdate function


export const createUpdate = async (req,res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    });

    if (!product) {
        // does not belong to user
        return res.json({"message" : 'Nope'})
    }
    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    });

    res.json({data: update})
}

export const updateUpdate = async (req, res) => {
   const product = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id
      },
      include: {
        updates: true
      }
   });
   
   const updates = product.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates]
}, []);
   
   const match = updates.find(update => update.id === req.params.id);

   if (!match) {
    // handle this
    return res.json({"message" : 'Nope'})
   }

   const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id
      },
      data: req.body
   });

   res.json({data: updatedUpdate})

}


export const deleteUpdate = async (req, res) => {
    const product = await prisma.product.findMany({
       where: {
         belongsToId: req.user.id
       },
       include: {
         updates: true
       }
    });
    
    const updates = product.reduce((allUpdates, product) => {
     return [...allUpdates, ...product.updates]
 }, []);
    
    const match = updates.find(update => update.id === req.params.id);
 
    if (!match) {
     // handle this
     return res.json({"message" : 'Nope'})
    }
 
    const deleted = await prisma.update.delete({
       where: {
         id: req.params.id
       }
    });
 
    res.json({data: deleted})
 
 }

