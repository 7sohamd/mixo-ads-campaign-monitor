
import { CampaignsResponse, InsightsResponse, Campaign, CampaignInsightsResponse } from '../types';

const BASE_URL = 'https://mixo-fe-backend-task.vercel.app';

class ApiService {
  private async fetchWithRetry<T>(url: string, retries = 3, backoff = 1000): Promise<T> {
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          await new Promise(resolve => setTimeout(resolve, backoff));
          return this.fetchWithRetry(url, retries - 1, backoff * 2);
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, backoff));
        return this.fetchWithRetry(url, retries - 1, backoff * 2);
      }
      throw error;
    }
  }

  async getCampaigns(): Promise<CampaignsResponse> {
    return this.fetchWithRetry<CampaignsResponse>(`${BASE_URL}/campaigns`);
  }

  async getCampaignById(id: string): Promise<{ campaign: Campaign }> {
    return this.fetchWithRetry<{ campaign: Campaign }>(`${BASE_URL}/campaigns/${id}`);
  }

  async getInsights(): Promise<InsightsResponse> {
    return this.fetchWithRetry<InsightsResponse>(`${BASE_URL}/campaigns/insights`);
  }

  async getCampaignInsights(id: string): Promise<CampaignInsightsResponse> {
    return this.fetchWithRetry<CampaignInsightsResponse>(`${BASE_URL}/campaigns/${id}/insights`);
  }
}

export const api = new ApiService();
