from pprint import pp
from pyexpat.errors import messages
import aiohttp
import asyncio
# import pandas as pd
# import re

import openai


async def fetch_dictData(word):

    apiKey = '18daa199-2a7d-4c78-8a0d-732dda4dd277'
    url = f'https://www.dictionaryapi.com/api/v3/references/spanish/json/{word}?key={apiKey}'

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            data = await response.json()
            return data


async def fetch_all_dictData(words):
    tasks = []
    for word in words:
        task = asyncio.create_task(fetch_dictData(word))
        tasks.append(task)
    data = await asyncio.gather(*tasks)

    dictData = {word: data[i] for i, word in enumerate(words)}

    return dictData


def filter_dictData(word, wordData):
    data = {'translations': {}, 'audio': ''}

    for meaning in wordData:

        if not isinstance(meaning, dict):
            break

        if meaning['hwi']['hw'] != word:
            continue
        if 'fl' not in meaning:
            continue

        if data['audio'] == '':
            try:
                data['audio'] = meaning['hwi']['prs'][0]['sound']['audio']
            except:
                None

        PoS = meaning['fl']
        if PoS not in data["translations"]:
            data['translations'][PoS] = []
        data['translations'][PoS].append(meaning['shortdef'])

    return data


def get_dictData(words):
    dictData = asyncio.run(fetch_all_dictData(words))
    data = {word: filter_dictData(word, data)
            for (word, data) in dictData.items()}

    return data


with open('desktop/static/openIA_API_KEY', 'r') as f:
    openai.api_key = f.read()

role = "Present the given information in a useful manner for a foreign English student. If any challenging linguistic structure in the sentence, address it in your explanation. Be brief, a little friendly, add examples. Your response should be in Spanish."
userEg = """Word: kitten (Singular)
Sentence: Mary was walking home from work when she saw an abandoned kitten on the side of the road.
Complements:
  an 
  abandoned 
  on the side of the road
Function: complement of 'saw'"""
assintantEg = """"kitten" es un sustantivo singular que funciona como objeto directo del verbo "saw", es decir, la acción es realizada sobre el gatito, Mary vio un gatito. Los complementos que lo acompañan son "an" (artículo), "abandoned" (adjetivo) y "on the side of the road" (complemento preposicional) y especifican que se trata de un gatito en particular, y describen su estado y ubicación.

Los verbos "was walking" indican la acción de caminar de Mary, mientras que el adverbio de tiempo "when" señala el momento en que vio al gatito. El verbo "saw" denota la acción que realizó Mary, observar al gatito abandonado. 

Oraciones similares:

	Sarah found an injured kitten in the backyard.
	(Sarah encontró un gatito herido en el patio trasero)

	I think I saw a cute kitten in the living room.
	(Me parece que vi un lindo gatito en la sala de estar)"""


def fetch_chatGPT(request):

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": role},
            {"role": "user", "content": userEg},
            {"role": "assistant",
             "content": assintantEg},
            {"role": "user", "content": request}
        ]
    )
    # pp(messages)
    message = response['choices'][0]['message']['content']
    return message


# def split_words(text=""):

#     words = re.split("(\W)", text)
#     words = list(filter(lambda w: (w != ""), words))

#     result = []
#     last = ''
#     for word in words:
#         result, last = split_contractions(result, last, word)

#     return result


# def split_contractions(result, last, word):

#     if last == "’":
#         match = re.match("s|re|m|ve|d|t|ll|clock", word, re.I)
#         match and result.pop()

#         if match[0] == "t" and re.match("n", result[-1][-1], re.I):
#             last = list(result.pop())
#             word = last.pop() + "'" + word
#             result.append("".join(last))

#     last = word
#     result.append(word)

#     return result, last


# def nest_text(text=""):

#     paragraphs = []
#     paragraphsList = text.splitlines()

#     for p in paragraphsList:
#         if len(p) < 1:
#             continue
#         sentences = split_into_sentences(p)
#         nestedParagraph = list(map(split_words, sentences))
#         paragraphs.append(nestedParagraph)

#     return paragraphs


# def create_txtLexicon_entry(txtLexicon, wordId, wordData=None):

#     if wordId in txtLexicon:
#         return txtLexicon

#     if not (isinstance(wordData, pd.Series)):
#         lexicon = pd.read_pickle('desktop/static/lexicon.pkl')
#         wordData = lexicon.loc[int(wordId)]

#     lemma = wordData['lemma']
#     ph = []
#     if type(wordData['phonetics']) == dict and 'aid' in wordData['phonetics']:
#         ph = wordData['phonetics']['aid']

#     txtLexicon[wordId] = {
#         'lemma': lemma,
#         'phAid': ph,
#         'PoS': wordData['PoS']}

#     return txtLexicon


# def map_words(wordsMap, nestedWords):

#     lexicon = pd.read_pickle('desktop/static/lexicon.pkl')

#     txtLexicon = {}
#     homonyms = []
#     unknownWords = []
#     nestedText = nestedWords.copy()

#     for pI, paragraph in enumerate(nestedWords):
#         for sI, sentence in enumerate(paragraph):
#             for wI, word in enumerate(sentence):

#                 if not re.match("\w+", word):
#                     continue

#                 wordData = lexicon[lexicon['word'] == word.lower()]
#                 if wordData.empty:

#                     nestedText[pI][sI][wI] = [word, None]
#                     unknownWords.append(
#                         {'loc': f'{pI}_{sI}_{wI}', 'word': word.lower()}
#                     )
#                     continue

#                 if len(wordData['lemma'].unique()) > 1:

#                     meanings = wordData[['lemma', 'PoS']].T.to_dict()
#                     nestedText[pI][sI][wI] = [word, None]
#                     homonyms.append(
#                         {'loc': f'{pI}_{sI}_{wI}', 'meanings': meanings})
#                     continue

#                 wordData = wordData.iloc[0]
#                 wordId = int(wordData.name)
#                 txtLexicon = create_txtLexicon_entry(
#                     txtLexicon, wordId, wordData)

#                 if wordId not in wordsMap:
#                     wordsMap[wordId] = []
#                 wordsMap[wordId].append(f'{pI}_{sI}_{wI}')
#                 nestedText[pI][sI][wI] = [word, wordId]

#     return {'wordsMap': wordsMap,
#             'txtLexicon': txtLexicon,
#             'unknownWords': unknownWords,
#             'homonyms': homonyms,
#             'nestedText': nestedText
#             }


# def get_word_and_phAid(wordId):
#     lexicon = pd.read_pickle('desktop/static/lexicon.pkl')
#     wordData = lexicon.loc[int(wordId)]

#     ph, word = wordData[['phonetics', 'word']]
#     ph = 'pronunciation' in ph and ph['pronunciation']

#     if ph:
#         if 'US' in ph:
#             ph = ph['US']
#         elif 'IPA' in ph:
#             ph = ph['IPA']
#         else:
#             ph = [k+': '+v for (k, v) in ph]

#     return [word,  ph or '']


# alphabets = "([A-Za-z])"
# prefixes = "(Mr|St|Mrs|Ms|Dr)[.]"
# suffixes = "(Inc|Ltd|Jr|Sr|Co)"
# starters = "(Mr|Mrs|Ms|Dr|He\s|She\s|It\s|They\s|Their\s|Our\s|We\s|But\s|However\s|That\s|This\s|Wherever)"
# acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
# websites = "[.](com|net|org|io|gov)"
# digits = "([0-9])"


# def split_into_sentences(text):
#     text = " " + text + "  "
#     text = text.replace("\n", " ")
#     text = re.sub(prefixes, "\\1<prd>", text)
#     text = re.sub(websites, "<prd>\\1", text)
#     text = re.sub(digits + "[.]" + digits, "\\1<prd>\\2", text)
#     if "..." in text:
#         text = text.replace("...", "<prd><prd><prd>")
#     if "Ph.D" in text:
#         text = text.replace("Ph.D.", "Ph<prd>D<prd>")
#     text = re.sub("\s" + alphabets + "[.] ", " \\1<prd> ", text)
#     text = re.sub(acronyms+" "+starters, "\\1<stop> \\2", text)
#     text = re.sub(alphabets + "[.]" + alphabets + "[.]" +
#                   alphabets + "[.]", "\\1<prd>\\2<prd>\\3<prd>", text)
#     text = re.sub(alphabets + "[.]" + alphabets +
#                   "[.]", "\\1<prd>\\2<prd>", text)
#     text = re.sub(" "+suffixes+"[.] "+starters, " \\1<stop> \\2", text)
#     text = re.sub(" "+suffixes+"[.]", " \\1<prd>", text)
#     text = re.sub(" " + alphabets + "[.]", " \\1<prd>", text)
#     if "”" in text:
#         text = text.replace(".”", "”.")
#     if "\"" in text:
#         text = text.replace(".\"", "\".")
#     if "!" in text:
#         text = text.replace("!\"", "\"!")
#     if "?" in text:
#         text = text.replace("?\"", "\"?")
#     text = text.replace(".", ".<stop>")
#     text = text.replace("?", "?<stop>")
#     text = text.replace("!", "!<stop>")
#     text = text.replace("<prd>", ".")
#     sentences = text.split("<stop>")
#     sentences = sentences[:-1]
#     sentences = [s.strip() for s in sentences]
#     return sentences
