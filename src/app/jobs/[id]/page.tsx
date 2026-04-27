import { jobs } from '@/data/jobs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/components/Logo';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);
  if (!job) return { title: 'Job Not Found' };

  return {
    title: `${job.title} at ${job.company} | JOBINOCULARS`,
    description: job.fullDescription,
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.fullDescription,
      images: [`https://logo.clearbit.com/${job.companyDomain}`],
    },
  };
}

export default async function JobPage({ params }: Props) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    'title': job.title,
    'description': job.fullDescription,
    'identifier': {
      '@type': 'PropertyValue',
      'name': job.company,
      'value': job.id,
    },
    'datePosted': job.postedAt,
    'validThrough': '2027-01-01',
    'employmentType': job.type.toUpperCase().replace('-', '_'),
    'hiringOrganization': {
      '@type': 'Organization',
      'name': job.company,
      'sameAs': `https://${job.companyDomain}`,
      'logo': `https://logo.clearbit.com/${job.companyDomain}`,
    },
    'experienceRequirements': {
      '@type': 'OccupationalExperienceRequirements',
      'monthsOfExperience': job.experience === 'Entry' ? 0 : job.experience === 'Mid' ? 24 : 60,
    },
    'jobLocation': {
      '@type': 'Place',
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': job.location,
        'addressRegion': '',
        'postalCode': '',
        'addressCountry': 'US',
      },
    },
    'baseSalary': job.salary ? {
      '@type': 'MonetaryAmount',
      'currency': 'USD',
      'value': {
        '@type': 'QuantitativeValue',
        'value': job.salary,
        'unitText': 'HOUR',
      },
    } : undefined,
  };

  const fallbackLogo = `https://unavatar.io/clearbit/${job.companyDomain}?fallback=https://www.google.com/s2/favicons?domain=${job.companyDomain}&sz=128`;

  return (
    <div style={{ paddingTop: '2rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav style={{ marginBottom: '3rem' }}>
        <Link href="/" className="button" style={{ fontSize: '1.25rem', padding: '0.75rem 1.5rem' }}>
          ← BACK TO HOME
        </Link>
      </nav>
      
      <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          border: 'var(--border-width) solid var(--border)', 
          background: '#ffffff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '4px 4px 0px 0px var(--border)',
          padding: '0'
        }}>
          <Logo 
            src={`/logos/${job.companySlug}.png`}
            fallback={fallbackLogo}
            alt={`${job.company} logo`}
            companyName={job.company}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div>
          <span className="mono badge">{job.company}</span>
          <h1 style={{ margin: '0.5rem 0', fontSize: 'clamp(2rem, 5vw, 3rem)' }}>{job.title}</h1>
          <p className="mono" style={{ fontSize: '1.25rem' }}>{job.location} • {job.type} • {job.experience} • {job.salary}</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
        <article>
          <section style={{ marginBottom: '3rem' }}>
            <h2>Description</h2>
            <p style={{ lineHeight: 1.8, fontSize: '1.1rem' }}>{job.fullDescription}</p>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h2>Responsibilities</h2>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
              {job.responsibilities.map((res, i) => (
                <li key={i}>{res}</li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h2>Requirements</h2>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h2>Benefits</h2>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: 2 }}>
              {job.benefits.map((ben, i) => (
                <li key={i}>{ben}</li>
              ))}
            </ul>
          </section>
        </article>

        <aside>
          <div className="card" style={{ position: 'sticky', top: '2rem' }}>
            <h3 className="mono" style={{ marginBottom: '1rem' }}>Quick Apply</h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              Apply directly on the official {job.company} careers portal.
            </p>
            <a href={`/apply/${job.id}`} target="_blank" rel="noopener noreferrer" className="button" style={{ width: '100%', textAlign: 'center' }}>
              GO TO APPLICATION
            </a>
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <p className="mono" style={{ fontSize: '0.75rem' }}>Posted on {new Date(job.postedAt).toLocaleDateString()}</p>
              <p className="mono" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>ID: {job.id}</p>
            </div>
          </div>
        </aside>
      </div>

      <div style={{ marginTop: '4rem', borderTop: 'var(--border-width) solid var(--border)', paddingTop: '2rem' }}>
        <a href="/" className="mono">← BACK TO ALL JOBS</a>
      </div>
    </div>
  );
}
