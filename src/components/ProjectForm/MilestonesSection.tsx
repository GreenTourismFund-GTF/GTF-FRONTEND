// components/ProjectForm/MilestonesSection.tsx

import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import { Plus, X } from 'lucide-react';
import { Milestone, MilestonesProps } from '../../lib/types';

export const MilestonesSection: React.FC<MilestonesProps> = ({
    milestones,
    onMilestonesChange,
}) => {
    const addMilestone = () => {
        onMilestonesChange([...milestones, { title: '', status: 'upcoming' }]);
    };

    const updateMilestone = (index: number, field: keyof Milestone, value: string) => {
        const newMilestones = [...milestones];
        newMilestones[index] = {
            ...newMilestones[index],
            [field]: value,
        };
        onMilestonesChange(newMilestones);
    };

    const removeMilestone = (index: number) => {
        onMilestonesChange(milestones.filter((_, i) => i !== index));
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Project Milestones</h2>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="flex gap-4">
                            <Input
                                value={milestone.title}
                                onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                                placeholder="Milestone title"
                                className="flex-1"
                            />
                            <Select
                                value={milestone.status}
                                onValueChange={(value: Milestone['status']) => 
                                    updateMilestone(index, 'status', value)
                                }
                            >
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="upcoming">Upcoming</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => removeMilestone(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button 
                        type="button" 
                        onClick={addMilestone}
                        className="w-full md:w-auto"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Milestone
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};