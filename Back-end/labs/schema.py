from django.db.models import fields
from django.contrib.auth import get_user_model
import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from .models import *

class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class LabType(DjangoObjectType):
    class Meta:
        model = Lab
        fields = ("user","lab_name", "lab_description")

class LabDetailType(DjangoObjectType):
    class Meta:
        model = LabDetail
        fields = ("base_info", "long_description ")

class Query(ObjectType):
    labs = graphene.List(LabType)
    labDetails = graphene.List(LabDetailType)
    users = graphene.List(UserType)

    def resolve_users(self, info):
        return get_user_model().objects.all()

    def resolve_labs(self, info, **kwargs):
        return Lab.objects.all()

    def resolve_labDetails(self, info, **kwargs):
        return LabDetail.objects.all()

schema = graphene.Schema(query=Query)