
class MarkovChain
{
    constructor(data)
    {
        this.data = data
        this.generateChain()
        for (let i = 0; i < 10; i++)
        {
            var genName = ''
            // only return a long word
            while (genName.length < 4 || genName.length > 6)
            {
                genName = this.predict(String.fromCharCode(Math.floor(Math.random()*26)+97))
            }
            console.log(genName)
        }

    }

    generateChain()
    {
        const freqMatrix = new Array(26).fill(0).map(() => new Array(27).fill(0));
        const transitionMatrix = new Array(26).fill(0).map(() => new Array(27).fill(0));

        // console.log(this.data)
        // // loop through dataset and count occurrences
        for (let word of this.data)
        {
            // console.log(word) // for debug
            for (let i = 0; i < word.length-1; i++)
            {
                var charCurrent = parseInt(word.charCodeAt(i))-97
                var charNext = parseInt(word.charCodeAt(i+1))-97
                freqMatrix[charCurrent][charNext] += 1
            }
            freqMatrix[word.charCodeAt(word.length-1)-97][26] += 1
        }

        // Generate transition state

        for (let i = 0; i < freqMatrix.length; i++)
        {
            var sum = freqMatrix[i].reduce((a, b) => a + b, 0);
            for (let j = 0; j < freqMatrix[0].length; j++)
            {
                transitionMatrix[i][j] = freqMatrix[i][j]/sum
            }
        }
        this.transitionMatrix = transitionMatrix

    }
    predict(seedChar)
    {
        var currentCharCode = seedChar.charCodeAt(0)-97
        var genWord = [seedChar]

        while (currentCharCode !== 26) // keep appending characters until we get end sequence
        {
            const sample = Math.random()
            let total = 0
            var nextChar;
            // sample our probabilty distribution
            for (let i = 0; i < this.transitionMatrix[currentCharCode].length; i++)
            {
                total += this.transitionMatrix[currentCharCode][i]
                if (sample < total)
                {
                    nextChar = i
                    break
                }
            }
            currentCharCode = nextChar
            genWord.push(String.fromCharCode(nextChar+97))
        }
        return (genWord.splice(0,genWord.length-1).join(""))
    }
}

fetch("./markov_chain/dictionaries/first-names.json")
  .then(response => response.json())
  .then(json => new MarkovChain(json));


