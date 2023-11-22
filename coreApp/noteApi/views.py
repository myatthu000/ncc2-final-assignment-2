from django.shortcuts import render
from .models import Note
from rest_framework import generics
from .serializers import NoteSerializer

# from django.http import response
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.serializers import Serializer
from rest_framework.parsers import JSONParser

from rest_framework.response import Response
from rest_framework import status


# Create your views here.
class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all().order_by('-id')
    serializer_class = NoteSerializer


class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

# @api_view(['GET'])
# def get_all_notes(request):
#     notes = Note.objects.all().order_by('-id')
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)
#
#
# @api_view(['GET'])
# def get_note_detail(request, pk):
#     try:
#         note = Note.objects.get(pk=pk)
#     except Note.DoesNotExist:
#         return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
#
#     serializer = NoteSerializer(note)
#     return Response(serializer.data)
#
#
# @api_view(['POST'])
# def create_note(request):
#     serializer = NoteSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['PUT'])
# # @parser_classes([JSONParser])
# def update_note(request, pk):
#     try:
#         note = Note.objects.get(pk=pk)
#     except Note.DoesNotExist:
#         return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
#
#     serializer = NoteSerializer(note, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#
#
# @api_view(['DELETE'])
# def delete_note(request, pk):
#     try:
#         note = Note.objects.get(pk=pk)
#     except Note.DoesNotExist:
#         return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
#
#     note.delete()
#     return Response(status=status.HTTP_204_NO_CONTENT)
