'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useGetAllNewsQuery } from '@/store/api/homeApi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
    const router = useRouter();
    const { data, isLoading, error } = useGetAllNewsQuery({});
    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

    const handleArticleClick = (links: any[]) => {
        // Get the first link that is not an email protection link
        const validLink = links.find(link => !link.url.includes('email-protection'));
        if (validLink?.url) {
            window.open(validLink.url, '_blank');
        }
    };

    const handleImageError = (articleId: number) => {
        setImageErrors(prev => ({
            ...prev,
            [articleId]: true
        }));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                Error loading news articles
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Agricultural News</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.articles.map((article: any) => (
                    <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative w-full h-48 bg-gray-100">
                            {article.image && !imageErrors[article.id] ? (
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover"
                                    onError={() => handleImageError(article.id)}
                                />
                            ) : (
                                <div className="w-full h-48 flex items-center justify-center bg-green-50">
                                    <svg
                                        className="w-16 h-16 text-green-200"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex items-center mb-2">
                                <img
                                    src={article.image || article.source.favicon}
                                    alt={article.source.domain}
                                    className="w-4 h-4 mr-2"
                                />
                                <span className="text-sm text-gray-600">
                                    {article.source.domain} • {dayjs(article.published_at).format('MMM D, YYYY')}
                                </span>
                            </div>
                            <button
                                className="text-xl font-semibold mb-2 line-clamp-2 hover:underline cursor-pointer text-left w-full"
                                onClick={() => handleArticleClick(article.links)}
                            >
                                {article.title}
                            </button>
                            <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {article.categories.slice(0, 3).map((category: any) => (
                                    <span
                                        key={category.id}
                                        className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                                    >
                                        {category.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
