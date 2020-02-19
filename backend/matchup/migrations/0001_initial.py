# Generated by Django 3.0.3 on 2020-02-19 10:41

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('user_count', models.IntegerField(default=0)),
                ('lock', models.BooleanField(default=False)),
                ('user1', models.UUIDField(blank=True, null=True)),
                ('user2', models.UUIDField(blank=True, null=True)),
                ('user1_choice', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('user2_choice', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('user1_ready', models.BooleanField(default=False)),
                ('user2_ready', models.BooleanField(default=False)),
                ('first_to_ready', models.UUIDField(blank=True, null=True)),
                ('user1_bet', models.PositiveIntegerField(default=0)),
                ('user2_bet', models.PositiveIntegerField(default=0)),
                ('user1_wins', models.PositiveSmallIntegerField(default=0)),
                ('user2_wins', models.PositiveSmallIntegerField(default=0)),
                ('started', models.BooleanField(default=False)),
                ('rounds_finished', models.PositiveSmallIntegerField(default=0)),
            ],
        ),
    ]
