from django.shortcuts import render, redirect
from django.contrib import messages
from noteables_project.decorators import authenticate_user
from login.models import *
from .models import *


@authenticate_user
def index(request):
    notes = Note.objects.all()  
    user = User.objects.get(pk=request.session['user_id'])
    context = {
        "notes": notes,
        "user": user,
    }
    return render(request, 'dashboard.html', context)


#opens a specific note to view or edit
@authenticate_user
def open_note(request, id):
    context = {
        'note': Note.objects.get(id=id),
        'user': User.objects.get(id=request.session['user_id'])
    }
    return render(request, "edit.html", context)    


#updates note if any edits were made - to be added when we add in TinyMCE implementation
def update_note(request, id):
    if request.method == "POST": 
        errors = Note.objects.validator(request.POST)
        if errors:
            for error in errors.values():
                messages.error(request, error)
            return redirect('/open_note')
        else:
            note = Note.objects.get(id=id)
            
            note.title = request.POST['title']
            note.content = request.POST['content']
            note.save()
            return redirect('/noteables')
    return redirect('/noteables')


#deletes a note from the database on dashboard
@authenticate_user
def delete_note(request, id):
    Note.objects.get(id=id).delete()
    return redirect('/')


#opens a new note
@authenticate_user
def new_note(request):
    user = User.objects.get(pk=request.session['user_id'])
    context = {
        'user': user,
    }
    return render(request, "new.html", context)


#saves newly opened note 
@authenticate_user
def save_note(request):
    errors = Note.objects.validator(request.POST)

    if len(errors) > 0:
        for key, value in errors.items():
            messages.error(request, value)
        return redirect('new_note') # BUG: users entire note will be erased if there's a save error (forgetting a title)- oops :(

    user = User.objects.get(id=request.session['user_id'])
    note = Note.objects.create(title=request.POST['title'], content=request.POST['content'], created_by=user)
    return redirect('/noteables')


#goes to homepage 
@authenticate_user
def dashboard(request):
    return redirect('/')


#logs out user and returns to login screen - WIP
def logout(request):
    request.session.clear()
    return redirect('/') #TODO: Determine which url path to put here
