from django.shortcuts import render

def sendArticles(request):
    context = {}
    return render(request, "blog/home.html", context=context)

# def hv(request):
#     return render(request, "blog/hv.html")