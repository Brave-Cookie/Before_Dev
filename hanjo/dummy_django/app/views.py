from django.shortcuts import render


def r_index(request):

    return render(request, "index.html")