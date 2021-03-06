# Generated by Django 2.2.12 on 2020-06-05 19:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('food_items', '0002_auto_20200603_0003'),
    ]

    operations = [
        migrations.AddField(
            model_name='fooditem',
            name='status',
            field=models.CharField(choices=[('in_pantry', 'in_pantry'), ('eaten', 'eaten'), ('wasted', 'wasted')], default='in_pantry', max_length=16),
        ),
        migrations.AlterField(
            model_name='ingredient',
            name='recipe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='ingredients', to='food_items.Recipe'),
        ),
        migrations.AlterField(
            model_name='instruction',
            name='recipe',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instructions', to='food_items.Recipe'),
        ),
    ]
