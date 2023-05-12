from django.db import models


class Book(models.Model):

    title = models.CharField(max_length=100, unique=True)
    lexicon = models.JSONField(null=True, blank=True, default=list)
    notes = models.JSONField(null=True, blank=True, default=dict)
    level = models.SmallIntegerField(null=True, blank=True)

    def __str__(self):
        return self.title

    def update(self, lexicon=[], notes={}):
        self.lexicon = list(set(self.lexicon + lexicon))
        self.notes = {**self.notes, **notes}
        self.save()


class Text(models.Model):

    title = models.CharField(max_length=100)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    chapter = models.SmallIntegerField()
    text = models.CharField(max_length=3000)
    textData = models.JSONField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["book", "chapter"], name="uniqueBookChapter"
            ),
            models.UniqueConstraint(
                fields=["book", "title"], name="uniqueTextTitle"
            )
        ]

    def __str__(self):
        return self.title
