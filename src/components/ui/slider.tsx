import * as React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  className?: string;
}

export function Slider({ min, max, step, value, onValueChange, className }: SliderProps) {
  const handleChange = (index: number, newValue: number) => {
    const newValues = [...value];
    newValues[index] = newValue;
    if (index === 0 && newValues[0] > newValues[1]) {
      newValues[0] = newValues[1];
    }
    if (index === 1 && newValues[1] < newValues[0]) {
      newValues[1] = newValues[0];
    }
    onValueChange(newValues);
  };

  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative h-2 bg-secondary rounded-full">
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{
            left: `${((value[0] - min) / (max - min)) * 100}%`,
            right: `${100 - ((value[1] - min) / (max - min)) * 100}%`,
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => handleChange(0, Number(e.target.value))}
        className="absolute w-full h-2 opacity-0 cursor-pointer top-0"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1]}
        onChange={(e) => handleChange(1, Number(e.target.value))}
        className="absolute w-full h-2 opacity-0 cursor-pointer top-0"
      />
    </div>
  );
}
