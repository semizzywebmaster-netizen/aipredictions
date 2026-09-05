import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function TeamProfile({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team {params.id} Profile</h1>
      <Tabs defaultValue="overview">
        <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="fixtures">Fixtures</TabsTrigger><TabsTrigger value="roster">Roster</TabsTrigger><TabsTrigger value="stats">Stats</TabsTrigger></TabsList>
        <TabsContent value="overview"><Card><CardContent className="p-6 text-sm text-muted-foreground">Team profile: statistics, form, standings, roster, recent matches, upcoming fixtures, injuries/suspensions where supplied by /api/v1/teams/{params.id}. Follow/save functionality.</CardContent></Card></TabsContent>
        <TabsContent value="fixtures"><Card><CardContent className="p-6 text-sm">Fixtures via /api/v1/teams/{params.id}/fixtures</CardContent></Card></TabsContent>
        <TabsContent value="roster"><Card><CardContent className="p-6 text-sm">Roster via /api/v1/teams/{params.id}/roster • Player profiles</CardContent></Card></TabsContent>
        <TabsContent value="stats"><Card><CardContent className="p-6 text-sm">Stats via /api/v1/teams/{params.id}/stats</CardContent></Card></TabsContent>
      </Tabs>
    </div>
  )
}
