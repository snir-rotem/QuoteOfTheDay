import { useState } from "react";
import axios from "axios";
import { Quote } from "../models/quote";

const useQuotes = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchQuotes = async (count: number, tags: string[]) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/api/quotes", {
                params: { count, tags: tags?.join(",")},
            });
            setQuotes(response.data);
        } catch (err: any) {
            setError(err.response?.data || "Failed to fetch quotes.");
        } finally {
            setLoading(false);
        }
    };

    return { quotes, loading, error, fetchQuotes };
};

export default useQuotes;
