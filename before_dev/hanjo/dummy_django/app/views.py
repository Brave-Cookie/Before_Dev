from django.shortcuts import render

# Create your views here.

def r_index(request):
    return render(request, "index.html")