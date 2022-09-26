import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import { ethers } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import connectContract from "../../utils/connectContract";
import formatTimestamp from "../../utils/formatTimestamp";
import Alert from "../../components/Alert";
import {
  EmojiHappyIcon,
  TicketIcon,
  UsersIcon,
  LinkIcon,
} from "@heroicons/react/outline";

function Event({ event }) {
  const { data: account } = useAccount();

  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(null);
  const [currentTimestamp, setEventTimestamp] = useState(new Date().getTime());

  function checkIfAlreadyRSVPed() {
    if (account) {
      for (let i = 0; i < event.rsvps.length; i++) {
        const thisAccount = account.address.toLowerCase();
        if (event.rsvps[i].attendee.id.toLowerCase() == thisAccount) {
          return true;
        }
      }
    }
    return false;
  }

  const newRSVP = async () => {
    try {
      const rsvpContract = connectContract();

      if (rsvpContract) {
        const txn = await rsvpContract.createNewRSVP(event.id, {
          value: event.deposit,
          gasLimit: 300000,
        });
        setLoading(true);
        console.log("Minting...", txn.hash);

        await txn.wait();
        console.log("Minted -- ", txn.hash);
        setSuccess(true);
        setLoading(false);
        setMessage("Your RSVP has been created successfully.");
      } else {
        console.log("Error getting contract.");
      }
    } catch (error) {
      setSuccess(false);
      setMessage("Error!");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Head>
        <title>{event.name} | web3rsvp</title>
        <meta name="description" content={event.name} />
        <link rel="icon" href="/favicon.ico" />
        <script>
          if (
            localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
          ) {
            document.documentElement.classList.add('dark');
          }  else {
            document.documentElement.classList.remove('dark');
          }
        </script>
      </Head>
      <section className="relative py-12">
        {loading && (
          <Alert
            alertType={"loading"}
            alertBody={"Please wait"}
            triggerAlert={true}
            color={"white"}
          />
        )}
        {success && (
          <Alert
            alertType={"success"}
            alertBody={message}
            triggerAlert={true}
            color={"palegreen"}
          />
        )}
        {success === false && (
          <Alert
            alertType={"failed"}
            alertBody={message}
            triggerAlert={true}
            color={"palevioletred"}
          />
        )}
        <h6 className="mb-2">{formatTimestamp(event.eventTimestamp)}</h6>
        <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl mb-6 lg:mb-12">
          {event.name}
        </h1>
        <div className="flex flex-wrap-reverse lg:flex-nowrap">
          <div className="w-full pr-0 lg:pr-24 xl:pr-32">
            <div className="mb-8 w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
              {event.imageURL && (
                <Image src={event.imageURL} alt="event image" layout="fill" />
              )}
            </div>
            <p>{event.description}</p>
          </div>
          <div className="max-w-xs w-full flex flex-col gap-4 mb-6 lg:mb-0">
            {event.eventTimestamp > currentTimestamp ? (
              account ? (
                checkIfAlreadyRSVPed() ? (
                  <>
                    <span className="w-full text-center px-6 py-3 text-base font-medium rounded-full text-teal-800 bg-teal-100">
                      You have RSVPed! 🙌
                    </span>
                    <div className="flex item-center">
                      <LinkIcon className="w-6 mr-2 text-indigo-800" />
                      <a
                        className="text-indigo-800 truncate hover:underline"
                        href={event.link}
                      >
                        {event.link}
                      </a>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    className="w-full items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={newRSVP}
                  >
                    RSVP for {ethers.utils.formatEther(event.deposit)} MATIC
                  </button>
                )
                ) : (
                  <button
  id="theme-toggle"
  type="button"
  class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
>
  <svg
    id="theme-toggle-dark-icon"
    class="w-5 h-5 hidden"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
    ></path>
  </svg>
  <svg
    id="theme-toggle-light-icon"
    class="w-5 h-5 hidden"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      fill-rule="evenodd"
      clip-rule="evenodd"
    ></path>
  </svg>
</button>
                )
              ) : (
                <ConnectButton />
              )
            ) : (
              <span className="w-full text-center px-6 py-3 text-base font-medium rounded-full border-2 border-gray-200">
                Event has ended
              </span>
            )}
            <div className="flex item-center">
              <UsersIcon className="w-6 mr-2" />
              <span className="truncate">
                {event.totalRSVPs}/{event.maxCapacity} attending
              </span>
            </div>
            <div className="flex item-center">
              <TicketIcon className="w-6 mr-2" />
              <span className="truncate">1 RSVP per wallet</span>
            </div>
            <div className="flex items-center">
              <EmojiHappyIcon className="w-10 mr-2" />
              <span className="truncate">
                Hosted by{" "}
                <a
                  className="text-indigo-800 truncate hover:underline"
                  href={`${process.env.NEXT_PUBLIC_TESTNET_EXPLORER_URL}address/${event.eventOwner}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {event.eventOwner}
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Event;

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(id);

  const { data } = await client.query({
    query: gql`
      query Event($id: String!) {
        event(id: $id) {
          id
          eventID
          name
          description
          link
          eventOwner
          eventTimestamp
          maxCapacity
          deposit
          totalRSVPs
          totalConfirmedAttendees
          imageURL
          rsvps {
            id
            attendee {
              id
            }
          }
        }
      }
    `,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      event: data.event,
    },
  };
}

export const config = {
  unstable_excludeFiles: ["public/**/*"],
};
