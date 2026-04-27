import { jobs } from '@/data/jobs';
import { redirect } from 'next/navigation';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    redirect('/');
  }

  // Redirect to the affiliate link
  redirect(job.link);
}
