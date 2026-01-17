import { Request, Response, NextFunction } from 'express';
import Technology from '../models/Technology';

// @desc    Get all technologies grouped by category
// @route   GET /api/technologies
// @access  Public
export const getTechnologies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technologies = await Technology.find().sort({ category: 1, proficiency: -1 });
    
    // Group by category
    const grouped = technologies.reduce((acc: any, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    }, {});
    
    res.status(200).json({
      success: true,
      count: technologies.length,
      data: grouped,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get single technology
// @route   GET /api/technologies/:id
// @access  Public
export const getTechnology = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technology = await Technology.findById(req.params.id);
    
    if (!technology) {
      return res.status(404).json({
        success: false,
        message: 'Technology not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: technology,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Create technology
// @route   POST /api/technologies
// @access  Private
export const createTechnology = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technology = await Technology.create(req.body);
    
    res.status(201).json({
      success: true,
      data: technology,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Update technology
// @route   PUT /api/technologies/:id
// @access  Private
export const updateTechnology = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technology = await Technology.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!technology) {
      return res.status(404).json({
        success: false,
        message: 'Technology not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: technology,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Delete technology
// @route   DELETE /api/technologies/:id
// @access  Private
export const deleteTechnology = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const technology = await Technology.findByIdAndDelete(req.params.id);
    
    if (!technology) {
      return res.status(404).json({
        success: false,
        message: 'Technology not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Technology deleted successfully',
    });
  } catch (error: any) {
    next(error);
  }
};
