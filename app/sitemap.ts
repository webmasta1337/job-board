import { MetadataRoute } from 'next';
import { jobs } from '@/data/jobs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jobinoculars.com';

  const jobUrls = jobs.map((job) => ({
    url: `${baseUrl}/jobs/${job.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...jobUrls,
  ];
}
