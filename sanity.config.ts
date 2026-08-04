'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes/index,';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    require('@tailwindcss/typography'),
    visionTool({ defaultApiVersion: apiVersion }), // run raw GROQ queries for debugging
  ],
});