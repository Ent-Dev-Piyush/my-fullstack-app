import { rateLimit } from 'express-rate-limit'

export const appLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, 
	limit: 100, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})

export const authLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, 
	limit: 30, 
	standardHeaders: 'draft-8', 
	legacyHeaders: false, 
})