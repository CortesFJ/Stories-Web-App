from rest_framework.decorators import api_view

from .serializers import BooksSerializer
from .models import  Book


@api_view(['GET'])
def apiView(request):
    books = Book.objects.all()
    bookIds = BooksSerializer(books, many=True)
    return Response(bookIds.data)

