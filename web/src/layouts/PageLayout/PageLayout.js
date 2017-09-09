import React from 'react'
import { browserHistory  } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';

export const PageLayout = ({ children, props }) => (
  <div className='container ms-Grid'>
        <div className="ms-Grid-row text-center">
            <div className='page-layout__viewport'>
              {children}
            </div>

            <CommandBar
              isSearchBoxVisible={ false }
              searchPlaceholderText='Search...'
              elipisisAriaLabel='More options'
              items={ [
                  {
                      name: "Home",
                      onClick: () => { browserHistory.push('/') },
                      iconProps: {
                          iconName: "Home"
                      }
                  },
                  {
                      name: "Courses",
                      onClick: () => { browserHistory.push('/courses') },
                      iconProps: {
                          iconName: "GroupedList"
                      }
                  },
                  {
                      name: "Instructors",
                      onClick: () => { browserHistory.push('/instructors') },
                      iconProps: {
                          iconName: "People"
                      }
                  }
              ] }
              overflowItems={[
                  {
                      name: 'Sort table by clicking titles like "Course", "Instructor", etc.',
                      iconProps: {
                          iconName: "Accept"
                      },
                      disabled: true
                  },
                  {
                      name: 'Hold shift when sorting to multi-sort.',
                      iconProps: {
                          iconName: "Accept"
                      },
                      disabled: true
                  },
                  {
                      name: 'BilStats is an unofficial tool and just organizes public data.',
                      iconProps: {
                          iconName: "Accept"
                      },
                      disabled: true
                  }
              ]}
              farItems={[
                  {
                      name: "Selim Fırat Yılmaz",
                      title: "yilmazselimfirat@gmail.com",
                      href: "http://selimfirat.net/",
                      onClick: () => {
                          window.open("http://selimfirat.net/", '_blank');
                      },
                      iconProps: {
                          iconName: "FavoriteStarFill"
                      }
                  }
              ]}
            />
        </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
