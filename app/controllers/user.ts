import { Request, Response, NextFunction } from "express";
import { log, error } from "../utils/logger";
import {
  createNewOrder,
  profile,
  topSellingBooks,
  uploadImage,
} from "../services/user";
import { responseHandler, throwError } from "../utils/handler";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user;
    const userProfile = await profile(userId);
    const response = responseHandler(
      200,
      "successfully fetched profile.",
      userProfile
    );
    return res.status(response.statusCode).json(response);
  } catch (err) {
    error(req, err);
    next(err);
  }
};

export const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user;
    const imageUrls: string[] = [];

    // Extract image URLs from the files uploaded by multer-s3
    if (req.files && Array.isArray(req.files)) {
      imageUrls.push(
        ...(req.files as Express.MulterS3.File[]).map((file) => file.location)
      );
    } else throwError(400, "No images found.");
    await uploadImage(userId, imageUrls);
    const response = responseHandler(200, "successfully uploaded images.");
    return res.status(response.statusCode).json(response);
  } catch (err) {
    error(req, err);
    next(err);
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: customerId } = req.user;
    const { bookIds } = req.body;
    const order = await createNewOrder(customerId, bookIds);
    const response = responseHandler(
      200,
      "successfully created new order.",
      order
    );
    return res.status(response.statusCode).json(response);
  } catch (err) {
    error(req, err);
    next(err);
  }
};

export const getTopSellingBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { size } = req.params;
    const books = await topSellingBooks(Number(size || 10));
    const response = responseHandler(
      200,
      "successfully fetched top sellers.",
      books
    );
    return res.status(response.statusCode).json(response);
  } catch (err) {
    error(req, err);
    next(err);
  }
};
