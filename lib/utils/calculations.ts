import { MarketingRecord, RegionAggregate } from '@/types/dashboard';

export function calculateCTR(conversions: number, impressions: number): number {
  if (impressions === 0) return 0;
  return (conversions / impressions) * 100;
}

export function aggregateByRegion(data: MarketingRecord[]): RegionAggregate[] {
  const regionMap = new Map<string, RegionAggregate>();

  data.forEach((record) => {
    const existing = regionMap.get(record.region);
    if (existing) {
      existing.spend += record.spend;
      existing.impressions += record.impressions;
      existing.conversions += record.conversions;
      existing.clicks += record.clicks;
      existing.channels.push(record);
    } else {
      regionMap.set(record.region, {
        region: record.region,
        spend: record.spend,
        impressions: record.impressions,
        conversions: record.conversions,
        clicks: record.clicks,
        channels: [record],
      });
    }
  });

  return Array.from(regionMap.values());
}

export interface ChannelAggregate {
  channel: string;
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
}

export function aggregateByChannel(data: MarketingRecord[]): ChannelAggregate[] {
  const channelMap = new Map<string, ChannelAggregate>();

  data.forEach((record) => {
    const existing = channelMap.get(record.channel);
    if (existing) {
      existing.spend += record.spend;
      existing.impressions += record.impressions;
      existing.conversions += record.conversions;
      existing.clicks += record.clicks;
    } else {
      channelMap.set(record.channel, {
        channel: record.channel,
        spend: record.spend,
        impressions: record.impressions,
        conversions: record.conversions,
        clicks: record.clicks,
      });
    }
  });

  return Array.from(channelMap.values());
}

export function aggregateChannelsByRegion(
  records: MarketingRecord[]
): Map<string, MarketingRecord[]> {
  const channelMap = new Map<string, MarketingRecord[]>();

  records.forEach((record) => {
    const key = `${record.region}-${record.channel}`;
    const existing = channelMap.get(key);
    if (existing) {
      existing.push(record);
    } else {
      channelMap.set(key, [record]);
    }
  });

  return channelMap;
}

export function calculateChannelTotals(records: MarketingRecord[]): {
  spend: number;
  impressions: number;
  conversions: number;
  clicks: number;
} {
  return records.reduce(
    (acc, record) => ({
      spend: acc.spend + record.spend,
      impressions: acc.impressions + record.impressions,
      conversions: acc.conversions + record.conversions,
      clicks: acc.clicks + record.clicks,
    }),
    { spend: 0, impressions: 0, conversions: 0, clicks: 0 }
  );
}
