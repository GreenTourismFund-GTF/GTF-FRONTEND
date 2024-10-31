export interface WalletInfo
{
    name: string;
    type: 'bitcoin' | 'near' | 'lethal';
    address: string;
}

export interface TeamMember
{
    name: string;
    role: string;
}

export interface Milestone
{
    title: string;
    status: 'completed' | 'in-progress' | 'upcoming';
}



export interface ProjectData
{
    id: number;
    title: string;
    description: string;
    longDescription: string;
    category: string;
    goal: number;
    raised: number;
    location: string;
    duration: string;
    impact: string;
    date?: string;
    status?: 'completed' | 'in-progress' | 'planned';
    client?: string;
    tags: string[];
    team: TeamMember[];
    milestones: Milestone[];
    wallets: {
        bitcoin: string;
        near: string;
        lethal: string;
    };
    supporters: number;
    images: string[];
}

// types/project.ts

export interface TeamMember {
    name: string;
    role: string;
  }
  
  export interface Milestone {
    title: string;
    status: 'upcoming' | 'in-progress' | 'completed';
  }
  
  export interface ProjectWallets {
    bitcoin: string;
    near: string;
    lethal: string;
  }
  

  
  export type ProjectCategory = 'Environment' | 'Technology' | 'Education' | 'Healthcare';

  // types/project.ts

export interface TeamMember {
    name: string;
    role: string;
}

export interface Milestone {
    title: string;
    status: 'upcoming' | 'in-progress' | 'completed';
}

export interface ProjectWallets {
    bitcoin: string;
    near: string;
    lethal: string;
}

export type ImpactLevel = 'high' | 'medium' | 'low';

export interface ProjectFormData {
    title: string;
    description: string;
    longDescription: string;
    category: ProjectCategory | '';
    goal: number;
    location: string;
    duration: string;
    impact: ImpactLevel;
    images: string[];
    tags: string[];
    team: TeamMember[];
    milestones: Milestone[];
    wallets: ProjectWallets;
}

export interface FormSectionProps {
    className?: string;
}

export interface ProjectDetailsProps {
    category: ProjectCategory | '';
    goal: number;
    location: string;
    duration: string;
    impact: ImpactLevel;
    onFieldChange: (field: string, value: string | number) => void;
}

export interface ImagesProps {
    images: string[];
    onImagesChange: (newImages: string[]) => void;
}

export interface TagsProps {
    tags: string[];
    onTagsChange: (newTags: string[]) => void;
}

export interface MilestonesProps {
    milestones: Milestone[];
    onMilestonesChange: (newMilestones: Milestone[]) => void;
}

export interface WalletsProps {
    wallets: ProjectWallets;
    onWalletsChange: (newWallets: ProjectWallets) => void;
}