from pprint import pprint as pp
import json

from google.cloud import language_v1

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

from .models import Text, Book
from accounts.models import User
from .serializers import BookSerializer, BooksSerializer, TextSerializer, TextMetadataSerializer
from . import utils


def develop(request):
    context = {}
    return render(request, "desktop/develop.html", context=context)


def Home(request):
    books = Book.objects.all()
    bookIds = BooksSerializer(books, many=True)
    context = {"books": bookIds.data}
    return render(request, "desktop/home.html", context=context)


def BookView(request, pk):
    bookInfo = BookSerializer(Book.objects.get(id=pk), many=False)
    chapters = Text.objects.filter(book=pk).order_by("chapter")
    chapters = TextSerializer(chapters, many=True)
    context = {"bookInfo": bookInfo.data, "chapters": chapters.data}
    return render(request, "desktop/stories.html", context=context)


def Desk(request):

    if (not request.user.is_authenticated or (request.user.role != User.EDITOR)):
        return render(request, "registration/forbiden.html")

    if request.method == "POST":
        data = request.body
        data = json.loads(data.decode('utf-8'))
        return create_text(data)

    with open('desktop/static/levelsDict.json', 'r') as outfile:
        levelsDict = json.load(outfile)

    books = [b.title for b in Book.objects.all()]
    booksDict = {b: {} for b in books}

    for t in Text.objects.all():
        booksDict[t.book.title][t.chapter] = t.title

    return render(request, "desktop/desk.html", context={'texts': booksDict, 'levelsLexicon': levelsDict})


def create_text(data):
    [book, _] = Book.objects.get_or_create(
        title=data["book"], level=data["bookLevel"]
    )
    nestedText = utils.nest_text(data["text"])
    mappingResult = utils.map_words({}, nestedText)

    book.update(lexicon=mappingResult['txtLexicon'])
    text = Text.objects.create(
        book=book,
        chapter=int(data["chapter"]),
        title=data["title"],
        text=data["text"],
        nestedText=mappingResult['nestedText'],
        wordsMap=mappingResult['wordsMap'],
        homonyms=mappingResult['homonyms'],
        unknownWords=mappingResult['unknownWords'],
    )

    return HttpResponse(json.dumps(text.id))


def MetadataUpdater(request, id):

    if request.method == 'PUT':

        data = request.body
        data = json.loads(data.decode('utf-8'))
        text = Text.objects.get(id=id)

        text.update_wordsMetadata(data)

        txtLexicon = {}
        for wordId in data['trackedWords'].values():
            txtLexicon = utils.create_txtLexicon_entry(txtLexicon, wordId)
        text.book.update(lexicon=txtLexicon, translations=data['translations'])

        mapEntries = {}
        for loc, lemmaId in data['trackedWords'].items():
            if lemmaId in mapEntries:
                mapEntries[lemmaId].append(loc)
            else:
                mapEntries[lemmaId] = [loc]
        text.update_map(mapEntries)

        return HttpResponse(json.dumps(
            {'message': f'Metadata of chapter "{text.title}" of book "{text.book.title}" has been updated'}
        ))

    text = Text.objects.get(id=id)
    serializedText = TextMetadataSerializer(text, many=False)
    textData = serializedText.data
    serializedBook = BookSerializer(text.book, many=False)
    translations = serializedBook.data['untrackedWords']

    return render(request, "desktop/metadataUpdater.html", {'textData': {**textData, 'translations': translations}})


def writePhonetics(request):
    books = Book.objects.all()
    lexis = [book.lexicon for book in books]

    noPhAid = {}
    for lex in lexis:
        noPhAid = [*noPhAid, *
                   [k for (k, v) in lex.items() if v['phAid'] == []]]
    noPhAid = [*set(noPhAid)]
    phData = [utils.get_word_and_phAid(wordId) for wordId in noPhAid]

    return render(request, "desktop/phEditor.html", {'phData': phData})


def textUpdated(request):
    return render(request, "desktop/textUpdated.html")


async def DictData(request):
    word = request.GET['word'].lower()
    print(word)
    data = await utils.fetch_dictData(word)

    # with open("desktop/static/fakeDictResponse.json", 'w') as f:
    #     json.dump(data, f, indent=4)

    # with open("desktop/static/fakeDictResponse.json", 'r') as f:
    #     data = json.load(f)

    return JsonResponse({"data": data})


def get_phonetics(words):
    with open("desktop/static/IPA_dict.json", 'r') as f:
        pDict = json.load(f)

    phonetics = {word: pDict[word.upper()]
                 for word in words if word.upper() in pDict}
    return phonetics


def analyze_textSyntax(request):

    # with open('desktop/static/fakeResponse.json', 'r') as R:
    #     response = json.load(R)

    # return render(request, "desktop/analyze.html", {'response': response})
    def add_final_dots(line):
        line = line.strip()
        if line[-1] not in ['.','?',':']:
           line += '.' 
        return line

    if request.method == 'POST':
        data = request.POST
        title = data['textTitle']
        text = data['inputText'].splitlines()
        text = [add_final_dots(l) for l in text if len(l) > 0]
        text = '\n'.join(text)


        # from google.auth import Credentials

        creds = "desktop/static/storiesnlp-1590460db346.json"

        client = language_v1.LanguageServiceClient.from_service_account_file(creds)

        document = language_v1.Document(
            content=text, type=language_v1.Document.Type.PLAIN_TEXT)
        encoding_type = language_v1.EncodingType.UTF8
        response = client.analyze_syntax(
            request={"document": document,
                     "encoding_type": encoding_type}
        )

        result_json = response.__class__.to_json(response)
        response = json.loads(result_json)

        phonetics = get_phonetics(
            [token['text']['content'] for token in response['tokens']]
        )

        response = {**response, 'title': title,
                    'phoneticDict': phonetics, 'text': text}

        with open('desktop/static/fakeResponse.json', 'w') as f:
            json.dump(response, f, indent=4)

        return render(request, "desktop/analyze.html", {'response': response, 'phonetics': phonetics})

    return render(request, "desktop/textFormat.html")


async def askChatIA(request):
    prompt = request.GET['prompt']
    data = utils.fetch_chatGPT(prompt)

    # with open("desktop/static/fakeGPT_response.json", 'w') as f:
    #     json.dump(data, f, indent=4)

    # with open("desktop/static/fakeGPT_response.json", 'r') as f:
    #     data = json.load(f)

    return JsonResponse({"data": data})
