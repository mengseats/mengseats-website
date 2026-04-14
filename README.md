## Mengseats Website

This is a Next.js site for Mengseats with recipes, gallery content, and a Notion-backed content layer for `Recipes` and `Shortform`.

## Getting Started

Copy the example env file and fill in your Notion values:

```bash
cp .env.example .env.local
```

Required env vars:

```bash
NOTION_API_KEY=
NOTION_RECIPES_DATA_SOURCE_ID=
NOTION_SHORTFORM_DATA_SOURCE_ID=
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notion Setup

1. Create a Notion internal integration.
2. Copy the integration secret into `NOTION_API_KEY`.
3. Share your `Recipes` and `Shortform` data sources with the integration.
4. Copy each data source ID into the matching env var.

The app falls back to local placeholder content if Notion is not configured yet, so the site still renders before the integration is complete.

## Recommended Notion Properties

`Recipes`

- `Name`
- `Slug`
- `Thumbnail`
- `Video Link`
- `Time (minutes)`
- `Ingredients`
- `Directions`
- `Description`
- `Published`

`Shortform`

- `Project name`
- `Slug`
- `Status`
- `Type`
- `URL`
- `Description`
- `Hook`
- `Sponsorship`
- `Dates`
- `Published`

Shortform page body content can also be used for longer `Notes` and `Script` sections.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Notion API Documentation](https://developers.notion.com/reference/intro)

## Notes

- Recipe and shortform content is fetched server-side.
- Notion responses are revalidated for performance.
- Gallery content is still local and file-based.
