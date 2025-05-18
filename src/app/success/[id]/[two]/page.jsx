'use client'
import { use } from "react";
import SuccessTitleSecsion from "@/components/pages/SuccessTitleSecsion";
import TicketConfirmation from "@/components/pages/BookSuccess";
import { useSearchParams } from "next/navigation";
import LoadingComponent from "@/components/layout/Loading";
import { useCheckStatusQuery, useCheckStatusRoundTripQuery } from "@/store/features/check-status";

export default function SuccessPage({ params }) {
  const unwrappedParams = use(params);
  const { id, two } = unwrappedParams;
  const searchParams = useSearchParams();
  const _paymenttokenid = searchParams.get('_paymenttokenid');


  const { data: book, isLoading: isLoading } = useCheckStatusRoundTripQuery({ tranId: _paymenttokenid, refCode: id, refCodeRoundTrip: two });

  if (isLoading) {
    return (<LoadingComponent />)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <SuccessTitleSecsion />
      <TicketConfirmation book={book?.data?.oneWay} />
      <TicketConfirmation book={book?.data?.roundTrip} />
    </div>
  );
}