'use client';

interface FiltersProps {
  onLocationChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  locations: string[];
  types: string[];
  experiences: string[];
}

export default function Filters({ 
  onLocationChange, 
  onTypeChange, 
  onExperienceChange, 
  onSearchChange, 
  locations, 
  types, 
  experiences 
}: FiltersProps) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
      gap: '1.5rem',
      marginBottom: '3rem',
      padding: '2rem',
      border: 'var(--border-width) solid var(--border)',
      background: 'var(--background)',
      boxShadow: 'var(--shadow)'
    }}>
      <div style={{ gridColumn: '1 / -1' }}>
        <label className="mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Search Jobs (Title, Company, or Keyword)</label>
        <input 
          type="text" 
          placeholder="e.g. Apple, Engineer, Remote..."
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
      <div>
        <label className="mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Location Search</label>
        <input 
          type="text" 
          placeholder="e.g. 90210 or Austin, TX"
          onChange={(e) => onLocationChange(e.target.value)}
        />
      </div>
      <div>
        <label className="mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Job Type</label>
        <select onChange={(e) => onTypeChange(e.target.value)}>
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mono" style={{ display: 'block', marginBottom: '0.5rem' }}>Experience</label>
        <select onChange={(e) => onExperienceChange(e.target.value)}>
          <option value="">All Levels</option>
          {experiences.map(exp => (
            <option key={exp} value={exp}>{exp}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
