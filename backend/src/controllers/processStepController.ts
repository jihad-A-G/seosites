import { Request, Response, NextFunction } from 'express';
import ProcessStep from '../models/ProcessStep';

export const getAllProcessSteps = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const processSteps = await ProcessStep.find().sort({ order: 1 });
    res.json({
      success: true,
      data: processSteps,
    });
  } catch (error) {
    next(error);
  }
};

export const createProcessStep = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const processStep = await ProcessStep.create(req.body);
    res.status(201).json({
      success: true,
      data: processStep,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProcessStep = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const processStep = await ProcessStep.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!processStep) {
      return res.status(404).json({
        success: false,
        message: 'Process step not found',
      });
    }

    res.json({
      success: true,
      data: processStep,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProcessStep = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const processStep = await ProcessStep.findByIdAndDelete(req.params.id);

    if (!processStep) {
      return res.status(404).json({
        success: false,
        message: 'Process step not found',
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
