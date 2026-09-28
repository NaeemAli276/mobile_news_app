import { ImageSourcePropType } from "react-native";

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string;
    publishedAt: string; // ISO 8601 date string
    content: string | null;
}

export interface ArticleSource {
    id: string | null
    name: string
}

export type RootStackParamList = {
    index: undefined
    bookmarked: undefined; // undefined means this page accepts no arguments
    search: undefined, // Example of a page that requires parameters
    article: Article
};