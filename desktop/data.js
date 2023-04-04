GoogleCloudNLP_response = 
{
    sentences : [
        {text: {
            content: '',
            beginOffset: 0
            }
        }
    ],
    tokens: [
        {
            text: {
                content: '',
                beginOffset: 0
            },
            partOfSpeech: {
                tag: 0,
                number: 0,
                aspect: 0,
                case: 0,
                form: 0,
                gender: 0, 
                mood: 0, 
                person: 0, 
                proper: 0, 
                reciprocity: 0,
                tense: 0, 
                voice: 0
            }, 
            dependencyEdge: {
                headTokenIndex: 0,
                label: 0
            }, 
            lemma: ''
        },
    ],
    language: ''
}



book = {
    chapters:[
        {
            chapter:Number, 
            title:String,
            nestedText:Array,
            wordsMap: {
                Number:Array
            }
        } 
    ],
    info:{
        id:Number,
        level:Number,
        lexicon:{
            Number:{
                PoS:String,
                lemma:String,
                phAid:[String,]
            }
        },
        title:String,
        untrackedWords:{String:Array}
    }
}