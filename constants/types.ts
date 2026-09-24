export const API_KEY = '2a4e2373578f4e7d9eabc4b9220d232e'

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string; // ISO 8601 date string
    content: string | null;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export type RootStackParamList = {
    index: undefined
    bookmarked: undefined; // undefined means this page accepts no arguments
    search: undefined, // Example of a page that requires parameters
    article: Article
};