import Accordion from "@/components/shared/Accordion";
import React from "react";
import { getGroupedSubscriptions } from "../../actions/subscriptions.action";
import { formatDate } from "@/lib/utils";

type Props = {};

const renderChildren = ({ detail }: { detail: any }) => {
  return (
    <ul className="flex justify-between flex-wrap flex-row gap-2">
      <li className="text-sm">Subscription : {detail?.subscriptionName}</li>
      <li className="text-sm">Offer Amount : {detail?.subscriptionAmount} </li>
      <li className="text-sm">
        Subscription Date : - {formatDate(detail?.subscriptionDate)}
      </li>
      <li className="text-sm">
        Expiry Date : - {formatDate(detail?.expiryDate)}
      </li>
    </ul>
  );
};

const Subscription = async (props: Props) => {
  const { subscriptions } = await getGroupedSubscriptions();

  const formattedSubscriptions = subscriptions.map((subscription: any) => ({
    id: subscription._id,
    title: subscription.packageDetails?.packageName,
    description: subscription.memberDetails,
    children: subscription.members.map((member: any) => ({
      id: member.memberDetails._id,
      title:
        member.memberDetails.name.charAt(0).toUpperCase() +
        member.memberDetails.name.slice(1),
      description: member.memberDetails.email,
      children: member.subscriptions.map((subs: any) => {
        return {
          id: subs._id,
          title:
            formatDate(subs.subscriptionDate) +
            "  to  " +
            formatDate(subs.expiryDate),
          description: subs.offerAmount,
          component: renderChildren({
            detail: {
              ...subs,
              subscriptionName: subscription.packageDetails?.packageName,
            },
          }),
        };
      }),
    })),
  }));

  return <Accordion data={formattedSubscriptions} />;
};

export default Subscription;
