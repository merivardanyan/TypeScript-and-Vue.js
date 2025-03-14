export const useFetch = () => {
  const fetchData = async (url: string) => {
    const storeId = "108362264";
    const token = "public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs";
    const response = await fetch(`https://app.ecwid.com/api/v3/${storeId}${url}?token=${token}`);
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  };

  return { fetchData };
};
