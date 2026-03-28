'use server';
/**
 * @fileOverview This flow provides AI-powered code detection for Git repositories.
 *
 * - detectCodebaseConfiguration - A function that analyzes repository content to suggest build/start commands and root directory.
 * - AiSmartCodeDetectionInput - The input type for the detectCodebaseConfiguration function.
 * - AiSmartCodeDetectionOutput - The return type for the detectCodebaseConfiguration function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSmartCodeDetectionInputSchema = z.object({
  repoSummary: z
    .string()
    .describe(
      'A summary of the Git repository content, including detected manifest files and primary language indicators.'
    ),
  packageJsonContent: z
    .string()
    .optional()
    .describe('Content of the package.json file, if found.'),
  requirementsTxtContent: z
    .string()
    .optional()
    .describe('Content of the requirements.txt file, if found.'),
  goModContent: z
    .string()
    .optional()
    .describe('Content of the go.mod file, if found.'),
  dockerfileContent: z
    .string()
    .optional()
    .describe('Content of the Dockerfile, if found.'),
  composerJsonContent: z
    .string()
    .optional()
    .describe('Content of the composer.json file, if found.'),
  pomXmlContent: z
    .string()
    .optional()
    .describe('Content of the pom.xml file, if found.'),
  indexHtmlDetected: z
    .boolean()
    .optional()
    .describe('True if an index.html file is detected, indicating a static site.'),
});
export type AiSmartCodeDetectionInput = z.infer<
  typeof AiSmartCodeDetectionInputSchema
>;

const AiSmartCodeDetectionOutputSchema = z.object({
  detectedLanguage: z
    .string()
    .describe(
      'The detected primary programming language or technology (e.g., Node.js, Python, Go, Static HTML).'
    ),
  detectedFramework: z
    .string()
    .optional()
    .describe(
      'The detected framework or library used (e.g., Express, React, Django, Flask, Next.js).'
    ),
  buildCommand: z
    .string()
    .describe(
      'The suggested command to build the application (e.g., npm install && npm run build, pip install -r requirements.txt).'
    ),
  startCommand: z
    .string()
    .describe(
      'The suggested command to start the application (e.g., npm start, python app.py, ./my-app).'
    ),
  rootDirectory: z
    .string()
    .describe(
      'The suggested root directory for the application relative to the repository root (e.g., ., ./frontend, ./backend).'
    ),
  confidenceScore: z
    .number()
    .min(0)
    .max(100)
    .describe('Confidence score (0-100) for the detection.'),
  explanation: z
    .string()
    .optional()
    .describe('An explanation of why these suggestions were made.'),
});
export type AiSmartCodeDetectionOutput = z.infer<
  typeof AiSmartCodeDetectionOutputSchema
>;

export async function detectCodebaseConfiguration(
  input: AiSmartCodeDetectionInput
): Promise<AiSmartCodeDetectionOutput> {
  return aiSmartCodeDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSmartCodeDetectionPrompt',
  input: {schema: AiSmartCodeDetectionInputSchema},
  output: {schema: AiSmartCodeDetectionOutputSchema},
  prompt: `You are an expert developer and a highly intelligent code analysis tool.
Your task is to analyze the provided repository summary and file contents to intelligently detect the programming language, framework, and suggest appropriate build and start commands, along with the most likely root directory for the application.

Consider the following information about the repository:

Repository Summary: {{{repoSummary}}}

{{#if packageJsonContent}}
package.json content:
'''json
{{{packageJsonContent}}}
'''
{{/if}}

{{#if requirementsTxtContent}}
requirements.txt content:
'''text
{{{requirementsTxtContent}}}
'''
{{/if}}

{{#if goModContent}}
go.mod content:
'''text
{{{goModContent}}}
'''
{{/if}}

{{#if dockerfileContent}}
Dockerfile content:
'''dockerfile
{{{dockerfileContent}}}
'''
{{/if}}

{{#if composerJsonContent}}
composer.json content:
'''json
{{{composerJsonContent}}}
'''
{{/if}}

{{#if pomXmlContent}}
pom.xml content:
'''xml
{{{pomXmlContent}}}
'''
{{/if}}

{{#if indexHtmlDetected}}
An index.html file was detected, suggesting a static site.
{{/if}}

Based on the above, please provide:
1. The detected primary programming language or technology.
2. The detected framework or library (if applicable).
3. The command to build the application for production (e.g., install dependencies, compile code).
4. The command to start the application after building.
5. The root directory for the application relative to the repository root (use '.' if the app is at the root).
6. A confidence score (0-100) for your detection.
7. A brief explanation for your suggestions.

Prioritize standard conventions and common practices for each detected language/framework.
If a Dockerfile is present, consider its contents for build/start commands but also provide native commands.
If multiple languages/frameworks are detected (e.g., monorepo), focus on the *primary* application the user would likely want to deploy and suggest its commands and root directory.

Example Output for a Node.js project:
{
  "detectedLanguage": "Node.js",
  "detectedFramework": "Express",
  "buildCommand": "npm install",
  "startCommand": "npm start",
  "rootDirectory": ".",
  "confidenceScore": 95,
  "explanation": "Detected package.json with start script and Express dependency."
}

Example Output for a Python project with requirements.txt:
{
  "detectedLanguage": "Python",
  "detectedFramework": "Flask",
  "buildCommand": "pip install -r requirements.txt",
  "startCommand": "python app.py",
  "rootDirectory": ".",
  "confidenceScore": 90,
  "explanation": "Detected requirements.txt and a common Flask entry point."
}

Example Output for a Go project:
{
  "detectedLanguage": "Go",
  "detectedFramework": "",
  "buildCommand": "go mod tidy && go build -o app .",
  "startCommand": "./app",
  "rootDirectory": ".",
  "confidenceScore": 88,
  "explanation": "Detected go.mod and standard Go build process."
}

Example Output for a static HTML project:
{
  "detectedLanguage": "Static HTML",
  "detectedFramework": "",
  "buildCommand": "",
  "startCommand": "",
  "rootDirectory": ".",
  "confidenceScore": 98,
  "explanation": "An index.html file was detected at the root."
}

If a Dockerfile is present and seems to be the primary build/run mechanism, emphasize that in the explanation.
If no clear application type is detected, suggest basic commands and a low confidence score.
Remember to output only the JSON object as specified by the output schema.
`,
});

const aiSmartCodeDetectionFlow = ai.defineFlow(
  {
    name: 'aiSmartCodeDetectionFlow',
    inputSchema: AiSmartCodeDetectionInputSchema,
    outputSchema: AiSmartCodeDetectionOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
