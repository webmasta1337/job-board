import { Job } from '@/data/jobs';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function JobCard({ job }: { job: Job }) {
  const localLogo = `/logos/${job.companySlug}.png`;
  const fallbackLogo = `https://unavatar.io/clearbit/${job.companyDomain}?fallback=https://www.google.com/s2/favicons?domain=${job.companyDomain}&sz=128`;

  return (
    <article className="card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ 
          flexShrink: 0, 
          width: '64px', 
          height: '64px', 
          border: 'var(--border-width) solid var(--border)', 
          background: '#ffffff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '3px 3px 0px 0px var(--border)',
          padding: '0'
        }}>
          <Logo 
            src={localLogo}
            fallback={fallbackLogo}
            alt={`${job.company} logo`}
            companyName={job.company}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span className="mono badge" style={{ background: 'var(--foreground)', color: 'var(--background)' }}>{job.company}</span>
                <span className="mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>{job.category} • {job.experience}</span>
              </div>
              <Link href={`/jobs/${job.id}`}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', cursor: 'pointer', textDecoration: 'underline' }}>{job.title}</h3>
              </Link>
              <p className="mono" style={{ fontWeight: 'bold' }}>
                {job.location} • {job.type} • <span style={{ color: 'var(--accent)' }}>{job.salary}</span>
              </p>
            </div>
            <div className="mono" style={{ fontSize: '0.75rem', textAlign: 'right' }}>
              POSTED<br/>
              {new Date(job.postedAt).toLocaleDateString()}
            </div>
          </div>
          <div style={{ 
            background: 'rgba(0,0,0,0.03)', 
            padding: '1rem', 
            borderLeft: '4px solid var(--border)',
            marginBottom: '1.5rem'
          }}>
            <p style={{ lineHeight: 1.6, fontSize: '0.95rem', color: 'var(--foreground)', margin: 0 }}>
              {job.description}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href={`/jobs/${job.id}`} className="button" style={{ background: 'var(--background)', color: 'var(--foreground)', padding: '0.5rem 1rem', minWidth: '140px', textAlign: 'center' }}>
              DETAILS
            </Link>
            <a href={`/apply/${job.id}`} target="_blank" rel="noopener noreferrer" className="button" style={{ padding: '0.5rem 1rem', minWidth: '140px', textAlign: 'center' }}>
              QUICK APPLY
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
