import { Request, Response, NextFunction } from 'express';
import Testimonial from '../models/Testimonial';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonials = await Testimonial.find().sort({ rating: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get featured testimonials
// @route   GET /api/testimonials/featured
// @access  Public
export const getFeaturedTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonials = await Testimonial.find({ featured: true })
      .sort({ rating: -1, createdAt: -1 })
      .limit(6);
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get single testimonial
// @route   GET /api/testimonials/:id
// @access  Public
export const getTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Create testimonial
// @route   POST /api/testimonials
// @access  Private
export const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    
    res.status(201).json({
      success: true,
      data: testimonial,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
export const updateTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }
    
    res.status(200).json({
      success: true,
      data: testimonial,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      return res.status(404).json({
        success: false,
        message: 'Testimonial not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error: any) {
    next(error);
  }
};
