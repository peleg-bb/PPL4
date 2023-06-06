import { describe, expect, test } from '@jest/globals'
import {
    delayedSum, Post, postsUrl, postUrl, invalidUrl, fetchData, fetchMultipleUrls
} from '../src/part2';

describe('Assignment 4 Part 2', () => {
    describe('Q2.1 delayedSum (6 points)', () => {
        test('delayedSum returns the sum', () => {
            expect(delayedSum(1, 2, 1000)).resolves.toBe(3);
        })
        // checks the time now using Date.now(), checks the time after the call to delayedSum
        test('delayedSum waits at least the specified delay', (done) => {
            let start = Date.now();
            let x = delayedSum(1, 2, 1000);

            x.then((result) => {
                let end = Date.now();
                expect(end - start).toBeGreaterThanOrEqual(1000);
                expect(result).toEqual(3);
                done();
            });
        });

        test('delayedSum does not wait too long', (done) => {
            let start = Date.now();
            let x = delayedSum(1, 2, 1000);

            x.then((result) => {
                let end = Date.now();
                expect(end - start).toBeLessThan(2000);
                // checking that it doesn't wait too long to confirm it waits the specified delay
                expect(result).toEqual(3);
                done();
            });
        });
    })


    describe('Q2.2 fetchData (12 points)', () => {
        test('successful call to fetchData with array result', async () => {
            const posts = await fetchData(postsUrl);
            // @ts-ignore
            expect(posts.length).toBeGreaterThan(0);
        })

        test('successful call to fetchData with Post result', async () => {
            const post = await fetchData(postUrl+1); // append the desired post id - 1
            expect(post).toHaveProperty('id', 1);
            expect(post).toHaveProperty('userId', 1);
            expect(post).toHaveProperty('title');
            expect(post).toHaveProperty('body');
        })

        test('failed call to fechData', async () => {
            const failure = fetchData(invalidUrl);
            await expect(failure).rejects.toThrow('HTTP error!');
        })

    })

    describe('Q2.3 fetchMultipleUrls (12 points)', () => {
        test('successful call to fetchMultipleUrls', async () => {
            const urls = ['https://jsonplaceholder.typicode.com/posts', 'https://jsonplaceholder.typicode.com/comments'];
            const data = await fetchMultipleUrls(urls);
            expect(data.length).toBe(urls.length);
            expect(data[0].length).toBeGreaterThan(0);
            expect(data[1].length).toBeGreaterThan(0);
          });
        
          test('successful call to fetchMultipleUrls: verify results are in the expected order', async () => {
            const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/comments/1'];
            const data = await fetchMultipleUrls(urls);
            expect(data).toBeInstanceOf(Array);
            expect(data.length).toBe(urls.length);
            expect(data[0]).toHaveProperty('id', 1);
            expect(data[0]).toHaveProperty('userId', 1);
            expect(data[0]).toHaveProperty('title');
            expect(data[0]).toHaveProperty('body');
            expect(data[1]).toHaveProperty('id', 1);
            expect(data[1]).toHaveProperty('postId', 1);
            expect(data[1]).toHaveProperty('name');
            expect(data[1]).toHaveProperty('email');
            expect(data[1]).toHaveProperty('body');
          });
        
          test('failed call to fetchMultipleUrls', async () => {
            const urls = ['https://jsonplaceholder.typicode.com/posts', 'https://jsonplaceholder.typicode.com/invalid'];
            await expect(fetchMultipleUrls(urls)).rejects.toThrow('HTTP error!');
          });
        });
})