import { GoogleGenAI } from '@google/genai';

// Initialize Gemini AI client
const ai = new GoogleGenAI({
  apiKey: "AIzaSyByHnJ2AlX7vpkHgxHwWE27Ba9H5OaPS-o"  
});

/**
 * Score CV using Gemini AI
 * @param {string} cvText - Applicant CV text
 * @param {string} jobDescription - Job description text
 * @returns {number} score between 0-100
 */
export const aiScore = async (cvText, jobDescription) => {
    try {
        const prompt = `
You are an HR AI scoring assistant.
Evaluate the following applicant CV based on the job description.
Score the applicant from 0 to 100 based on skills, experience, and relevance.

Job Description: ${jobDescription}

Applicant CV: ${cvText}

Respond with only a number between 0 and 100.
`;

        // Make a request using the models API
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',       // recommended model
            contents: prompt
        });

        // The SDK returns result.text
        const textResponse = response.text?.trim();
        const score = parseInt(textResponse, 10);

        if (isNaN(score)) return 0;
        return Math.min(Math.max(score, 0), 100);

    } catch (error) {
        console.error('AI scoring error:', error);
        return 0;
    }
};
