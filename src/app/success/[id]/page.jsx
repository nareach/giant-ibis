'use client'
import { use } from "react";
import SuccessTitleSecsion from "@/components/pages/SuccessTitleSecsion";
import TicketConfirmation from "@/components/pages/BookSuccess";
import { useSearchParams } from "next/navigation";
import LoadingComponent from "@/components/layout/Loading";
import { useCheckStatusQuery } from "@/store/features/check-status";

export default function SuccessPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const searchParams = useSearchParams();

  const _paymenttokenid = searchParams.get('_paymenttokenid');

  const { data: book, isLoading } = useCheckStatusQuery({ tranId: _paymenttokenid, refCode: id });

  if (isLoading) {
    return (<LoadingComponent />)
  }

  return (
    <>
      <SuccessTitleSecsion />
      <TicketConfirmation book={book?.data} />
    </>
  );
}