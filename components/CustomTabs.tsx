import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function CustomTabs({list}: array) {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
            {
                list.map(item => {
                    return (
                        <div key={item.id}>
                            <TabsTrigger value={item.name}> { item.name } </TabsTrigger>
                        </div>
                    )
                })
            }
        </TabsList>
    </Tabs>
  )
}

export default CustomTabs