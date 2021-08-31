from django.db.models import fields
from django.contrib.auth import get_user_model
import graphene
from django.conf import settings
from graphql_auth import mutations
from graphene.types.mutation import Mutation
from graphene_django.types import DjangoObjectType, ObjectType
from .models import *
User = settings.AUTH_USER_MODEL

class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)

    def mutate(self, info, username, password, email):
        user = get_user_model()(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()
        return CreateUser(user=user)

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

class ResourceInput(graphene.InputObjectType):
    id = graphene.ID()
    lab_name = graphene.String()
    resource = graphene.String()

class MilestoneInput(graphene.InputObjectType):
    id = graphene.ID()
    lab_name = graphene.String()
    milestone = graphene.String()
    mile_des = graphene.String()

class LabInput(graphene.InputObjectType):
    id = graphene.ID()
    user = graphene.String()
    lab_name = graphene.String()
    lab_description = graphene.String()

class LabDetailInput(graphene.InputObjectType):
    id = graphene.ID()
    lab_name = graphene.String()
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
        lab.save()
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

class CreateLabDetails(graphene.Mutation):
    class Arguments: 
        input = LabDetailInput(required=True)

    lab_detail = graphene.Field(LabDetailType)
    
    @staticmethod
    def mutate(root, info,input=None):
        lab = Lab.objects.get(lab_name=input.lab_name)
        lab_detail = LabDetail(
            base_info_id = lab.id,
            long_description = input.long_description
        )
        lab_detail.save()
        return CreateLabDetails(lab_detail=lab_detail)

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

class CreateResource(graphene.Mutation):
    class Arguments:
        input = ResourceInput(required=True)
    
    resource = graphene.Field(ResourceType)
    @staticmethod
    def mutate(root, info, input=None):
        lab = Lab.objects.get(lab_name=input.lab_name)
        resource = Resources(
            res_relation_id = lab.id,
            resource = input.resource
        )
        resource.save()
        return CreateResource(resource=resource)

class CreateMilestone(graphene.Mutation):
    class Arguments:
        input = MilestoneInput(required=True)

    milestone = graphene.Field(MilestoneType)

    @staticmethod
    def mutate(root, info, input=None):
        lab = Lab.objects.get(lab_name=input.lab_name)
        milestone = Milestone(
            mile_relation_id = lab.id,
            milestone = input.milestone,
            mile_des = input.mile_des
        )
        milestone.save()
        return CreateMilestone(milestone=milestone)
        
class Mutation(graphene.ObjectType):
    create_lab = CreateLab.Field()
    update_lab = UpdateLab.Field()
    create_labDetail = CreateLabDetails.Field()
    create_resource = CreateResource.Field()
    create_milestone = CreateMilestone.Field()
    update_labDetail = UpdateLabDetails.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    create_user = CreateUser.Field()
    
class Query(ObjectType):
    labs = graphene.List(LabType, user=graphene.String(required=True))
    labDetail = graphene.List(LabDetailType)
    labDetails = graphene.List(LabDetailType, labid=graphene.String(required=True))
    users = graphene.List(UserType)
    userId = graphene.List(UserType,  username=graphene.String(required=True))
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
            return LabDetail.objects.filter(base_info_id=labid).all()
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
        
    def resolve_userId(root, info, username):
        try:
            return get_user_model().objects.filter(username=username)
        except:
            return None
        

schema = graphene.Schema(query=Query, mutation=Mutation)