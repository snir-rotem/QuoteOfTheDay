import axios from "axios";
import { Request, Response } from "express";
import Quote from "../models/Quote";

export const fetchQuotes = async (count: number, tags?: string, isForceRefresh?: boolean) => {
    let url = `https://favqs.com/api/quotes/?limit=${count}`;

    if (tags) {
        url += `&filter=${tags}&type=tag`;
    }

    const response = await axios.get(url, {
        headers: { Authorization: `Token token=${process.env.FAVQS_API_KEY}` },
    });

    const fetchedQuotes = response.data.quotes.map((quote: any) => ({
        text: quote.body,
        author: quote.author,
        tags: quote.tags,
    }));

    const existingQuotes = await Quote.find({ text: { $in: fetchedQuotes.map((q: { text: any; }) => q.text) } });

    const newQuotes = fetchedQuotes.filter((quote: { text: string; }) =>
        !existingQuotes.some(existing => existing.text === quote.text)
    );

    return newQuotes;
};

export const getQuotesFromDB = async (req: Request, res: Response) => {
    try {
        const { count = 1, tags } = req.query;
        const countInt = parseInt(count as string, 10);
        const tagsArray = tags ? (tags as string).split(",") : [];

        const quotesCount = await Quote.countDocuments(tagsArray.length ? { tags: { $in: tagsArray } } : {});

        if (quotesCount < countInt) {
            const missingQuotesCount = countInt - quotesCount;
            const fetchedQuotes = await fetchQuotes(missingQuotesCount, tags as string);

            if (fetchedQuotes.length > 0) {
                await Quote.insertMany(fetchedQuotes, { ordered: false });
            }
        }

        const quotes = await Quote.aggregate([
            { $match: tagsArray.length ? { tags: { $in: tagsArray } } : {} },
            { $sample: { size: countInt } },
        ]);

        res.status(200).json(quotes);
    } catch (error) {
        console.error("Error fetching quotes from database:", error);
        res.status(500).send("Failed to fetch quotes from the database.");
    }
};

