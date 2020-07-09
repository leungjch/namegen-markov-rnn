# Creature Name Generation Methods

Implemented in Javascript for a creature generation aspect of a [larger project.](https://github.com/leungjch/gotta-task-em-all)

## Markov Chains

### Motivation

It's apparent that letters of words in the English language are somewhat interdependent. If you had to guess what the next letter of a word starting with "W" would be, it'd be a vowel like "a", "e", "i", "o", or "u", and not a consonant like "t" or "m". We can capture this intuition in the form of a first-order Markov chain, which gives us the probabilities of a next letter occurring given a current letter (e.g. when we have the letter "l", we have 50% probability of a "o" next, 20% probability of "a", 0% probability of "z", etc).

### Implementation

We implement a simple first-order Markov chain, where the probability of the next state is dependent on the current state. Here's the gist of it:

- Initialize a 26x27 "Frequency Matrix" with zeros. The rows (26) represents the current letter, and the columns (27) represents the next letter. The second dimension is 27, not 26, because we need to account for an extra "escape" character to get probability that the letter is also the end of the word. 
- For every letter l1 and the following letter l2 in each word of the dataset, increment the value of the matrix at (l1, l2).  For example, at the end of the loop, the value at (0,1) contains the number of times that the letter "a" is followed by the letter "b". If we're at the last letter of the word, increment the value of the letter's "escape" character column (l1, 27). 
- Divide each element of the Frequency Matrix by the sum of the column of the matrix which the element is located in. This produces your Transition Matrix.
- To generate a random name, input a seed character. Get the row of your seed character (0 for a, 1 for b, etc.) - this represents the probability distribution of each following letter given your seed character. Sample the probability distribution to obtain a next letter, and repeat this process until you obtain the escape character. 

### Limitations

- Often, the results are too short or too long. A simple workaround is to discard the results of the Markov chain generation until we get a desired length (e.g. more than 3 letters and less than 10 letters).
- Because this is a simple character-based Markov chain, sometimes the results are too simple or not very good names (e.g. "sa" or ""). Instead of using characters, we use chunks (e.g. "Pro" and "ject" from "project")

## Recurrent Neural Networks

...

