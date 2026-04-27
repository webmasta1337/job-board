'use client';

import { useState, useMemo } from 'react';
import { jobs } from '@/data/jobs';
import JobCard from '@/components/JobCard';
import Filters from '@/components/Filters';

export default function Home() {
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  const locations = useMemo(() => Array.from(new Set(jobs.map(j => j.location))), []);
  const types = useMemo(() => Array.from(new Set(jobs.map(j => j.type))), []);
  const experiences = useMemo(() => ['Entry', 'Mid', 'Senior'], []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchLocation = locationFilter 
        ? job.location.toLowerCase().includes(locationFilter.toLowerCase()) 
        : true;
      const matchType = typeFilter ? job.type === typeFilter : true;
      const matchExperience = experienceFilter ? job.experience === experienceFilter : true;
      const matchSearch = searchFilter 
        ? (job.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
           job.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
           job.description.toLowerCase().includes(searchFilter.toLowerCase()))
        : true;
      
      return matchLocation && matchType && matchExperience && matchSearch;
    });
  }, [locationFilter, typeFilter, experienceFilter, searchFilter]);

  return (
    <div style={{ paddingTop: '4rem' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <img src="/logos/binoculars.png" alt="JOBINOCULARS Logo" style={{ width: '64px', height: '64px', objectFit: 'contain' }} />
          <h1 style={{ margin: 0, letterSpacing: '-2px' }}>JOBINOCULARS</h1>
        </div>
        <p className="mono" style={{ fontSize: '1.5rem', maxWidth: '800px', lineHeight: 1.4, marginBottom: '1.5rem' }}>
          We watch the internet for open job listings. <span style={{ background: 'var(--foreground)', color: 'var(--background)', padding: '0 0.5rem' }}>AND AUTOMATICALLY POST THEM HERE.</span>
        </p>
        <p className="mono" style={{ opacity: 0.6 }}>CLEAN. SIMPLE. AUTOMATED.</p>
      </header>

      <Filters 
        locations={locations} 
        types={types} 
        experiences={experiences}
        onLocationChange={setLocationFilter} 
        onTypeChange={setTypeFilter} 
        onExperienceChange={setExperienceFilter}
        onSearchChange={setSearchFilter}
      />

      <section>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'baseline', 
          marginBottom: '3rem',
          borderBottom: 'var(--border-width) solid var(--border)',
          paddingBottom: '1rem'
        }}>
          <h2 className="mono" style={{ fontSize: '1.5rem', margin: 0 }}>
            {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Available
          </h2>
          <span className="mono" style={{ opacity: 0.6 }}>Updated Every 24 Hours</span>
        </div>

        {filteredJobs.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <h3 className="mono" style={{ fontSize: '2rem', marginBottom: '2rem' }}>No jobs found matching your criteria.</h3>
            <button onClick={() => { setLocationFilter(''); setTypeFilter(''); setExperienceFilter(''); setSearchFilter(''); }} className="button">
              CLEAR ALL FILTERS
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
