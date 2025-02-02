import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/imageUploader";
import { IMenuDocument, Menu } from "../models/menu.model";
import { Restaurant } from "../models/restaurant.model";
import mongoose from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    if (!file) {
      res.status(400).json({ success: false, message: "Image is required" });
      return;
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu = await Menu.create({
      name,
      description,
      price,
      image: imageUrl,
    });

    const restaurant = await Restaurant.findOne({ user: req.id });
    if (restaurant) {
      restaurant.menus.push(menu._id as mongoose.Schema.Types.ObjectId);
      await restaurant.save();
      res.status(201).json({
        success: true,
        message: "Menu Added",
        menu,
      });
      return;
    }
    res.status(404).json({ success: false, message: "Restaurant not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const file = req.file;
    const menu = await Menu.findById(id);
    if (!menu) {
      res.status(404).json({ success: false, message: "Menu not found" });
      return;
    }

    if (name) menu.name = name;
    if (description) menu.description = description;
    if (price) menu.price = price;

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(
        file as Express.Multer.File
      );
      menu.image = imageUrl;
    }
    await menu.save();
    res.status(200).json({
      success: true,
      message: "Menu updated",
      menu,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeMenu = async (req: Request, res: Response) => {
  try {
    const { id: menuId } = req.params;
    if (menuId) {
      const menus = await Menu.findByIdAndDelete(menuId);
      if (menus) {
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
          res
            .status(404)
            .json({ success: false, message: "Restaurant not found" });
          return;
        }
        restaurant.menus = restaurant.menus.filter((menu) => {
          menu.toString() !== menuId;
        });
        await restaurant.save();
        res.status(200).json({
          success: true,
          message: "Menu removed from your restaurant",
        });
      } else {
        res.status(404).json({ success: false, message: "Menu not found !" });
      }
    } else {
      res.status(404).json({ success: false, message: "MenuId not found !" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
