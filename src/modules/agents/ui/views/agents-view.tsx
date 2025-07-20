"use client"
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const AgentsView = () => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

        return (
            <div>
                {JSON.stringify(data, null, 2)}
            </div>
        )
};

export const AgentsViewLoading =() => {
    return (
        <LoadingState title='Loading Agents for Evil' description='Take make Second my friend..don&apos;t panic!'/>

    );
};

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Failed to Load Agents"
            description="We couldn't load your agents. Please try refreshing the page or contact support if the problem persists."
        />    )
}