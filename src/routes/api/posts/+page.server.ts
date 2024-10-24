export const _get = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    const filteringData = data.slice(0, 10);
  
    return {
      status: 200,
      body: {
        posts: filteringData,
      },
    };
  };

