import { ImageSourcePropType } from "react-native";

export interface Article {
    source: ArticleSource | any;
    author: string | null | any;
    title: string | any;
    description: string | null | any;
    url: string | any;
    urlToImage: string | any;
    publishedAt: string | any; // ISO 8601 date string
    content: string | null | any;
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