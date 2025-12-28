import React from 'react';
import { Campaign, InsightsResponse } from '../types';
import { api } from '../services/api';
import { getAiAdvisorFeedback } from '../services/gemini';

export const useDashboardData = () => {
    const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
    const [insightsResponse, setInsightsResponse] = React.useState<InsightsResponse | null>(null);
    const [comparisonData, setComparisonData] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [aiAdvice, setAiAdvice] = React.useState<any[]>([]);
    const [isAiLoading, setIsAiLoading] = React.useState(false);

    const fetchData = React.useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [campData, insightData] = await Promise.all([
                api.getCampaigns(),
                api.getInsights()
            ]);

            const campaignsList = campData?.campaigns || [];
            setCampaigns(campaignsList);
            setInsightsResponse(insightData);

            if (campaignsList.length > 0) {
                const topPool = [...campaignsList]
                    .sort((a, b) => b.budget - a.budget)
                    .slice(0, 14);

                const realInsightsPromises = topPool.map(c => api.getCampaignInsights(c.id).catch(() => null));
                const realInsightsResults = await Promise.all(realInsightsPromises);

                const chartData = realInsightsResults
                    .map((res, index) => {
                        if (!res || !res.insights) return null;
                        return {
                            id: topPool[index].id,
                            name: topPool[index].name,
                            spend: res.insights.spend,
                            conversions: res.insights.conversions,
                            roi: res.insights.conversions / (res.insights.spend || 1)
                        };
                    })
                    .filter(Boolean)
                    .sort((a, b) => b.roi - a.roi);

                setComparisonData(chartData);
            }

            if (campaignsList.length > 0 && insightData) {
                setIsAiLoading(true);
                const advice = await getAiAdvisorFeedback(campaignsList, insightData);
                setAiAdvice(advice);
                setIsAiLoading(false);
            }
        } catch (err: any) {
            console.error("Dashboard fetch error:", err);
            setError(err.message || "Failed to load dashboard data.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        campaigns,
        insightsResponse,
        comparisonData,
        isLoading,
        error,
        aiAdvice,
        isAiLoading,
        fetchData
    };
};
