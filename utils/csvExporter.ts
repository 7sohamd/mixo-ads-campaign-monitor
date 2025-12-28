import { Campaign } from '../types';

export const exportCampaignsCsv = (campaigns: Campaign[]) => {
    if (campaigns.length === 0) return;

    const headers = ['ID', 'Name', 'Status', 'Budget', 'Daily Budget', 'Platforms', 'Created At'];
    const rows = campaigns.map(c => [
        c.id, `"${c.name}"`, c.status, c.budget, c.daily_budget, `"${c.platforms.join(', ')}"`, c.created_at
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `mixo_ads_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
