from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


class TeamSerializer(serializers.ModelSerializer):
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['id', 'name', 'description', 'member_count', 'created_at', 'updated_at']
    
    def get_member_count(self, obj):
        return obj.members.count()


class UserSerializer(serializers.ModelSerializer):
    team = TeamSerializer(read_only=True)
    team_id = serializers.PrimaryKeyRelatedField(write_only=True, source='team', queryset=Team.objects.all(), required=False, allow_null=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'team', 'team_id', 'points', 'rank', 'created_at', 'updated_at']


class ActivitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(write_only=True, source='user', queryset=User.objects.all())

    class Meta:
        model = Activity
        fields = ['id', 'user', 'user_id', 'activity_type', 'duration_minutes', 'calories_burned', 'distance_km', 'description', 'created_at', 'updated_at']


class LeaderboardSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    team = TeamSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(write_only=True, source='user', queryset=User.objects.all())
    team_id = serializers.PrimaryKeyRelatedField(write_only=True, source='team', queryset=Team.objects.all())

    class Meta:
        model = Leaderboard
        fields = ['id', 'user', 'user_id', 'team', 'team_id', 'total_points', 'total_activities', 'total_calories', 'rank', 'updated_at']


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['id', 'name', 'description', 'difficulty', 'duration_minutes', 'target_calories', 'exercises', 'created_at', 'updated_at']
