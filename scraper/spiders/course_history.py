import scrapy
from scrapy import Request
from datetime import datetime

from course_entry import CourseEntry


class CourseHistorySpider(scrapy.Spider):

    name = "course_history"
    custom_settings = {
        "ITEM_PIPELINES": {
            'course_entry_pipeline.CourseEntryPipeline': 300,
        },
        "DOWNLOAD_DELAY": 0.01,
    }

    php_sessid = ""

    start_urls = []

    departments = ["ACC", "ADA", "AMER", "ARCH", "BF", "BIM", "BTE", "CAA", "CAD", "CHEM", "CI", "CINT", "CITE", "COMD", "CS", "CTE", "CTIS", "CTP", "DIR", "ECON", "EDEB", "EE", "EEE", "ELIT", "ELS", "EM", "EMBA", "ENG", "ETE", "ETS", "FA", "FRE", "FRL", "FRP", "GE", "GER", "GIA", "GRA", "HART", "HCIV", "HIST", "HISTR", "HUM", "IAED", "IE", "IR", "ITA", "JAP", "LAUD", "LAW", "MAN", "MATH", "MBA", "MBG", "ME", "MIAPP", "MSC", "MSG", "MSN", "MTE", "MUS", "MUSS", "NSC", "PE", "PHIL", "PHYS", "PNT", "POLS", "PREP", "PSYC", "RUS", "SFL", "SOC", "SPA", "TE", "TEFL", "THEA", "THM", "THR", "THS", "TRIN", "TRK", "TTP", "TURK"]

    def __init__(self, PHPSESSID="q98jp4rl7jnfobvfve2190r0m1", *args, **kwargs):
        super(CourseHistorySpider, self).__init__(*args, **kwargs)
        self.php_sessid = PHPSESSID

    def start_requests(self):
        for department in self.departments:
            for year in range(1986, datetime.now().year + 1):
                for semester in range(1, 4):
                    url = f"https://stars.bilkent.edu.tr/homepage/print/plainOfferings.php?COURSE_CODE={department}&SEMESTER={year}{semester}"

                    yield Request(url, cookies={'PHPSESSID': self.php_sessid},
                                  meta={"department": department, "semester_num": semester, "year": year})


    def parse(self, response):
        department = response.meta["department"]
        year = int(response.meta["year"])
        semester = ["Fall", "Spring", "Summer"][response.meta["semester_num"] - 1]

        rows = response.css("table#ppoTable tbody tr")

        for index, row in enumerate(rows):
            cols_raw = row.css("td")

            cols = []
            for col in cols_raw:
                if (col.css("span::text").extract_first()):
                    cols.append(col.css("span::text").extract_first())
                else:
                    cols.append(col .css("::text").extract_first())


            yield CourseEntry(
                department = department,
                year = year,
                semester = semester,
                course_code = cols[0].split('-')[0],
                section = int(cols[0].split('-')[1]),
                course_name = cols[1],
                instructor = cols[2],
                credits_bilkent = float(cols[3]),
                credits_ects = float(cols[4]),
                student_count = int(cols[5]),
                gpa_section = float(cols[6]),
                gpa_course = float(cols[7]),
            )

