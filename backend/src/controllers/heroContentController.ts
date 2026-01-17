import { Request, Response, NextFunction } from 'express';
import HeroContent from '../models/HeroContent';

export const getAllHeroContent = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const heroContent = await HeroContent.find();
    res.json({
      success: true,
      data: heroContent,
    });
  } catch (error) {
    next(error);
  }
};

export const getHeroContentByPage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page } = req.params;
    const heroContent = await HeroContent.findOne({ page });
    
    if (!heroContent) {
      return res.status(404).json({
        success: false,
        message: 'Hero content not found for this page',
      });
    }

    res.json({
      success: true,
      data: heroContent,
    });
  } catch (error) {
    next(error);
  }
};

export const createHeroContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const heroContent = await HeroContent.create(req.body);
    res.status(201).json({
      success: true,
      data: heroContent,
    });
  } catch (error) {
    next(error);
  }
};

export const updateHeroContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const heroContent = await HeroContent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!heroContent) {
      return res.status(404).json({
        success: false,
        message: 'Hero content not found',
      });
    }

    res.json({
      success: true,
      data: heroContent,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteHeroContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const heroContent = await HeroContent.findByIdAndDelete(req.params.id);

    if (!heroContent) {
      return res.status(404).json({
        success: false,
        message: 'Hero content not found',
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
