-- CreateEnum
CREATE TYPE "Tags" AS ENUM ('Java', 'Python', 'JavaScript', 'CSharp', 'Cpp', 'Ruby', 'Swift', 'Kotlin', 'Go', 'TypeScript', 'Backtracking', 'Recursion', 'BinarySearch', 'DynamicProgramming', 'Greedy', 'BreadthFirstSearch', 'BitManipulation', 'Pointers', 'LinkedLists', 'EnumerableMethods', 'StringManipulation', 'FunctionalProgramming', 'NullSafety', 'Concurrency', 'ArraysAndStrings', 'Generics', 'TypeInference');

-- AlterTable
ALTER TABLE "Snippet" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tags" "Tags"[];
