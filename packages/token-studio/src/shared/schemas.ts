import { z } from 'zod';
import { SUPPORTED_TYPES } from './constants';

const supportedTypes = z.enum(SUPPORTED_TYPES);

export const createCategorySchema = z.object({
  name: z.string().trim().min(1),
  type: supportedTypes,
});

export const saveCategorySchema = z.object({
  document: z.record(z.string(), z.unknown()),
});

export const validateSchema = z.object({
  name: z.string().trim().min(1),
  document: z.record(z.string(), z.unknown()),
});
