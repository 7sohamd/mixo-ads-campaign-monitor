import React from 'react';
import { Campaign, CampaignInsightsResponse } from '../types';
import { api } from '../services/api';

export const useCampaignDetails = () => {
    const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null);
    const [selectedInsights, setSelectedInsights] = React.useState<CampaignInsightsResponse['insights'] | null>(null);
    const [isDetailLoading, setIsDetailLoading] = React.useState(false);

    const handleSelectCampaign = React.useCallback(async (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        setIsDetailLoading(true);
        setSelectedInsights(null);
        try {
            const detailData = await api.getCampaignInsights(campaign.id);
            setSelectedInsights(detailData.insights);
        } catch (err) {
            console.error("Failed to fetch campaign insights", err);
        } finally {
            setIsDetailLoading(false);
        }
    }, []);

    const closeDetails = React.useCallback(() => setSelectedCampaign(null), []);

    return {
        selectedCampaign,
        selectedInsights,
        isDetailLoading,
        handleSelectCampaign,
        closeDetails
    };
};
