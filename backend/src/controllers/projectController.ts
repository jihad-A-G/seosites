import { Request, Response, NextFunction } from 'express';
import Project from '../models/Project';
import fs from 'fs';
import path from 'path';

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, technology, featured } = req.query;
    
    const filter: {category?: string; technologies?: string; featured?: boolean} = {};
    
    if (category && typeof category === 'string') filter.category = category;
    if (technology && typeof technology === 'string') filter.technologies = technology;
    if (featured && typeof featured === 'string') filter.featured = featured === 'true';
    
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    next(error);
  }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find({ featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(6);
    
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    return next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    return next(error);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.create(req.body);
    
    return res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    return next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the existing project to compare images
    const existingProject = await Project.findById(req.params.id);
    
    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    
    // Find images that were removed
    const oldImages = existingProject.images || [];
    const newImages = req.body.images || [];
    const removedImages = oldImages.filter((img: string) => !newImages.includes(img));
    
    // Delete removed images from filesystem
    const uploadDir = path.join(__dirname, '../../uploads');
    removedImages.forEach((imageUrl: string) => {
      try {
        const filename = imageUrl.split('/').pop();
        if (filename) {
          const filePath = path.join(uploadDir, filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      } catch (error) {
        console.error('Error deleting image file:', error);
        // Continue even if deletion fails
      }
    });
    
    // Update the project
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    return next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    
    // Delete all associated images from filesystem
    const uploadDir = path.join(__dirname, '../../uploads');
    if (project.images && project.images.length > 0) {
      project.images.forEach((imageUrl: string) => {
        try {
          const filename = imageUrl.split('/').pop();
          if (filename) {
            const filePath = path.join(uploadDir, filename);
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        } catch (error) {
          console.error('Error deleting image file:', error);
          // Continue even if deletion fails
        }
      });
    }
    
    // Delete the project
    await Project.findByIdAndDelete(req.params.id);
    
    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    return next(error);
  }
};
