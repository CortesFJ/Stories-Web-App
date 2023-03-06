from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import BookSerializer, BooksSerializer, TextSerializer, TextMetadataSerializer
from .models import Text, Book


@api_view(['GET'])
def apiView(request):
    books = Book.objects.all()
    bookIds = BooksSerializer(books, many=True)
    return Response(bookIds.data)