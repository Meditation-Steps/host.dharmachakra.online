import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownDisplayProps {
    name: string;
}

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ name: name }) => {
    const { i18n } = useTranslation();
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadMarkdown = async () => {
            setLoading(true);
            try {
                const url = `/${name}/${name}.${i18n.language}.md`;
                const response = await fetch(url, {
                    // Tells the browser to always revalidate with the server
                    // rather than serving directly from cache
                    cache: 'no-cache',
                    headers: {
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }

                const text = await response.text();
                setContent(text);
            } catch (error) {
                console.error("Could not load markdown file", error);
                setContent("Content not available.");
            } finally {
                setLoading(false);
            }
        };

        loadMarkdown();
    }, [i18n.language, name]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
    );
};

export default MarkdownDisplay;
