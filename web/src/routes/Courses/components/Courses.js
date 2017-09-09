import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import _ from 'lodash'
import departments from "../../../../public/data/departments.json"
import { browserHistory } from "react-router"
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

let renderCell = row => {
                    return (
                      <div>
                        <div style={{
                                  width: '80%',
                                  height: '100%',
                                  backgroundColor: '#dadada',
                                  borderRadius: '2px',
                                  color: "#fff",
                                  fontWeight: 450
                                }}
                              >
                            <div
                                    style={{
                                      width: `${row.value * 25}%`,
                                      height: '100%',
                                      backgroundColor: row.value >= "3.0" ? '#85cc00'
                                        : row.value >= "2.0" ? '#ffbf00'
                                        : '#ff2e00',
                                      borderRadius: '2px',
                                      transition: 'all .2s ease-out',
                                      paddingLeft: "8px"
                                    }}
                            >
                          {row.value.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
}

export const Courses = ({ data, getData }) => {
    let showDepartments = true
    return (
        <div style={{ margin: '0 auto', }} >
    { showDepartments &&
      <div style={{ paddingBottom: "0.5rem", textAlign: "center"}}>
          {Object.keys(departments).map(function (dep) {
              return <PrimaryButton
                  key={dep}
                  style={{margin: "3px", width: "80px"}}
                  text={dep}
                  onClick={ () => { browserHistory.push("/courses/" + dep); getData(dep);  } }
                />
          })}
      </div>
    }
  { data &&
    <ReactTable
      data={data}
      columns={[
            {
              Header: "Course",
              accessor: "course_code",
              aggregate: vals => _.join(_.uniq(vals), ', '),
              maxWidth: 200,
              Aggregated: row => {
                return (
                  <span>
                    {row.value}
                  </span>
                );
              }
            },
            {
              Header: "Instructor(s)",
              id: "instructor",
              accessor: d => d.instructor
            },
            {
              Header: "Semester(s)",
              accessor: d => d.year + ' ' + d.semester,
              id: "semester",
              maxWidth: 180,
              aggregate: vals => {
                let min = _.min(vals)
                let max = _.max(vals)

                min = min.split(' - ')[0]
                max = max.split(' - ')[0]

                if (min === max)
                  return min
                else
                  return min + ' - ' + max

              },
              Aggregated: row => {
                return (
                  <span>
                    {row.value}
                  </span>
                );
              }
            },
            {
              Header: "GPA",
              accessor: "gpa_section",
              minWidth: 100,
              aggregate: vals => Number(Number(_.round(_.mean(vals), 2)).toFixed(2)),
              Aggregated: renderCell,
              Cell: renderCell
            },
            {
              Header: "Student Count",
              accessor: "student_count",
              maxWidth: 120,
              aggregate: vals => _.round(_.mean(vals), 0),
              Aggregated: row => {
                return (
                  <span>
                    {row.value} (avg)
                  </span>
                );
              }
            }
          ]
        }
      pivotBy={["course_code", "instructor"]}
      style={{
          height: "600px" // This will force the table body to overflow and scroll, since there is not enough room
      }}
      defaultPageSize={25}
      className="-striped -highlight"
    />
      }
  </div>
)
}
Courses.propTypes = {
  data: PropTypes.array
}

export default Courses
