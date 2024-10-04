# Generated by Django 4.2.2 on 2024-09-29 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('betopoem', '0007_alter_poemsubcorpus_keywords'),
    ]

    operations = [
        migrations.CreateModel(
            name='PoemCorpus',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.SlugField(max_length=200, unique=True)),
                ('title', models.CharField(max_length=200, null=True)),
                ('author', models.CharField(max_length=200, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('keywords', models.TextField(blank=True, max_length=1000, null=True)),
                ('detail_url', models.CharField(blank=True, max_length=200, null=True)),
                ('similars', models.ManyToManyField(blank=True, to='betopoem.poemcorpus')),
            ],
            options={
                'ordering': ['title'],
            },
        ),
    ]