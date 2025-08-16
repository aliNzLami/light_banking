'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function CustomTabs({list, onClick = () => {}, type = "", defaultValue}: CustomTabsProps) {

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 7
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };
    
    return (
        <>
        <Tabs defaultValue={defaultValue} className="w-[100%] pb-[20px] overflow-x-auto">
            <TabsList>
                    {
                        list.map((item, index) => {
                            return (
                                <div key={index}>
                                    <TabsTrigger className="cursor-pointer me-3" value={type === 'bank' ? item.$id : item.id} onClick={() => onClick(item)}> 
                                        { type === 'bank' ? JSON.parse(item.institution).institution.name : item.name } 
                                    </TabsTrigger>
                                </div>
                            )
                        })
                    }
            </TabsList>
        </Tabs>
        </>
    )
}

export default CustomTabs