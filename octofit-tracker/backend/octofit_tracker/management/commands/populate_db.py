from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from django.utils import timezone


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        """Populate the database with superhero test data"""
        
        # Clear existing data
        self.stdout.write(self.style.WARNING('Clearing existing data...'))
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        User.objects.all().delete()
        Team.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Marvel Universe superheroes'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='DC Universe superheroes'
        )

        # Create Marvel team heroes
        self.stdout.write(self.style.SUCCESS('Creating Marvel team members...'))
        marvel_heroes = [
            {'username': 'iron_man', 'email': 'tony@marvel.com', 'first_name': 'Tony', 'last_name': 'Stark'},
            {'username': 'captain_america', 'email': 'steve@marvel.com', 'first_name': 'Steve', 'last_name': 'Rogers'},
            {'username': 'thor', 'email': 'thor@marvel.com', 'first_name': 'Thor', 'last_name': 'Odinson'},
            {'username': 'hulk', 'email': 'bruce@marvel.com', 'first_name': 'Bruce', 'last_name': 'Banner'},
            {'username': 'spider_man', 'email': 'peter@marvel.com', 'first_name': 'Peter', 'last_name': 'Parker'},
        ]

        marvel_users = []
        for hero_data in marvel_heroes:
            user = User.objects.create_user(
                username=hero_data['username'],
                email=hero_data['email'],
                password='testpass123',
                first_name=hero_data['first_name'],
                last_name=hero_data['last_name'],
                team=team_marvel,
                points=0
            )
            marvel_users.append(user)

        # Create DC team heroes
        self.stdout.write(self.style.SUCCESS('Creating DC team members...'))
        dc_heroes = [
            {'username': 'batman', 'email': 'bruce@dc.com', 'first_name': 'Bruce', 'last_name': 'Wayne'},
            {'username': 'superman', 'email': 'clark@dc.com', 'first_name': 'Clark', 'last_name': 'Kent'},
            {'username': 'wonder_woman', 'email': 'diana@dc.com', 'first_name': 'Diana', 'last_name': 'Prince'},
            {'username': 'flash', 'email': 'barry@dc.com', 'first_name': 'Barry', 'last_name': 'Allen'},
            {'username': 'aquaman', 'email': 'arthur@dc.com', 'first_name': 'Arthur', 'last_name': 'Curry'},
        ]

        dc_users = []
        for hero_data in dc_heroes:
            user = User.objects.create_user(
                username=hero_data['username'],
                email=hero_data['email'],
                password='testpass123',
                first_name=hero_data['first_name'],
                last_name=hero_data['last_name'],
                team=team_dc,
                points=0
            )
            dc_users.append(user)

        # Create sample activities for both teams
        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        activity_types = ['running', 'cycling', 'swimming', 'strength', 'yoga', 'cardio']
        all_users = marvel_users + dc_users

        for user in all_users:
            for i in range(5):
                Activity.objects.create(
                    user=user,
                    activity_type=activity_types[i % len(activity_types)],
                    duration_minutes=30 + (i * 10),
                    calories_burned=200 + (i * 50),
                    distance_km=5.0 + (i * 1.0) if i % 2 == 0 else None,
                    description=f'{user.first_name} completed a {activity_types[i % len(activity_types)]} activity',
                    created_at=timezone.now()
                )

        # Create leaderboard entries
        self.stdout.write(self.style.SUCCESS('Creating leaderboard entries...'))
        
        # Calculate points for each user
        rank = 1
        sorted_users = sorted(all_users, key=lambda u: sum(a.calories_burned for a in u.activities.all()), reverse=True)
        
        for user in sorted_users:
            total_points = sum(a.calories_burned for a in user.activities.all())
            total_activities = user.activities.count()
            total_calories = total_points
            
            Leaderboard.objects.create(
                user=user,
                team=user.team,
                total_points=total_points,
                total_activities=total_activities,
                total_calories=total_calories,
                rank=rank
            )
            rank += 1

        # Create sample workouts
        self.stdout.write(self.style.SUCCESS('Creating workout suggestions...'))
        workouts = [
            {
                'name': 'Morning Cardio Blast',
                'description': 'High-intensity cardio workout to start your day',
                'difficulty': 'intermediate',
                'duration_minutes': 30,
                'target_calories': 250,
                'exercises': ['Jumping Jacks', 'High Knees', 'Burpees', 'Mountain Climbers']
            },
            {
                'name': 'Strength Training Session',
                'description': 'Build muscle with this full-body strength routine',
                'difficulty': 'advanced',
                'duration_minutes': 45,
                'target_calories': 350,
                'exercises': ['Squats', 'Deadlifts', 'Bench Press', 'Rows']
            },
            {
                'name': 'Beginner Yoga Flow',
                'description': 'Relaxing yoga session perfect for beginners',
                'difficulty': 'beginner',
                'duration_minutes': 30,
                'target_calories': 100,
                'exercises': ['Child Pose', 'Cat-Cow', 'Downward Dog', 'Warrior Pose']
            },
            {
                'name': 'Evening Run',
                'description': 'Distance running workout for endurance building',
                'difficulty': 'intermediate',
                'duration_minutes': 40,
                'target_calories': 300,
                'exercises': ['Warm-up', 'Steady Pace Running', 'Speed Intervals', 'Cool Down']
            },
            {
                'name': 'Swimming Lap Session',
                'description': 'Full-body swimming workout using multiple strokes',
                'difficulty': 'advanced',
                'duration_minutes': 45,
                'target_calories': 400,
                'exercises': ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly']
            }
        ]

        for workout_data in workouts:
            Workout.objects.create(**workout_data)

        self.stdout.write(self.style.SUCCESS('✓ Database population completed successfully!'))
        self.stdout.write(f'Created {len(all_users)} superhero users across 2 teams')
        self.stdout.write(f'Created {Activity.objects.count()} activities')
        self.stdout.write(f'Created {Leaderboard.objects.count()} leaderboard entries')
        self.stdout.write(f'Created {Workout.objects.count()} workout suggestions')
