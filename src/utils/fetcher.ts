const fetcher = async (
  ...args: [RequestInfo, RequestInit?]
): Promise<unknown> => {
  try {
    const response = await fetch(...args);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export default fetcher;
