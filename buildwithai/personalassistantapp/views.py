from .buildwithaiassistant import AskGeminiAI
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


# Create your views here.
@api_view(['POST'])
def HomePage(request):
    print('called')
    questionSerializer = {
        "question": request.data
    }
    print('questionSerializer')
    print(questionSerializer)
    serializer = QuestionSerializer(data = questionSerializer)
    if serializer.is_valid():
        question = serializer.data['question']
        # question = 'what services fo you offer'
        AIResponse = AskGeminiAI(question)
        print('\n response')
        print(AIResponse)
        
        if(AIResponse):
            return Response({
                "status": status.HTTP_200_OK,
                "reply": AIResponse,
            })
        # else:
        return Response({
            "status": status.HTTP_200_OK,
            "AIResponse": 'An error occured',
        }) 
        
    
    return Response({
        "status": status.HTTP_200_OK,
        "message": 'AIResponse',
    })
            
            
            