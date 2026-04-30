"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

interface PaginationControlsProps {
  meta: {
    limit: number;
    page: number;
    totalItems: number;
    totalPage: number;
  };
}

export default function PaginationControls({ meta }: PaginationControlsProps) {
  const {
    limit: pageSize,
    page: currentPage,
    totalItems,
    totalPage,
  } = meta;

  const searchParams = useSearchParams();
  const router = useRouter();



  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
  

    params.set("page", page.toString());
  


    router.push(`?${params.toString()}`);

    // router.push("/dashboard/create-blogs"); // Example

   
  };


  /**
   *  await getPost(); time: 3
   *  await getUser(); time: 4
   *  console.log(hello) 
   *  const post = getPost();
   *  const user = getUser();
   * 
   * [post, user] = await promise.all(post, user)  
   * 
   */

  //* Showing 1 to 10 of 21 -> page 1
  //* Showing 11 to 20 of 21 -> page 2

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-2 py-4 border-t mt-4">
      <div className="text-sm text-muted-foreground">
        Showing {start} to {end} of {totalItems} results
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPage}
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === totalPage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={() => navigateToPage(totalPage)}
          disabled={currentPage === totalPage}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
