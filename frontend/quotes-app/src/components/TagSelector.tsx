import React from "react";
import { Select, Spin } from "antd";
import styles from "./Header.module.scss";

const { Option } = Select;

interface TagSelectorProps {
    tags: string[]; 
    loading: boolean; 
    handleTagChange: (value: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, loading, handleTagChange }) => {
    return (
        <Select
            mode="tags" 
            className={styles.autocomplete}
            placeholder={loading ? <Spin /> : "Search for tags..."}
            onChange={handleTagChange} 
            notFoundContent={loading ? <Spin /> : "No tags found"}
            style={{ width: "100%" }}
        >
            {tags.map((tag) => (
                <Option key={tag} value={tag}>
                    {tag}
                </Option>
            ))}
        </Select>
    );
};

export default TagSelector;
