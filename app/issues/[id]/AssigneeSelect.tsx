"use client";
import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/xapi/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60s
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label className="SelectLabel">Suggestions</Select.Label>
          {users?.map((x) => (
            <Select.Item key={x.id} value={x.name!}>
              {x.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
