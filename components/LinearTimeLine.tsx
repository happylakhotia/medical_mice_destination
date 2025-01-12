

interface LinearTimelineProps {
  currentStep: number;
  steps: string[];
}

export const LinearTimeline: React.FC<LinearTimelineProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((step, index) => {
        const isActive = index <= currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex items-center">
            {/* Step Indicator */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
                         ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}
                         ${isCurrent ? 'ring-4 ring-blue-300' : ''}`}
            >
              {index + 1}
            </div>

            {/* Step Name */}
            <div
              className={`text-sm mt-2 ${
                isActive ? 'text-blue-500' : 'text-gray-600'
              }`}
            >
              {step}
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  isActive ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

