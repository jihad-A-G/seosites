import { Request, Response, NextFunction } from 'express';
import Stat from '../models/Stat';

export const getAllStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await Stat.find().sort({ order: 1 });
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getStatsByPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page } = req.params;
    const stats = await Stat.find({ $or: [{ page }, { page: 'all' }] }).sort({ order: 1 });
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const createStat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stat = await Stat.create(req.body);
    res.status(201).json({
      success: true,
      data: stat,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!stat) {
      return res.status(404).json({
        success: false,
        message: 'Stat not found',
      });
    }

    res.json({
      success: true,
      data: stat,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stat = await Stat.findByIdAndDelete(req.params.id);

    if (!stat) {
      return res.status(404).json({
        success: false,
        message: 'Stat not found',
      });
    }

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
