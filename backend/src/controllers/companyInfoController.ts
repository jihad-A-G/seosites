import { Request, Response, NextFunction } from 'express';
import CompanyInfo from '../models/CompanyInfo';

export const getCompanyInfo = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    let companyInfo = await CompanyInfo.findOne();
    
    // Create default if doesn't exist
    if (!companyInfo) {
      companyInfo = await CompanyInfo.create({
        name: 'seosites',
        foundedYear: 2014,
      });
    }

    res.json({
      success: true,
      data: companyInfo,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompanyInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let companyInfo = await CompanyInfo.findOne();

    if (!companyInfo) {
      companyInfo = await CompanyInfo.create(req.body);
    } else {
      companyInfo = await CompanyInfo.findByIdAndUpdate(companyInfo._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.json({
      success: true,
      data: companyInfo,
    });
  } catch (error) {
    next(error);
  }
};
