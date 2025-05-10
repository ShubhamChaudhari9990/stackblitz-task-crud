export interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'completed'
    priority?: 'low' | 'medium' | 'high'
    dueDate?: Date;
    createdAt: Date;
    updatedAt?: Date;
}
  