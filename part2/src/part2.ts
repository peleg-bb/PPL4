// PPL 2023 HW4 Part2

// Q 2.1 


export const delayedSum = (a: number, b: number, delay: number): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(a + b);
      }, delay);
    });
  };

export const testDelayedSum = () => {
    console.log("testDelayedSum");
    test('delayedSum waits at least the specified delay', () => {
        let start = Date.now();
        delayedSum(1, 2, 1000);
        let end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(1000);
    })
 }
 

// Q 2.2

// Values returned by API calls.
export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// When invoking fetchData(postsUrl) you obtain an Array Post[]
// To obtain an array of posts
export const postsUrl = 'https://jsonplaceholder.typicode.com/posts'; 

// Append the desired post id.
export const postUrl = 'https://jsonplaceholder.typicode.com/posts/'; 

// When invoking fetchData(invalidUrl) you obtain an error
export const invalidUrl = 'https://jsonplaceholder.typicode.com/invalid';

// Depending on the url - fetchData can return either an array of Post[] or a single Post.
// Specify the return type without using any.
export const fetchData = async (url: string): Promise<Post[] | Post> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (Array.isArray(data)) {
      return data as Post[];
    } else {
      return data as Post;
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
};

export const testFetchData = () => {
    console.log("TODO testFetchData");
}

// Q 2.3

export const fetchMultipleUrls = async (urls: string[]): Promise<any[]> => {
  try {
    const promises = urls.map(url => fetch(url));
    const responses = await Promise.all(promises);
    if (responses.some(response => !response.ok)) {
      throw new Error('HTTP error!');
    }
    return await Promise.all(responses.map(response => response.json()));
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    throw error;
  }
};

export const testFetchMultipleUrls = () => {
    console.log("TODO testFetchData");
}
