import { NextFunction, Request, Response } from "express";
import { IDriver } from "../interfaces/interfaces";
import { Driver } from "../models/Driver";

export const getByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { lng, lat } = req.query;

    if (!lng || !lat) {
      res.status(400).send({ error: "lng and lat are required" });
    }

    const drivers = await Driver.aggregate<IDriver>([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng as string), parseFloat(lat as string)],
          },
          distanceField: "distance",
          maxDistance: 200000,
          spherical: true,
        },
      },
    ]);

    res.send(drivers);
  } catch (err) {
    next(err);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const driver = await Driver.create(req.body);
    res.status(201).send(driver);
  } catch (err) {
    next(err);
  }
};

export const updateById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!driver) {
      res.status(404).send({ error: "Driver not found" });
    }

    res.send(driver);
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByIdAndDelete(id);

    if (!driver) {
      res.status(404).send({ error: "Driver not found" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
