// import * as express from 'express';

import type { Types } from 'mongoose';
// import type { Multer } from 'multer';

declare global {
  namespace Express {
    interface Request {
      userId?: Types.ObjectId;
      file?: Express.Multer.File;
      files?: Express.Multer.File[];
      params?: Express.Request['params'] & { id?: string };
    }
  }
}
