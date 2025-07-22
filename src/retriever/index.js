
export const getRetriever = async(vectorStore) => {
    return vectorStore.asRetriever({k:2})
}