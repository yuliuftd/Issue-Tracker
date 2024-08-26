import prisma from "@/prisma/prisma";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
    color: string;
  }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
      color: "#FEEBEC",
    },
    {
      label: "In Progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
      color: "#F4F0FE",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
      color: "#E6F6EB",
    },
  ];

  return (
    <Flex gap={"5"}>
      {containers.map((x) => (
        <Card key={x.label} style={{ backgroundColor: x.color }}>
          <Flex direction={"column"} align={"center"} gap={"1"}>
            <Link href={`/issues/list?status=${x.status}`}>{x.label}</Link>
            <Text size={"5"} weight={"bold"}>
              {x.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
