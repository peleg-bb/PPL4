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
        })

        test('successful call to fetchData with Post result', async () => {
        })

        test('failed call to fechData', async () => {
        })

    })

    describe('Q2.3 fetchMultipleUrls (12 points)', () => {
        test('successful call to fetchMultipleUrls', async () => {
        })

        test('successful call to fetchMultipleUrls: verify results are in the expected order ', async () => {
        })

        test('failed call to fetchMultipleUrls', async () => {
        })

    })
});

