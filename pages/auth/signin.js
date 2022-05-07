import React from "react";
import {
  getProviders,
  signIn as signIntoProvider,
  useSession,
} from "next-auth/react";
import Header from "../../components/Header";

function signIn({ providers }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <Header />
      <div className="flex items-center flex-col justify-center h-screen">
        <img
          src="https://links.papareact.com/ocw"
          className="h-24 w-40 object-contain"
          alt=""
        />
        <p className="mb-8 text-sm">
          This is no a Real Instagram. This is just a demo for Next.js and
          Next-Auth.
        </p>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIntoProvider(provider.id, { callbackUrl: "/" })
              }
              className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
            >
              <div className="relative flex items-center space-x-4 justify-center">
                <img
                  src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
                  className="left-0 w-5"
                  alt="google logo"
                />
                <span className="block ml-4 w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                  Continue with {provider.name}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

// server side
export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

export default signIn;
