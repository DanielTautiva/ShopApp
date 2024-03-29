# Payment Gateway [W]
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description
This project implements the [W] API as a payment gateway. It is developed within the ReactJS framework (Next.js 14) with a connection to a NoSQL database (MongoDB). The connection is established through MongoDB Atlas for a simpler project installation. Below are the detailed steps:

## System Requirements
- Node.js 20.10.0
- Next.js 14.0.4

<p align="center">
  <a href="https://nextjs.org/" target="blank"><img src="https://i.pinimg.com/736x/4a/2b/e7/4a2be73b1e2efb44355436c40bf496dd.jpg" width="200" alt="Next Logo" /></a>
</p>

## Installation

```bash
$ npm install
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Running
```bash
npm run dev
# or
$ yarn dev
# or
$ npm run dev
```

## Important Note
For this project, I used the [W] API developed in NestJS. However, since I utilized the free instance of Amazon Web Services and do not own a domain, I don't have an SSL certificate [https] for the billing [endpoint]. The alternative is to disable the [Insecure content] ALLOW in the browser settings while conducting the test.

## Deploy on Vercel
The [W] app has been deployed using Vercel services.
Link to access: https://frontend-7kqp4ate7-danieltautivas-projects.vercel.app/
