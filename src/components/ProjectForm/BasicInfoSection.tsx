import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import {
    FormItem,
    FormLabel,
    FormControl,
} from '../../components/ui/form';

interface BasicInfoSectionProps {
    title: string;
    description: string;
    longDescription: string;
    onFieldChange: (field: string, value: string) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
    title,
    description,
    longDescription,
    onFieldChange,
}) => {
    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Basic Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
                <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                        <Input
                            value={title}
                            onChange={(e) => onFieldChange('title', e.target.value)}
                            placeholder="Enter project title"
                            required
                        />
                    </FormControl>
                </FormItem>

                <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                        <Textarea
                            value={description}
                            onChange={(e) => onFieldChange('description', e.target.value)}
                            placeholder="Brief overview of your project"
                            className="h-20"
                            required
                        />
                    </FormControl>
                </FormItem>

                <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                        <Textarea
                            value={longDescription}
                            onChange={(e) => onFieldChange('longDescription', e.target.value)}
                            placeholder="Comprehensive details about your project"
                            className="h-32"
                            required
                        />
                    </FormControl>
                </FormItem>
            </CardContent>
        </Card>
    );
};