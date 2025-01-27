import APP_ROUTES from '@/constants/routes'
import Link from 'next/link'
import React from 'react'

const SidebarLinks = () => {
    const links = [
        {
            name: 'Attendence',
            path: APP_ROUTES.dasboard.attendence
        },
        {
            name: 'Centers',
            path: APP_ROUTES.dasboard.centers
        },
        {
            name: 'Members',
            path: APP_ROUTES.dasboard.members
        },
        {
            name: 'Visitors',
            path: APP_ROUTES.dasboard.visitors
        },
        {
            name: 'Reports',
            path: APP_ROUTES.dasboard.reports
        },
        {
            name: 'Sessions',
            path: APP_ROUTES.dasboard.sessions
        },
        {
            name: 'Expenses',
            path: APP_ROUTES.dasboard.expenses
        },
        {
            name: 'Messages',
            path: APP_ROUTES.dasboard.messages
        },
        {
            name: 'Setup',  
            path: APP_ROUTES.dasboard.setup
        }
    ]
    return (
        <>
            <div className='flex flex-col gap-2 py-6'>
                {
                    links.map((singleLink) => {
                        return (
                            <Link className='hover:bg-gray-700 p-2 rounded' href={singleLink.path} key={singleLink.name}>{singleLink.name}</Link>
                        )
                    })
                }
            </div>
        </>
    )
}

export default SidebarLinks
