import RSS from 'rss';
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async(event) => {
  const feed = new RSS({
    title: 'Timothy Marias',
    site_url: 'https://timothymarias.live',
    feed_url: `https://timothymarias.live/rss.xml`,
  })

  const docs = await serverQueryContent(event).sort({ date: -1 }).where({ _partial: false }).find()
  const blogPosts = docs.filter((doc) => doc?._path?.includes('/blog'))
  for (const doc of blogPosts) {
    feed.item({
      title: doc.title ?? '-',
      url: `https://timothymarias.live${doc._path}`,
      date: doc.date,
      description: doc.description,
    })
  }
  const feedString = feed.xml({ indent: true })
  event.res.setHeader('content-type', 'text/xml');
  event.res.end(feedString);
})
