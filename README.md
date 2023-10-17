# BookBook Server

## A simple back office and Server API for Bookingdle.

&copy; Joshua Steele 2023 - MIT License

[API Documentation](https://bump.sh/joshocalico/doc/bookingdle)

Server for the event management assignment for 2023's iOS Enterprise Application Development.
Largely supposed to be an interim server I threw together before the official API is live.

### Running

I'm using Vercel (Hobby) Hosting, Postgres and Blob storage. This is appropriately quick and dirty.

1. Create a (NextJS) project against this repo in Vercel.
2. Override the build script to be `prisma generate && next build` to build the DB client.
3. Next you're going to need to go into Vercel's storage options and simply attach a Postgres and Blob storage.

Congratulations! You're set up.

### Caveat Emptor!

This is **not** official and I'm not going to provide support for it.

I _will_ however tell you how to find API endpoints you can use here.

Any API routes in the `app/api/bookingdle` directory are available to use by your iOS client.