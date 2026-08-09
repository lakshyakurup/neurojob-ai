import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function analyzeResumeWithGemini(resume: string, jd: string) {
  const prompt = `
    Analyze the following resume against the job description.
    Resume: ${resume}
    Job Description: ${jd}
    
    Return a structured JSON object with matchScore (0-100), missingKeywords (array), strengths (array), weaknesses (array), tailoredCoverLetter (string), and interviewQuestions (array).
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  return response.text;
}
