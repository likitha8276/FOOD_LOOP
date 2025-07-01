const foodModel = require('../models/foodModel')
const fsPromises = require('fs').promises
const path = require('path')
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const image_filename = req.file.filename;

    await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename
    });

    res.status(201).json({ message: "Food added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Error adding food"});
  }
};

const listFood = async(req,res)=>{
  try{
    const foods = await foodModel.find({})
    res.json({data:foods})
  }catch(error){
    console.log(error)
    res.status(500).json({message:"error listing food"})
  }
}

const removeFood = async(req,res)=>{
  try{
    const {id} = req.query
    console.log(id);
    const food = await foodModel.findById(id)
    if(!food)
      return res.status(404).json({"message":"Error deleting food"})

    await fsPromises.unlink(path.join(__dirname,'..','uploads',`${food.image}`))
    await foodModel.deleteOne({_id:id})
    res.status(200).json({ message: "Food deleted successfully" });

  }catch(error){
     console.log(error)
    res.status(500).json({"message":error.message})
  }

}
module.exports={addFood,listFood,removeFood}