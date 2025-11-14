import JobCard from "./JobCard";

interface Job {
  description: string;
  id: number | string;
  title: string;
  location: string;
}

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  return (
    <section className="max-w-4xl mx-auto grid gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} id={job.id} title={job.title} location={job.location} description={job.description}/>
      ))}
    </section>
  );
}
