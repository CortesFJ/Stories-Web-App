import json
import os

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings

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

# from asyncio import run


def DictData(request):
    words = request.GET.getlist("words[]")
    data = utils.get_dictData(words)

    # data = utils.get_dictData(['story'])
    # data = {'the': {'translations': {'adverb': [['cuanto']], 'article': [['el, la, los, las, lo']]}, 'audio': 'the00001'}, 'be': {'translations': {'verb': [['ser', 'ser', 'ser']], 'feminine noun': [['(letter) b']]}, 'audio': 'be000001'}, 'and': {'translations': {'conjunction': [['y —e before words beginning with i- or hi-', 'con', 'in order to : a, de']]}, 'audio': 'and00001'}, 'a': {'translations': {'noun': [['primera letra del alfabeto inglés', 'la']], 'article': [['un, una', 'per : por, a la, al']], 'feminine noun': [['first letter of the Spanish alphabet']], 'preposition': [['to', 'at', 'in the manner of']]}, 'audio': 'a0000001'}, 'of': {'translations': {'preposition': [['from : de', 'de', 'de parte de (alguien)']]}, 'audio': ''}, 'to': {'translations': {'adverb': [['a un estado consciente', 'de aquí para allá, de un lado para otro']], 'preposition': [['a', 'toward : a, hacia', 'up to : hasta, a']]}, 'audio': 'to000001'}, 'in': {'translations': {'adverb': [['inside : dentro, adentro', 'participating', 'collected']], 'adjective': [['inside : interior', 'fashionable : de moda']], 'preposition': [['de', 'into : en, a', 'during : por, en, durante']], 'noun': [['pormenores']]}, 'audio': 'in000001'}, 'it': {'translations': {'pronoun': [['él, ella, ello', 'le', 'lo, la']]}, 'audio': ''}, 'have': {'translations': {'verb': [['possess : tener', 'obtain : conseguir', 'tener']]}, 'audio': ''}, 'that': {'translations': {'adverb': [['tan']], 'adjective': [['ese, esa, aquel, aquella']], 'conjunction & pronoun': [['que']], 'pronoun': [['ese/ése, esa/ésa, eso', 'aquel/aquél, aquella/aquélla, aquello', 'also, moreover : además']]}, 'audio': 'that0001'}, 'for': {'translations': {'conjunction': [['puesto que, porque']], 'preposition': [['para, de, por', 'para', 'por']]}, 'audio': 'for00001'}, 'he': {'translations': {'pronoun': [['él']], 'impersonal verb': [['here is, here are, behold']]}, 'audio': ''}, 'but': {'translations': {'conjunction': [['nevertheless : pero, no obstante, sin embargo', 'except : pero', 'pero']], 'preposition': [['except : excepto, menos', 'si no fuera por']]}, 'audio': 'but00001'}, 'as': {'translations': {'adverb': [['tan, tanto', 'such as : como']], 'conjunction': [['like : como, igual que', 'como', 'when, while : cuando, mientras, a la vez que']], 'preposition': [['de', 'like : como']], 'pronoun': [['que']], 'masculine noun': [['ace']]}, 'audio': 'as000001'}, 'know': {'translations': {'verb': [['saber', 'conocer (a una persona, un lugar)', 'recognize : reconocer']]}, 'audio': ''}, 'all': {'translations': {'adverb': [['completely : todo, completamente', 'igual', 'para todos']], 'adjective': [['todo']], 'pronoun': [['todo', 'en general', 'en total']]}, 'audio': 'all00001'}, 'about': {'translations': {'adverb': [['approximately : aproximadamente, casi, más o menos', 'around : por todas partes, alrededor', 'estar a punto de']], 'preposition': [['around : alrededor de (un lugar, una persona, etc.)', 'concerning : de, acerca de, sobre', 'tratarse de (dícese de un asunto), ser muy partidario de (dícese de una persona)']]}, 'audio': 'about001'}, 'their': {'translations': {'adjective': [['su']]}, 'audio': 'their001'}, 'would': {'translations': {}, 'audio': ''}, 'think': {'translations': {'verb': [['plan : pensar, creer', 'believe : creer, opinar', 'ponder : pensar']], 'noun': [['pensar', 'estar muy equivocado']]}, 'audio': 'think001'}, 'there': {'translations': {'adverb': [['ahí, allí, allá', 'ahí, en esto, en eso', 'then : entonces']], 'pronoun': [['hay']]}, 'audio': 'there001'}, 'see': {'translations': {'verb': [['ver', 'ascertain : ver', 'read : leer']], 'noun': [['sede']]}, 'audio': 'see00001'}, 'out': {'translations': {'intransitive verb': [['revelarse, hacerse conocido']], 'adverb': [['outside : para afuera', 'outside : fuera, afuera', 'fuera, afuera']], 'adjective': [['external : externo, exterior', 'outlying : alejado, distante', 'absent : ausente']], 'preposition': [['por']]}, 'audio': 'out00001'}, 'find': {'translations': {'transitive verb': [['locate : encontrar', 'chance upon : encontrar (por casualidad)', 'learn : encontrar, descubrir']], 'noun': [['hallazgo']]}, 'audio': 'find0001'}, 'new': {'translations': {'adjective': [['nuevo', 'recent : nuevo, reciente', 'different : nuevo, distinto']]}, 'audio': ''}, 'need': {'translations': {'transitive verb': [['necesitar', 'require : requerir, exigir', 'tener que']], 'noun': [['necessity : necesidad', 'lack : falta', 'poverty : necesidad, indigencia']]}, 'audio': 'need0001'}, 'many': {'translations': {'adjective': [['muchos', 'cuántos, cuántas']], 'pronoun': [['muchos', 'la mayoría']]}, 'audio': 'many0001'}, 'call': {'translations': {'intransitive verb': [['cry, shout : llamar, gritar', 'visit : hacer (una) visita, visitar', 'sing : cantar (dícese de las aves)']], 'noun': [['shout : grito, llamada', 'grito (de un animal), reclamo (de un pájaro)', 'summons : llamada']]}, 'audio': 'call0001'}, 'world': {'translations': {
    #     'adjective': [['mundial, del mundo']], 'noun': [['mundo', 'mundo', 'society : mundo']]}, 'audio': 'world001'}, 'hear': {'translations': {'verb': [['oír', 'heed : oír, prestar atención a', 'learn : oír, enterarse de']]}, 'audio': 'hear0001'}, 'always': {'translations': {'adverb': [['invariably : siempre, invariablemente', 'forever : para siempre']]}, 'audio': 'always02'}, 'different': {'translations': {'adjective': [['distinto, diferente']]}, 'audio': ''}, 'home': {'translations': {'noun': [['hogar, casa', 'house, residence : casa, domicilio', 'seat : sede']]}, 'audio': ''}, 'far': {'translations': {'adverb': [['lejos', 'much : muy, mucho', 'lejos']], 'adjective': [['distant, remote : lejano, remoto', 'más lejano', 'la extrema izquierda/derecha (en la política)']]}, 'audio': 'far00001'}, 'long': {'translations': {'intransitive verb': [['añorar, desear, anhelar', 'anhelar, estar deseando']], 'adverb': [['mucho, mucho tiempo', 'todo el día', 'if : mientras, con tal (de) que']], 'adjective': [['largo', 'largo, prolongado', 'estar cargado de']], 'noun': [['dentro de poco', 'lo esencial, lo fundamental']]}, 'audio': 'long0001'}, 'learn': {'translations': {'transitive verb': [['aprender', 'memorize : aprender de memoria', 'discover : saber, enterarse de']]}, 'audio': 'learn001'}, 'set': {'translations': {'verb': [['place : poner, colocar', 'install : poner, colocar (ladrillos, etc.)', 'mount : engarzar, montar (un diamante, etc.)']], 'adjective': [['established, fixed : fijo, establecido', 'rigid : inflexible', 'ready : listo, preparado']], 'noun': [['collection : juego', 'decorado (en el teatro), plató (en el cine)', 'apparatus : aparato']], 'masculine noun': [['set (in tennis)']]}, 'audio': 'set00001'}, 'reach': {'translations': {'transitive verb': [['extend : extender, alargar', 'alcanzar', 'llegar a/hasta']], 'noun': [['alcance, extensión']]}, 'audio': 'reach001'}, 'space': {'translations': {'transitive verb': [['espaciar']], 'noun': [['period : espacio, lapso, período', 'room : espacio, sitio, lugar', 'espacio']]}, 'audio': 'space001'}, 'cover': {'translations': {'transitive verb': [['cubrir, tapar', 'tratar (un tema), cubrir (noticias)', 'insure : cubrir, asegurar']], 'noun': [['shelter : cubierta, abrigo, refugio', 'lid, top : cubierta, tapa', 'cubierta (de un libro), portada (de una revista)']]}, 'audio': 'cover001'}, 'race': {'translations': {'intransitive verb': [['correr, competir (en una carrera)', 'rush : ir a toda prisa, ir corriendo']], 'noun': [['current : corriente (de agua)', 'carrera', 'raza']]}, 'audio': 'race0001'}, 'hot': {'translations': {'adjective': [['caliente, cálido, caluroso', 'ardent, fiery : ardiente, acalorado', 'spicy : picante']]}, 'audio': ''}, 'determine': {'translations': {'transitive verb': [['establish : determinar, establecer', 'settle : decidir', 'find out : averiguar']]}, 'audio': 'determ10'}, 'travel': {'translations': {'intransitive verb': [['journey : viajar', 'go, move : desplazarse, moverse, ir']], 'noun': [['viajes']]}, 'audio': 'travel01'}, 'ice': {'translations': {'verb': [['freeze : congelar, helar', 'chill : enfriar', 'bañar un pastel']], 'noun': [['hielo', 'sherbet : sorbete; nieve']]}, 'audio': 'ice00001'}, 'planet': {'translations': {'noun': [['planeta']]}, 'audio': 'planet01'}, 'search': {'translations': {'transitive verb': [['registrar (un edificio, un área), cachear (a una persona), buscar en', 'buscar']], 'noun': [['búsqueda, registro (de un edificio, etc.), cacheo (de una persona)', 'en busca de']]}, 'audio': 'search01'}, 'strange': {'translations': {'adjective': [['queer, unusual : extraño, raro', 'unfamiliar : desconocido, nuevo']]}, 'audio': ''}, 'explore': {'translations': {'transitive verb': [['explorar, investigar, examinar']]}, 'audio': 'explor05'}, 'danger': {'translations': {'noun': [['peligro']]}, 'audio': ''}, 'secret': {'translations': {'adjective': [['secreto']], 'noun': [['secreto']]}, 'audio': 'secret01'}, 'careful': {'translations': {'adjective': [['cautious : cuidadoso, cauteloso', 'painstaking : cuidadoso, esmerado, meticuloso']]}, 'audio': 'carefu01'}, 'journey': {'translations': {'intransitive verb': [['viajar']], 'noun': [['viaje']]}, 'audio': 'journe01'}, 'creature': {'translations': {'noun': [['ser viviente, criatura, animal']]}, 'audio': 'creatu01'}, 'desert': {'translations': {'transitive verb': [['abandonar (una persona o un lugar), desertar de (una causa, etc.)', 'desertar']], 'adjective': [['desierto']], 'noun': [['desierto (en geografía)']]}, 'audio': 'desert01'}, 'adventure': {'translations': {'noun': [['aventura']]}, 'audio': ''}, 'encounter': {'translations': {'transitive verb': [['meet : encontrar, encontrarse con, toparse con, tropezar con', 'fight : combatir, luchar contra']], 'noun': [['encuentro']]}, 'audio': 'encoun01'}, 'galaxy': {'translations': {'noun': [['galaxia']]}, 'audio': 'galaxy01'}, 'mysterious': {'translations': {'adjective': [['misterioso']]}, 'audio': 'myster01'}}

    return JsonResponse(data)
