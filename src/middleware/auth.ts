import { Request, Response, NextFunction } from 'express';
import { Kysely } from 'kysely';
import { db } from '../db/database.js';
import { error } from 'console';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // TODO: Student implementation - Part 1: Authentication Middleware
  // Store the authenticated userId on res.locals.userId
  const header = req.get('X-User-Id');



  if(!header){
    res.status(401).json({error: '401: Unauthorized'});
    return;
  }
  const uid = Number(header);
  if(!Number.isInteger(uid) || uid <= 0){
    res.status(401).json({ error: '401: Unauthorized'})
    return;
  }
  
  res.locals.user_id = uid;
  next();
}

export default authMiddleware;
