import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function analyzeArchitecture(description: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        { 
          role: "system", 
          content: "You are a system architecture analyzer. Analyze the provided description and return a JSON response with the following structure: { 'components': [{ 'name': string, 'type': string, 'description': string, 'complexity': string }], 'suggestions': [string] }" 
        },
        { role: "user", content: description },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return {
      components: result.components || [],
      suggestions: result.suggestions || []
    };
  } catch (error) {
    console.error('Error analyzing architecture:', error);
    throw error;
  }
}

export async function getArchitectureSuggestions(components: any[]) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: "You are an expert system architect. Analyze the components and provide detailed suggestions for improvements. Return a JSON response with the following structure: { 'suggestions': [{ 'category': string, 'title': string, 'description': string, 'impact': string, 'effort': string, 'priority': number }], 'patterns': [{ 'name': string, 'applicability': string, 'benefits': string }], 'risks': [{ 'title': string, 'severity': string, 'mitigation': string }] }"
        },
        {
          role: "user",
          content: JSON.stringify(components)
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    return JSON.parse(completion.choices[0].message.content || '{}');
  } catch (error) {
    console.error('Error getting architecture suggestions:', error);
    throw error;
  }
}

export async function analyzeEmotion(text: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-2024-08-06",
      messages: [
        {
          role: "system",
          content: "You are an emotion analyzer. Analyze the emotional content of the text and return a JSON response with the following structure: { 'emotions': [{ 'name': string, 'intensity': number, 'confidence': number }], 'overall_sentiment': string, 'emotional_triggers': [string] }"
        },
        { role: "user", content: text }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return {
      emotions: result.emotions || [],
      overall_sentiment: result.overall_sentiment || '',
      emotional_triggers: result.emotional_triggers || []
    };
  } catch (error) {
    console.error('Error analyzing emotions:', error);
    throw error;
  }
}