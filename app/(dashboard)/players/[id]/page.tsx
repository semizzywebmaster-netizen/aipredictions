import { Card, CardContent } from '@/components/ui/card'
export default function PlayerPage({ params }: { params: { id: string } }) { return <div className="space-y-6"><h1 className="text-2xl font-bold">Player {params.id}</h1><Card><CardContent className="p-6 text-sm">Player profile • Stats via /api/v1/players/{params.id}/stats • Recent matches • Follow/save</CardContent></Card></div> }
