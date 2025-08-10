

function CustomTable({list}: array) {

    const header =  Object.keys(list[0]).map(item => item);

    return (

        <div className="flex flex-col gap-1 rounded-xl bg-gray-950/5 p-1 inset-ring inset-ring-gray-950/5 dark:bg-white/10 dark:inset-ring-white/10">
            <div className="not-prose overflow-auto rounded-lg bg-white outline outline-white/5 dark:bg-gray-950/50">
                <div className="my-8">
                    <table className="w-full table-auto border-collapse text-sm">
                        <thead>
                            <tr>
                                {
                                    header.map(item => {
                                        return(
                                            <th key={item} className="border-b border-gray-200 p-4 pt-0 pb-3 pl-8 text-left font-medium text-gray-400 dark:border-gray-600 dark:text-gray-200">
                                                { item.toUpperCase() }
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800">
                                {
                                    list.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                {
                                                    Object.entries(item).map(element => {
                                                        return (
                                                            <td key={element[0]} className="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">
                                                                { element[1] }
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