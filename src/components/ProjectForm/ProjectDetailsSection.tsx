// components/ProjectForm/ProjectDetailsSection.tsx

import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import {
    FormItem,
    FormLabel,
    FormControl,
} from '../../components/ui/form';
import { ImpactLevel, ProjectCategory, ProjectDetailsProps } from '../../lib/types';

export const ProjectDetailsSection: React.FC<ProjectDetailsProps> = ({
    category,
    goal,
    location,
    duration,
    impact,
    onFieldChange,
}) => {
    const categories: ProjectCategory[] = ['Environment', 'Technology', 'Education', 'Healthcare'];
    const impactLevels: ImpactLevel[] = ['high', 'medium', 'low'];

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Project Details</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                            value={category}
                            onValueChange={(value) => onFieldChange('category', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Funding Goal ($)</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                min="0"
                                step="1000"
                                value={goal}
                                onChange={(e) => onFieldChange('goal', Number(e.target.value))}
                                placeholder="Enter funding goal"
                                required
                            />
                        </FormControl>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input
                                value={location}
                                onChange={(e) => onFieldChange('location', e.target.value)}
                                placeholder="Project location"
                                required
                            />
                        </FormControl>
                    </FormItem>

                    <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                            <Input
                                value={duration}
                                onChange={(e) => onFieldChange('duration', e.target.value)}
                                placeholder="e.g., 12 months"
                                required
                            />
                        </FormControl>
                    </FormItem>
                </div>

                <FormItem>
                    <FormLabel>Impact Level</FormLabel>
                    <Select 
                        value={impact}
                        onValueChange={(value: ImpactLevel) => onFieldChange('impact', value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select impact level" />
                        </SelectTrigger>
                        <SelectContent>
                            {impactLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </FormItem>
            </CardContent>
        </Card>
    );
};