# Generated by Django 3.0.7 on 2021-09-08 15:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customerrequest',
            old_name='status',
            new_name='email',
        ),
        migrations.RenameField(
            model_name='customerrequest',
            old_name='user_id',
            new_name='username',
        ),
    ]