import { Article } from '@/constants/types';
import { createMMKV } from 'react-native-mmkv';


export const storage = createMMKV({ 
    id: 'news-app-storage'
});

const PREFIX = 'article:'

export function saveArticle(article: Article): void {
    storage.set(PREFIX + article.url, JSON.stringify(article))
}

export function deleteArticle(url: string): void {
    storage.remove(PREFIX + url)
}

export function getAllArticles(): Article[] {
    return storage  
        .getAllKeys()
        .filter((k) => k.startsWith(PREFIX))
        .map((k) => JSON.parse(storage.getString(k)!))
}

export function already_exists(url: string): boolean {
    return storage.contains(PREFIX + url)
}