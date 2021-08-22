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
        fields = ("user","lab_name", "lab_description", "id") 

class LabDetailType(DjangoObjectType):
    class Meta:
        model = LabDetail
        fields = ("id","base_info", "long_description")

class MilestoneType(DjangoObjectType):
    class Meta:
        model = Milestone
        fields = ("milestone", "mile_relation", "mile_des")

class ResourceType(DjangoObjectType):
    class Meta:
        model = Resources
        fields = ("resource", "res_relation")

class LabInput(graphene.InputObjectType):
    id = graphene.ID()
    user = graphene.String()
    lab_name = graphene.String()
    lab_description = graphene.String()

class LabDetailInput(graphene.InputObjectType):
    id = graphene.ID()
    long_description = graphene.String()

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

class UpdateLab(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = LabInput(required=True)
        
    lab = graphene.Field(LabType)

    @staticmethod
    def mutate(root, info, id, input=None):
        lab_instance = Lab.objects.get(pk=id)
        if lab_instance:
            lab_instance.lab_name = input.lab_name
            lab_instance.lab_description= input.lab_description
            lab_instance.save()
            return UpdateLab(lab=lab_instance)
        return UpdateLab(lab=None)
    
class UpdateLabDetails(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        input = LabDetailInput(required=True)

    lab_detail = graphene.Field(LabDetailType)
    
    @staticmethod
    def mutate(root, info, id, input=None):
        details_instance = LabDetail.objects.get(pk=id)
        if details_instance:
            details_instance.long_description = input.long_description
            details_instance.save()
            return UpdateLabDetails(lab_detail = details_instance)
        return UpdateLabDetails(lab_detail = None)


        
class Mutation(graphene.ObjectType):
    create_lab = CreateLab.Field()
    update_lab = UpdateLab.Field()
    update_labDetail = UpdateLabDetails.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    
class Query(ObjectType):
    labs = graphene.List(LabType, user=graphene.String(required=True))
    labDetail = graphene.List(LabDetailType)
    labDetails = graphene.List(LabDetailType, labid=graphene.String(required=True))
    users = graphene.List(UserType)
    milestones = graphene.List(MilestoneType, labid=graphene.String(required=True))
    resources = graphene.List(ResourceType, labid=graphene.String(required=True))
    def resolve_users(self, info):
        return get_user_model().objects.all()

    def resolve_labs(self, info, user):
        try:
            return Lab.objects.filter(user__username=user).all()
        except:
            return None

    def resolve_labDetails(self, info, labid):
        try:
            return LabDetail.objects.filter(id=labid).all()
        except:
            return None

    def resolve_labDetail(self, info):
        try:
            return LabDetail.objects.all()
        except:
            return None

    def resolve_milestones(root,info, labid):
        try:
            return Milestone.objects.filter(mile_relation__id=labid).all()
        except Milestone.DoesNotExist:
            return None
    
    def resolve_resources(root, info, labid):
        try:
            return Resources.objects.filter(res_relation__id=labid).all()
        except:
            return None
        

schema = graphene.Schema(query=Query, mutation=Mutation)