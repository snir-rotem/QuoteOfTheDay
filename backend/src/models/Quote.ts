import mongoose, { Schema, Document } from "mongoose";

interface IQuote extends Document {
    text: string;
    author: string;
    tags: string[]; 
}

export const quoteSchema: Schema = new Schema(
    {
        text: { type: String, required: true },
        author: { type: String, required: true },
        tags: [{ type: String }],
    },
    { timestamps: true }
);

const Quote = mongoose.model<IQuote>("Quote", quoteSchema);
export default Quote;