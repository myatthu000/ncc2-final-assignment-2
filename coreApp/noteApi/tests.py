from django.test import TestCase
from .models import Note
from django.utils import timezone

from rest_framework.test import APIClient
from rest_framework import status


# Create your tests here.
class NoteTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.note = Note.objects.create(
            title="First title for note",
            description="A description",
        )

    def test_model_content(self):
        self.assertEqual(self.note.title, "First title for note")
        self.assertEqual(self.note.description, "A description")
        self.assertTrue(self.note.created_at is not None)
        self.assertTrue(self.note.updated_at is not None)

    def test_recently_updated(self):
        """
        Test that the 'recently_updated' method returns True if the note was
        updated within the last day.
        """
        self.assertTrue(self.note.recently_updated())

    def test_str_representation(self):
        """
        Test the __str__ method of the Note model.
        """
        self.assertEqual(str(self.note), 'First title for note')

    def test_description_null(self):
        """
        Test that the description field can be null.
        """
        note = Note.objects.create(title='Null Description Note')
        self.assertIsNone(note.description)

    def test_description_max_length(self):
        """
        Test that the description field has a maximum length of 255 or None.
        """
        max_length = self.note._meta.get_field('description').max_length
        self.assertEqual(max_length, None)

    # @classmethod
    # def setUpTestData(self):
    #     # Testing Notes
    #     self.note = Note.objects.create(
    #         title='Test Note',
    #         description='This is a test note.'
    #     )
    #     self.client = APIClient()
    #
    # def test_get_all_notes(self):
    #     response = self.client.get('/api/notes/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #
    # def test_get_note_detail(self):
    #     response = self.client.get(f'/api/notes/{self.note.id}/')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    # #
    # def test_create_note(self):
    #     data = {'title': 'New Note', 'description': 'This is a new note.'}
    #     response = self.client.post('/api/notes/create/', data, format='json')
    #     print('create note ----> ',response.status_code)
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #
    # def test_update_note(self):
    #     data = {'title': 'Updated Note', 'description': 'This note has been updated.'}
    #     response = self.client.put(f'/api/notes/update/{self.note.id}/', data, content_type='application/json')
    #     print('update note ---> ',response.status_code)
    #     # print('update content ---> ',response.content)
    #     # print('update content ---> ',response.headers)
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)
    #
    #     updated_note = Note.objects.get(id=self.note.id)
    #     print(updated_note)
    #     self.assertEqual(updated_note.title, 'Updated Note')
    #     self.assertEqual(updated_note.description, 'This note has been updated.')
    #
    # def test_delete_note(self):
    #     response = self.client.delete(f'/api/notes/delete/{self.note.id}/')
    #     print('update note ---> ',response.status_code)
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
    #     # Verify that the note has been deleted
    #     with self.assertRaises(Note.DoesNotExist):
    #         Note.objects.get(id=self.note.id)


