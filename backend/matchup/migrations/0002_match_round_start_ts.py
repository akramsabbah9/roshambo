# Generated by Django 3.0.3 on 2020-02-21 06:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matchup', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='match',
            name='round_start_ts',
            field=models.PositiveIntegerField(default=2147483647),
        ),
    ]
