from django.db.models import fields
from django.contrib.auth import get_user_model
import graphene
from graphql_auth import mutations
from graphene.types.mutation import Mutation
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
        fields = ("base_info", "long_description")

class MilestoneType(DjangoObjectType):
    class Meta:
        model = Milestone
        fields = ("milestone", "mile_relation")

class LabInput(graphene.InputObjectType):
    id = graphene.ID()
    user = graphene.String()
    lab_name = graphene.String()
    lab_description = graphene.String()

class CreateLab(graphene.Mutation):
    class Arguments:
        input = LabInput(required=True)

    lab = graphene.Field(LabType)

    @staticmethod
    def mutate(root, info, input=None):
        lab = Lab(
            user_id = input.user,
            lab_name = input.lab_name,
            lab_description = input.lab_description
        )
        lab.save
        return CreateLab(lab=lab)
        
        
class Mutation(graphene.ObjectType):
    create_lab = CreateLab.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    
class Query(ObjectType):
    labs = graphene.List(LabType, user=graphene.String(required=True))
    labDetails = graphene.List(LabDetailType)
    users = graphene.List(UserType)
    milestones = graphene.List(MilestoneType, labname=graphene.String(required=True))
    def resolve_users(self, info):
        return get_user_model().objects.all()

    def resolve_labs(self, info, user):
        try:
            return Lab.objects.filter(user__username=user).all()
        except:
            return None

    def resolve_labDetails(self, info, **kwargs):
        return LabDetail.objects.all()

    def resolve_milestones(root,info, labname):
        try:
            return Milestone.objects.filter(mile_relation__lab_name=labname).all()
        except Milestone.DoesNotExist:
            return None
        
        

schema = graphene.Schema(query=Query, mutation=Mutation)