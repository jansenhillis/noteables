from django.urls import path
from . import views

# localhost:8000/noteables/
urlpatterns = [
    path('', views.index, name='index'),
    path('logout', views.logout, name='logout'),
    path('note/<int:id>', views.open_note, name='open_note'),
    path('update_note/<int:id>', views.update_note, name='update_note'),
    path('new_note', views.new_note, name='new_note'),
    path('save_note', views.save_note, name='save_note'),
    path('delete/<int:id>', views.delete_note, name='delete'),
]