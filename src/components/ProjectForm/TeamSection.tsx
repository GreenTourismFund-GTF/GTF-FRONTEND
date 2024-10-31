// components/ProjectForm/TeamSection.tsx

import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Plus, X } from 'lucide-react';
import { TeamMember } from '../../lib/types';

interface TeamSectionProps {
    team: TeamMember[];
    onTeamChange: (newTeam: TeamMember[]) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ team, onTeamChange }) => {
    const addTeamMember = () => {
        onTeamChange([...team, { name: '', role: '' }]);
    };

    const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
        const newTeam = [...team];
        newTeam[index][field] = value;
        onTeamChange(newTeam);
    };

    const removeTeamMember = (index: number) => {
        onTeamChange(team.filter((_, i) => i !== index));
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Team Members</h2>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {team.map((member, index) => (
                        <div key={index} className="flex gap-4">
                            <Input
                                value={member.name}
                                onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                                placeholder="Member name"
                                className="flex-1"
                            />
                            <Input
                                value={member.role}
                                onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                                placeholder="Role"
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => removeTeamMember(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                    <Button 
                        type="button" 
                        onClick={addTeamMember}
                        className="w-full md:w-auto"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Team Member
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};