const CircularProgress = ({
  completed = 100,
  inProgress = 50,
  pending = 50,
}) => {
  const radius = 90; /* 60 */
  const circumference = 2 * Math.PI * radius;
  const total = completed + inProgress + pending;
  const completedLength = (completed / total) * circumference;
  const inProgressLength = (inProgress / total) * circumference;
  const pendingLength = (pending / total) * circumference;

  return (
    <div className="flex items-center gap-6 p-2">
      {/* CIRCLE */}
      <div className="relative w-60 h-60"> 
        <svg className="w-full h-full -rotate-90">
          {/* Completed */}
        <circle
            cx="120"
            cy="120"  
            r={radius}
            fill="none"
            stroke="#1F4D3A"
            strokeWidth="24"
            strokeDasharray={`${completedLength} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
          />

          {/* In Progress */}
         <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="#479273"
            strokeWidth="24"
            strokeDasharray={`${inProgressLength} ${circumference}`}
            strokeDashoffset={-completedLength}
            strokeLinecap="round"
          />

          {/* Pending */}
          <circle
            cx="120"
            cy="120"
            r={radius}
            fill="none"
            stroke="#83d4b2"
            strokeWidth="24"
            strokeDasharray={`${pendingLength} ${circumference}`}
            strokeDashoffset={-(completedLength + inProgressLength)}
            strokeLinecap="round"
            
          />
        </svg>

        {/* CENTER LABEL */}
        <div className="absolute inset-0 flex items-center justify-center text-xl">
          Orders
        </div>
      </div>

      {/* KEY */}
      <div className="text-sm space-y-2 ">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#1F4D3A]" />
          Completed
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#479273]" />
          In Progress
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#83d4b2]" />
          Pending
        </div>
      </div>
      
    </div>
  );
};

export default CircularProgress
