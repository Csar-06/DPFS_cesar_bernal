import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const LatestUser = ({ user }) => {

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
      }
      
    return (
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className='flex text-2xl'>Latest User</CardTitle>
            <CardDescription className='flex'>
              Joined on {formatDate(user.joinDate)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.avatar != '' ?`http://localhost:3000/${user.avatar}`: `http://localhost:3000/uploads/user_avatar/user.PNG?height=40&width=40` } alt={user.name} />
                <AvatarFallback>{`Avatar`}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="flex font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge className='flex' variant="outline">User</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
    );
}

export default LatestUser;
