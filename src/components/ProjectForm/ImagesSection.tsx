// components/ProjectForm/ImagesSection.tsx

import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Upload, X } from 'lucide-react';
import { ImagesProps } from '../../lib/types';

export const ImagesSection: React.FC<ImagesProps> = ({
    images,
    onImagesChange,
}) => {
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        onImagesChange([...images, ...imageUrls]);
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onImagesChange(newImages);
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold">Project Images</h2>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {images.map((image, index) => (
                        <div key={index} className="relative">
                            <img
                                src={image}
                                alt={`Project ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-center w-full">
                    <label className="w-full flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-500">Upload project images</p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
            </CardContent>
        </Card>
    );
};