# Generated by Django 3.0.7 on 2021-10-26 03:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('user1', models.CharField(max_length=32)),
                ('user2', models.CharField(max_length=32)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('sender', models.CharField(max_length=32)),
                ('reciever', models.CharField(max_length=32)),
                ('timestamp', models.CharField(max_length=32)),
                ('conversation_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.Conversation')),
            ],
        ),
        migrations.CreateModel(
            name='Inbox',
            fields=[
                ('id', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='conversation',
            name='inbox_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat.Inbox'),
        ),
    ]
