import pandas as pd
import numpy as np

df = pd.read_csv("../data/entries.csv")
df = df.sort_values(["department", "year", "semester", "course_code", "section", "instructor", "gpa_section", "student_count"])

departments_list = np.unique(df["department"])

df = df.groupby("department")


# Create data/departments.json
departments = {}

for dep in departments_list:
    dep_df = df.get_group(dep)
    courses_list = np.unique(dep_df["course_code"])

    department_file = open(f"../data/departments/{dep}.json", "w")
    department_file.write(dep_df.to_json(orient="records"))
    department_file.close()

    print(f"data/departments/{dep}.json file has been created.")

    departments[dep] = courses_list

departments_file = open("../data/departments.json", "w")
departments_file.write(pd.Series(departments).to_json())
departments_file.close()

print()
print(f"data/departments.json file has been created.")
print()
print("Data processing has been successful.")