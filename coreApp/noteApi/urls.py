from django.urls import path, include
from .views import NoteDetailView, NoteListCreateView

# from .views import get_all_notes, get_note_detail, create_note, update_note, delete_note


urlpatterns = [
    path('<int:pk>/', NoteDetailView.as_view(), name="note_detail"),
    path('', NoteListCreateView.as_view(), name="note_list"),

    #     path('note/', get_all_notes, name='get_all_notes'),
    #     path('note/<int:pk>/', get_note_detail, name='get_note_detail'),
    #     path('note/create/', create_note, name='create_note'),
    #     path('note/update/<int:pk>/', update_note, name='update_note'),
    #     path('note/delete/<int:pk>/', delete_note, name='delete_note'),
]
