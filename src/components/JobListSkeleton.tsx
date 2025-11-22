"use client";

interface JobListSkeletonProps {
  count?: number;
}

export default function JobListSkeleton({ count = 5 }: JobListSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse flex flex-col bg-gray-800 rounded-lg p-4">
          <div className="h-6 w-3/4 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-700 rounded mb-2"></div>
          <div className="h-3 w-full bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}
