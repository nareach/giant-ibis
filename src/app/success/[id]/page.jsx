'use client'
import { use, useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import SuccessTitleSecsion from "@/components/pages/SuccessTitleSecsion";
import TicketConfirmation from "@/components/pages/BookSuccess";
import { fetchFromApi } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import LoadingComponent from "@/components/layout/Loading";
import axios from "axios";
import { ACLEDA_BANK_API, ACLEDA_BANK_API_CHECK_STATUS, loginId, merchantID, merchantName, password, signature } from "@/constant/constant";
import { useCheckStatusQuery } from "@/store/features/check-status";

export default function SuccessPage({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  const searchParams = useSearchParams();

  const _paymenttokenid = searchParams.get('_paymenttokenid');

  const { data: book, isLoading } = useCheckStatusQuery({ tranId: _paymenttokenid, refCode: id });

  console.log(book);


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