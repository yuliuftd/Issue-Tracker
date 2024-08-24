import React from "react";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Metadata } from "next";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssueForm = () => {
  return <IssueForm />;
};

export default NewIssueForm;

export const metadata: Metadata = {
  title: "Issue Tracker - Create New Issue",
  description: "Creat a new issue",
};
