import axios from "axios";
import Tag from "../models/Tag";

export const fetchAndStoreTagsService = async () => {
    try {
        console.log("Fetching and storing tags...");

        const response = await axios.get("https://favqs.com/api/typeahead", {
            headers: { Authorization: `Token token=${process.env.FAVQS_API_KEY}` },
        });
        const tagSuggestions = response.data.tags;

        const tags = tagSuggestions.map((tag: string) => ({ name: tag }));

        const uniqueTags = [...new Set(tags.map((tag: { name: any; }) => tag.name))];
        await Tag.insertMany(uniqueTags, { ordered: false });

        console.log("Tags successfully updated in the database.");
    } catch (error) {
        console.error("Error fetching tags:", error);
        throw new Error("Failed to fetch and store tags.");
    }
};
