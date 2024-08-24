import prisma from "@/prisma/prisma";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import React from "react";
import { IssueStatusBadge } from "./components";
import Link from "next/link";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading mb="4" size="4" mx="3">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((x) => (
            <Table.Row key={x.id}>
              <Table.Cell>
                <Flex justify={"between"}>
                  <Flex direction="column" gap={"2"}>
                    <Link href={`/issues/${x.id}`}>{x.title}</Link>
                    <IssueStatusBadge status={x.status} />
                  </Flex>
                  {x.assignedToUser && (
                    <Avatar
                      src={x.assignedToUser.image!}
                      fallback="?"
                      size={"2"}
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
