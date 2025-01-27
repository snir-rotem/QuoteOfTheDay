import React from "react";
import { Button, Select } from "antd";
import styles from "./Header.module.scss";
import TagSelector from "./TagSelector";

const { Option } = Select;

interface HeaderProps {
    availableTags: string[];
    loading: boolean;
    error: boolean;
    onRefresh: (count: number, tags: string[]) => void;
}

const Header: React.FC<HeaderProps> = ({ availableTags, loading, error, onRefresh }) => {

    const [currentTags, setCurrentTags] = React.useState<string[]>([]);
    const [count, setCount] = React.useState<number>(1);

    const onRefreshButtonClicked = () => {
        onRefresh(count, currentTags);
    }

    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.header}>Quotes of the Day</h1>
            <Select
                defaultValue={1}
                className={styles.select}
                onChange={(value) => setCount(value)}
            >
                <Option value={1}>1 Quote</Option>
                <Option value={3}>3 Quotes</Option>
                <Option value={5}>5 Quotes</Option>
                <Option value={10}>10 Quotes</Option>
                <Option value={20}>20 Quotes</Option>
            </Select>

            <TagSelector tags={availableTags} loading={loading} handleTagChange={setCurrentTags} />
            {error && <div className={styles.error}>Failed to load tags. Using default tags.</div>}

            <Button onClick={onRefreshButtonClicked} className={styles.refreshButton}>
                Find me some new quotes!
            </Button>
        </div>
    );
};

export default Header;
