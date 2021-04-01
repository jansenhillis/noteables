from django.db import models
from datetime import datetime
from login.models import User
import re

# Create your models here.

class NoteManager(models.Manager):
    def validator(self, postData):
        errors = {}
        if len(postData['note_content']) < 1:
            errors['note_content'] = 'Something needs to be written in the notes content.'
        if len(postData['note_title']) < 1:
            errors['note_title'] = 'Note needs a title.'
        return errors


class Note(models.Model):
    created_by = models.ForeignKey(User, related_name="notes_created", on_delete=models.CASCADE)
    note_content = models.CharField(max_length=1000)
    note_title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects = NoteManager()

    def __repr__(self):
        return f"<Note object: ({self.id}) {self.note_title}"