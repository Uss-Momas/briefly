import { TableDemo } from "@/components/Table/Table";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ShortLink(params) {
    return (
        <div className='flex flex-col h-screen'>
            <Header />
            <main className="m-auto">
                <div className="flex w-auto bg-white p-6">
                    <div></div>
                    <div className="border rounded-lg">
                        {/* <table className="border w-full divide-y divide-gray-500">
                            <thead>
                                <tr>
                                    <th>Original url</th>
                                    <th>Short url</th>
                                    <th>Clicks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>https://google.com?q=como-ser-rico</td>
                                    <td>https://briefly.com/sqar21</td>
                                    <td>100</td>
                                    <td>
                                        <span>copy</span>
                                        <span>delete</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table> */}
                        <Table>
                            <TableHeader>
                                <TableHead>Original url</TableHead>
                                <TableHead>Short url</TableHead>
                                <TableHead>Clicks</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableHeader>
                            <TableBody>
                                {Array.from({ length: 10 }).map((_, i) => {
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>https://google.com?q=como-ser-rico</TableCell>
                                            <TableCell>https://briefly.com/sqar21</TableCell>
                                            <TableCell>100</TableCell>
                                            <TableCell>
                                                <span>copy</span>
                                                <span>delete</span>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}