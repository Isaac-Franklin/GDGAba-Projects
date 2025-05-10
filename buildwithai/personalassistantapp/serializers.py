from rest_framework import serializers
from .models import *



class QuestionSerializer(serializers.Serializer):
    question = serializers.CharField()

