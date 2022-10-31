from django.shortcuts import render
from django.http import HttpResponse
from google.cloud import bigquery
from rest_framework.response import Response
from rest_framework.decorators import api_view
import random
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
# from django.contrib.auth.models import User
from .models import MUser
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, RegisterSerializer


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


# class MyObtainTokenPairView(TokenObtainPairView):
#     permission_classes = (AllowAny,)
#     serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = MUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

@api_view(('GET',))
def table(request):
    try:
        # Construct a BigQuery client object.
        client = bigquery.Client()
        query = """
        SELECT *
        FROM `cloud-work-314310.peopledb_dataset.db_table`
    """
        query_job = client.query(query)  # Make an API request

        result = query_job.to_dataframe()

        result = result.to_dict('records')

        random.shuffle(result)

        return Response(result)
    except Exception as e:
        print(e)
        return Response(status=404)
