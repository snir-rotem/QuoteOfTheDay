import { useState, useEffect } from "react";
import axios from "axios";

const useTags = () => {
    const [tags, setTags] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            try {
                const response = await axios.get("/api/tags");

                const sortedTags = response.data.sort((a: string, b: string) => a.localeCompare(b));

                if (tags?.length !== sortedTags?.length) {
                    setTags(sortedTags);
                }

            } catch (error) {
                console.error("Error fetching tags:", error);
                setError(true);
                setTags(["Motivation", "Life", "Inspiration"]); // Fallback tags
            } finally {
                setLoading(false);
            }
        };
        fetchTags();
    }, []);

    return { tags, loading, error };
};

export default useTags;
