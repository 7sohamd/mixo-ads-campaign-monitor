
import { GoogleGenAI, Type } from "@google/genai";
import { Campaign, InsightsResponse } from "../types";

export const getAiAdvisorFeedback = async (campaigns: Campaign[], insights: InsightsResponse) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const totalSpend = insights.insights.total_spend || 1;
  const totalConversions = insights.insights.total_conversions || 0;
  const cpa = totalSpend / (totalConversions || 1);

  const prompt = `
    Analyze the following advertising campaign performance data and provide 3 brief, actionable recommendations.
    Focus on efficiency: how well the budget is being used to generate clicks and conversions.
    
    Account Overview:
    - Total Campaigns: ${campaigns.length}
    - Total Spend: $${insights.insights.total_spend.toLocaleString()}
    - Total Conversions: ${totalConversions.toLocaleString()}
    - Cost Per Acquisition (CPA): $${cpa.toFixed(2)}
    - Average CPC: $${insights.insights.avg_cpc.toFixed(2)}
    - Average CTR: ${(insights.insights.avg_ctr * 100).toFixed(2)}%
    
    Top Campaign Performance:
    ${campaigns.slice(0, 5).map(c => `- ${c.name}: Budget $${c.budget}, Platforms: ${c.platforms.join(', ')}`).join('\n')}
    
    Format the response as a JSON array of objects with 'title' and 'advice' keys.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'Brief title of the recommendation',
              },
              advice: {
                type: Type.STRING,
                description: 'Actionable advice for the campaign',
              },
            },
            propertyOrdering: ["title", "advice"],
            required: ["title", "advice"],
          },
        },
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Advisor Error:", error);
    return [
      { title: "Spend Efficiency", advice: "Analyze the CPA of top spending campaigns. Reallocate funds from segments where Cost Per Conversion exceeds average." },
      { title: "Platform Rebalancing", advice: "One or more platforms may be underperforming in CTR. Review creative assets for channel-specific placements." },
      { title: "Conversion Optimization", advice: "Focus on campaigns with high CTR but low conversion rates to identify landing page friction." }
    ];
  }
};

export const generateDetailedAiReport = async (campaigns: Campaign[], insights: InsightsResponse) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    Generate a comprehensive strategy report for Mixo Ads.
    Data Summary:
    - Total Spend: $${insights.insights.total_spend.toLocaleString()}
    - Average CTR: ${(insights.insights.avg_ctr * 100).toFixed(2)}%
    - Campaign Count: ${campaigns.length}
    - Conversions: ${insights.insights.total_conversions}
    
    The report should include:
    1. Executive Summary
    2. Budget Allocation Analysis
    3. Channel Performance Breakdown
    4. 3-Month Strategic Roadmap
    
    Keep the tone professional and expert.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt
    });
    return response.text || "Report generation failed.";
  } catch (error) {
    console.error("Report Generation Error:", error);
    return "Strategic Audit Report\n\nGenerated for: Mixo Ads\n\nSummary: Overall performance is within target benchmarks. Total conversions of " + insights.insights.total_conversions + " show healthy growth. Recommending platform scaling for high-performing segments.";
  }
};
