
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const { flag } = require('country-emoji')
import { BadgePercent, ChartBar, ChevronDown, FilterX, LayoutTemplate, Tag } from 'lucide-react';
export default async function SupplierTable() {
    const url = `${process.env.baseUrl}/api/supplier`
    const data = await fetch(url, { cache: 'no-store' }).then((res) => res.json())

    return (
        <div className=" pl-64 pr-4 mt-4 pb-10">
            {/* Filters */}
            <div className="flex ml-2 items-center gap-4">
                <Button className="text-sm bg-blue-800 hover:bg-blue-700  text-white px-4 py-0 ">
                    <FilterX className="mr-2" size={15} />
                    All Filters
                </Button>
                <Button variant='outline' className="text-sm  text-black ">
                    <LayoutTemplate className="mr-2" size={15} />
                    Product Type
                    <ChevronDown className="ml-2" size={15} />
                </Button>
                <Button variant='outline' className="text-sm text-black ">
                    <ChartBar className="mr-2" size={15} />
                    Search Demand
                    <ChevronDown className="ml-2" size={15} />
                </Button>
                <Button variant='outline' className="text-sm  text-black ">
                    <Tag className="mr-2" size={15} />
                    MAP
                    <ChevronDown className="ml-2" size={15} />
                </Button>
                <Button variant='outline' className="text-sm  text-black ">
                    <BadgePercent className="mr-2" size={15} />
                    Margin
                    <ChevronDown className="ml-2" size={15} />
                </Button>
            </div>
            <table className=" divide-y divide-gray-200 mt-8  w-[80vw] ">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                            <input type="checkbox" />
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Title</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">DTC</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Type</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                            Price Range
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Demand</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Margin</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">MAP</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">Ships To</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                            <HeartIcon className="w-4 h-4 text-muted-foreground" />
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                    {data.map((item: any, index: any) => (
                        <tr key={index}  >
                            <td className="px-4 py-2 whitespace-nowrap">
                                <input type="checkbox" />
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <Link href={`suppliers/${item._id}`} className="flex items-center hover:opacity-70 transition">
                                    <GlobeIcon className="w-4 h-4 text-muted-foreground mr-2" />
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                        <div className="text-sm text-gray-500">{item.website}</div>
                                    </div>
                                </Link>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <Badge variant={item.tags.directToConsumerSales === true ? "default" : "secondary"}>{item.tags.directToConsumerSales == true ? 'Yes' : 'No'}</Badge>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <div className="flex items-center">
                                    <span>{item.tags.productTypesOffered[0]}</span>
                                    <Badge variant="secondary" className="ml-2">
                                        {'+' + item.tags.productTypesOffered.length}
                                    </Badge>
                                </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">{item.tags.averageMainProductPrice}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{'$' + item.range.min + ' - ' + '$' + item.range.max}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{item.tags.searchVolume}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{Math.floor(Math.random() * 100)}%</td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <Badge variant={item.tags.mapCompliance === true ? "default" : "secondary"}>{item.tags.mapCompliance == true ? 'Yes' : 'No'}</Badge>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <div className="flex space-x-2">
                                    {item.shipsTo.map((countryName: any, flagIndex: any) => (
                                        <span key={flagIndex}>{flag(countryName)}</span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                                <HeartIcon className="w-4 h-4 text-muted-foreground" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pt-8 flex items-center justify-between px-4 py-2 bg-neutral-50">
                <div className=" flex items-center space-x-3 text-sm ">
                    <p className="">Rows per page</p>
                    <Select>
                        <SelectTrigger aria-label="Rows per page">
                            <SelectValue placeholder="25" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="25">7</SelectItem>
                            <SelectItem value="50">25</SelectItem>
                            <SelectItem value="100">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center gap-3 text-sm ">
                    <div>Page 1 of 407</div>
                    <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                            <ChevronLeftIcon className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChevronLeftIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}


function ChevronRightIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}


function GlobeIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
        </svg>
    )
}


function HeartIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    )
}