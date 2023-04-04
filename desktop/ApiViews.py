from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import BooksSerializer
from .models import  Book


@api_view(['GET'])
def apiView(request):
    books = Book.objects.all()
    bookIds = BooksSerializer(books, many=True)
    return Response(bookIds.data)


@api_view(['POST'])
def analyze_textSyntax(request):

    data = request.body
    data = json.loads(data.decode('utf-8'))
    text = data['text']

    client = language_v1.LanguageServiceClient()
    document = language_v1.Document(
        content=text, type=language_v1.Document.Type.PLAIN_TEXT)
    encoding_type = language_v1.EncodingType.UTF8
    response = client.analyze_syntax(
        request={"document": document,
                 "encoding_type": encoding_type}
    )

    result_json = response.__class__.to_json(response)
    result_dict = json.loads(result_json)

    return Response(result_dict)


{"text": "this is my test text. I want iy to work properly"}


#  export GOOGLE_APPLICATION_CREDENTIALS="./desktop/storiesnlp-1590460db346.json"