export const fetchAllAuctions = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/auctions");

    if (!response.ok) {
        throw new Error("No se pudieron obtener las subastas.");
    }

    const data = await response.json();
    return data.results;
}
