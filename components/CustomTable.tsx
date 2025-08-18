

function CustomTable({list}: any) {

    const header =  Object.keys(list[0]).map((item: any) => item);

    return (

        <div className="flex flex-col gap-1 rounded-xl bg-white bg-table-darkMode lg:bg-gray-950/5 p-1 inset-ring inset-ring-gray-950/5">
            <div className="not-prose overflow-auto rounded-lg bg-white bg-table-darkMode outline outline-white/5">
                <div className="my-8">
                    <table className="w-full table-auto border-collapse text-sm table_custom">
                        <thead>
                            <tr>
                                {
                                    header.map((item: any) => {
                                        return(
                                            <th key={item} className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-bold text-gray-800 blueText">
                                                { item }
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody className="bg-white bg-table-darkMode tableBody_custom">
                                {
                                    list.map((item: any, index: number) => {
                                        return(
                                            <tr key={index}>
                                                {
                                                    Object.entries(item).map(element => {
                                                        return (
                                                            <td key={element[0]} className="border-b border-gray-100 p-4 pl-8 font-medium txt-darkMode">
                                                                {
                                                                    typeof(element[1]) === "string"
                                                                    ?
                                                                        element[1]
                                                                    :
                                                                        // <span style={{color: element[1].color, fontWeight: "600"}}>
                                                                        //     { element[1].title }
                                                                        // </span>
                                                                        <></>
                                                                }
                                                            </td>
                                                        )
                                                    })
                                                }
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomTable