from django.shortcuts import render

# Create your views here.
# @authenticate_user
def index(request):
    return render(request, 'index.html')
