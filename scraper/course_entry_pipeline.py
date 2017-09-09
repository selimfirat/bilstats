from scrapy import signals
from scrapy.exporters import CsvItemExporter
import csv

class CourseEntryPipeline(object):
    
    output_file = '../data/entries.csv'
    
    @classmethod
    def from_crawler(cls, crawler):
        pipeline = cls()
        crawler.signals.connect(pipeline.spider_opened, signals.spider_opened)
        crawler.signals.connect(pipeline.spider_closed, signals.spider_closed)
        return pipeline

    def spider_opened(self, spider):
        self.file = open(self.output_file, 'w+b')
        self.exporter = CsvItemExporter(self.file)
        self.exporter.start_exporting()

    def spider_closed(self, spider):
        self.exporter.finish_exporting()
        self.file.close()

        with open(self.output_file, 'r') as f:
            reader = csv.reader(f)
            original_list = list(reader)
            cleaned_list = list(filter(None, original_list))

        with open(self.output_file, 'w', newline='') as self.output_file:
            wr = csv.writer(self.output_file, dialect='excel')
            for data in cleaned_list:
                wr.writerow(data)

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        return item
