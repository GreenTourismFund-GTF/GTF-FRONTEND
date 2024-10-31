
import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Check } from 'lucide-react';

interface SubmitSectionProps {
    formProgress: number;
    isSubmitting: boolean;
}

export const SubmitSection: React.FC<SubmitSectionProps> = ({
    formProgress,
    isSubmitting,
}) => {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-full bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Before submitting, please ensure:</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                All required fields are filled
                            </li>
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                Project images are uploaded
                            </li>
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                Wallet addresses are correct
                            </li>
                            <li className="flex items-center">
                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                Team information is complete
                            </li>
                        </ul>
                    </div>
                    <Button
                        type="submit"
                        className="w-full md:w-auto px-8 py-2"
                        disabled={formProgress < 100 || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Project'}
                    </Button>
                    {formProgress < 100 && (
                        <p className="text-sm text-gray-500">
                            Please complete all required fields to submit
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};