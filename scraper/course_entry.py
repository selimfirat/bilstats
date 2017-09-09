from scrapy.item import Item, Field


class CourseEntry(Item):
    year = Field()
    semester = Field()
    department = Field()
    course_code = Field()
    course_name = Field()
    instructor = Field()
    student_count = Field()
    gpa_section = Field()
    gpa_course = Field()
    section = Field()
    credits_bilkent = Field()
    credits_ects = Field()