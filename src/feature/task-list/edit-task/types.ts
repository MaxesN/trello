enum PriorityColors {
  High = 'high',
  Medium = 'medium',
  Low = 'low',
}

export const priorityColors: Record<PriorityColors, string> = {
  [PriorityColors.High]: 'bg-red-500 hover:bg-red-600',
  [PriorityColors.Medium]: 'bg-yellow-400 hover:bg-yellow-500',
  [PriorityColors.Low]: 'bg-green-400 hover:bg-green-500',
}
