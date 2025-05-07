'use client'
import { use } from "react";
import SuccessTitleSecsion from "@/components/pages/SuccessTitleSecsion";
import TicketConfirmation from "@/components/pages/BookSuccess";
import { useSearchParams } from "next/navigation";
import LoadingComponent from "@/components/layout/Loading";
import { useCheckStatusQuery } from "@/store/features/check-status";

export default function SuccessPage({ params }) {
  const unwrappedParams = use(params);
  const { id, two } = unwrappedParams;
  const searchParams = useSearchParams();
  const _paymenttokenid = searchParams.get('_paymenttokenid');

  const { data: book1, isLoading: isLoading1 } = useCheckStatusQuery({ tranId: _paymenttokenid, refCode: id });
  const { data: book2, isLoading: isLoading2 } = useCheckStatusQuery({ tranId: _paymenttokenid, refCode: two });

  if (isLoading1 || isLoading2) {
    return (<LoadingComponent />)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <SuccessTitleSecsion />
      <TicketConfirmation book={book1?.data} />
      <TicketConfirmation book={book2?.data} />
    </div>
  );
}