import { Request, Response } from "express";
import { fetchAndStoreTagsService } from "../services/tagService";
import Tag from "../models/Tag";

export const fetchAndStoreTags = async (req: Request, res: Response) => {
    console.log("Fetching and storing tags...");
    try {
        await fetchAndStoreTagsService();
        res.status(200).send("Tags successfully updated in the database.");
    } catch (error) {
        console.error("Error fetching tags:", error);
        res.status(500).send("Failed to fetch and store tags.");
    }
};

export const getTags = async (req: Request, res: Response) => {
    try {
        let tags = await Tag.find(); 
        if (tags.length === 0) {
            await fetchAndStoreTagsService();
            tags = await Tag.find();
        }
        res.status(200).json(tags.map((tag) => tag.name));
    } catch (error) {
        console.error("Error fetching tags from database:", error);
        res.status(500).send("Failed to fetch tags from the database.");
    }
};
