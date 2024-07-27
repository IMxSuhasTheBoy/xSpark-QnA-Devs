# xSpark-QnA-Devs is a platform for developers to learn, share​ ​their programming ​knowledge, publish queries and answers

## Features

- reputaion levels for users

## Built with the Node.js SDK for server and Web SDK for client provided by appwrite back-end APIs & tools for simpler development tasks arround REST APIs

- Node.js
- Next.js
- Appwrite
- TailwindCSS
- Typescript

## Started with configuring the application and for the client Web SDK intergration with appwrite [- Docs](https://appwrite.io/docs/references/cloud/client-web/account)

## For the server Node.Js SDK to intergrate with appwrite BAAS [- Docs](https://github.com/appwrite/sdk-for-node)

## For various data collections created files in models/server & storage bucket setup funtion file [- Docs](https://github.com/appwrite/sdk-for-node/tree/main/docs/examples)

## For seeding or using existing data collections created function in dbSetup file using databases class instance from appwrite

## Setup next/server middleware to handle initialing Functions of db & storage bucket [- Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)

## Integrating state management solution zustand store [- Docs](https://docs.pmnd.rs/zustand/guides/nextjs)

in useAuthStore custom hook from create function of Zustand for creating store for managing auth state, included session, jwt, user and hydrated state properties & several methods

## Integrating immer middleware lib to use immutable state updates in zustand store [- Docs](https://docs.pmnd.rs/zustand/integrations/immer-middleware)

## Integraing Persist middleware to store Zustand state in a storage localStorage, AsyncStorage [- Docs](https://docs.pmnd.rs/zustand/integrations/persisting-store-data#onrehydratestorage)

thus persisting its data, using an option of onRehydrateStorage, this allows to pass a linear method setHydrated that will be called when the storage is hydrated

## auth folder consisting two routes for login & register, handling by logic in layout file

## login page function process by handleSubmit function extracting & validating the form data, calling the login function from the authentication store, and updating the loading and error states accordingly

## register page function process by validating the form data, calling the createAccount function from the authentication store to create the user account, and then calling the login function to log the user in. It updates the loading and error states accordingly and renders the error message and form
