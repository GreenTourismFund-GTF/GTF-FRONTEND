// components/ProjectForm/ProjectSubmissionForm.tsx

import React, { useState, useCallback, useEffect } from 'react';
import { Progress } from '../../components/ui/progress';
import { BasicInfoSection } from './BasicInfoSection';
import { ImagesSection } from './ImagesSection';
import { TagsSection } from './TagsSection';
import { TeamSection } from './TeamSection';
import { MilestonesSection } from './MilestonesSection';
import { WalletsSection } from './WalletsSection';
import { SubmitSection } from './SubmitSection';
import { ProjectFormData } from '../../lib/types';
import { ProjectDetailsSection } from './ProjectDetailsSection';
import { FormProvider, useForm } from 'react-hook-form';

const initialFormData: ProjectFormData = {
    title: '',
    description: '',
    longDescription: '',
    category: '',
    goal: 0,
    location: '',
    duration: '',
    impact: 'medium',
    images: [],
    tags: [],
    team: [{ name: '', role: '' }],
    milestones: [{ title: '', status: 'upcoming' }],
    wallets: {
        bitcoin: '',
        near: '',
        lethal: ''
    }
};

export const ProjectSubmissionForm: React.FC = () =>
{
    const [formData, setFormData] = useState<ProjectFormData>(initialFormData);
    const [formProgress, setFormProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm<ProjectFormData>()

    const updateFormField = useCallback(<K extends keyof ProjectFormData>(
        field: K,
        value: ProjectFormData[K]
    ) =>
    {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    }, []);

    const calculateProgress = useCallback(() =>
    {
        const requiredFields = [
            !!formData.title,
            !!formData.description,
            !!formData.category,
            formData.goal > 0,
            !!formData.location,
            !!formData.duration,
            formData.team.length > 0 && formData.team.every(t => t.name && t.role),
            formData.milestones.length > 0 && formData.milestones.every(m => m.title),
            formData.images.length > 0,
            !!formData.wallets.bitcoin && !!formData.wallets.near && !!formData.wallets.lethal
        ];

        const completedSteps = requiredFields.filter(Boolean).length;
        const progress = (completedSteps / requiredFields.length) * 100;
        setFormProgress(progress);
    }, [formData]);

    useEffect(() =>
    {
        calculateProgress();
    }, [formData, calculateProgress]);

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        setIsSubmitting(true);

        try
        {
            const response = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok)
            {
                console.log('Project submitted successfully');
                // Add success handling (e.g., redirect, show success message)
            } else
            {
                throw new Error('Failed to submit project');
            }
        } catch (error)
        {
            console.error('Error submitting project:', error);
            // Add error handling
        } finally
        {
            setIsSubmitting(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
                        <Progress value={formProgress} className="h-2" />
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <BasicInfoSection
                            title={formData.title}
                            description={formData.description}
                            longDescription={formData.longDescription}
                            onFieldChange={(field, value) => updateFormField(field as keyof ProjectFormData, value as string)}
                        />

                        <ProjectDetailsSection
                            category={formData.category}
                            goal={formData.goal}
                            location={formData.location}
                            duration={formData.duration}
                            impact={formData.impact}
                            onFieldChange={(field, value) => updateFormField(field as keyof ProjectFormData, value)}
                        />

                        <ImagesSection
                            images={formData.images}
                            onImagesChange={(images) => updateFormField('images', images)}
                        />

                        <TagsSection
                            tags={formData.tags}
                            onTagsChange={(tags) => updateFormField('tags', tags)}
                        />

                        <TeamSection
                            team={formData.team}
                            onTeamChange={(team) => updateFormField('team', team)}
                        />

                        <MilestonesSection
                            milestones={formData.milestones}
                            onMilestonesChange={(milestones) => updateFormField('milestones', milestones)}
                        />

                        <WalletsSection
                            wallets={formData.wallets}
                            onWalletsChange={(wallets) => updateFormField('wallets', wallets)}
                        />

                        <SubmitSection
                            formProgress={formProgress}
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </div>
            </div>
        </FormProvider>

    );
};

export default ProjectSubmissionForm;