
export const getRetriever = (vectorStore) => {
    return vectorStore.asRetriever({k:2})
}