import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

async function getCatImages() {
  const catsDir = path.join(process.cwd(), 'public', 'cats');
  try {
    const files = await fs.promises.readdir(catsDir);
    return files
      .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
      .map((filename) => ({
        src: `/cats/${filename}`,
        // Width is fixed per column; height will be natural; we can supply sizes for responsive
      }));
  } catch (e) {
    return [];
  }
}

export const dynamic = 'force-dynamic';

async function getRedditTopCats(limit = 100) {
  // Use raw_json=1 to avoid HTML entities like &amp;
  const url = `https://www.reddit.com/r/cats/top.json?limit=${limit}&t=day&raw_json=1`;
  try {
    const res = await fetch(url, { cache: 'no-store', next: { revalidate: 0 }, headers: { 'User-Agent': 'lf32.dev cats gallery' } });
    if (!res.ok) return [];
    const ct = res.headers.get('content-type') || '';
    if (!ct.includes('application/json')) return [];
    const json = await res.json();
    const posts = (json?.data?.children ?? []).map((c) => c.data);
    const candidates = [];
    for (const p of posts) {
      if (p.is_video) continue;
      // Handle gallery posts by taking the first image
      if (p.is_gallery && p.media_metadata) {
        const firstKey = Object.keys(p.media_metadata)[0];
        const meta = p.media_metadata[firstKey];
        if (meta && (meta.m?.startsWith('image/') || meta.e === 'Image')) {
          const s = meta.s || meta.p?.[meta.p.length - 1];
          const u = (s?.u || '').replaceAll('&amp;', '&');
          if (u.startsWith('https://')) candidates.push({ src: u });
        }
        continue;
      }
      const preview = p.preview?.images?.[0];
      const raw = (preview?.source?.url || p.url_overridden_by_dest || p.url || '').trim();
      if (!raw) continue;
      const urlStr = raw.replaceAll('&amp;', '&');
      const isHttps = urlStr.startsWith('https://');
      const isRedditImage = urlStr.startsWith('https://i.redd.it') || urlStr.startsWith('https://preview.redd.it');
      const hasImageExt = /\.(png|jpe?g|webp|gif)(?:\?|$)/i.test(urlStr);
      const ok = isHttps && (isRedditImage || hasImageExt || p.post_hint === 'image');
      if (ok) candidates.push({ src: urlStr });
    }
    const seen = new Set();
    const unique = [];
    for (const img of candidates) {
      if (!seen.has(img.src)) { seen.add(img.src); unique.push(img); }
    }
    return unique;
  } catch {
    // Network or parsing error – fail gracefully for prerender
    return [];
  }
}

export default async function CatsPage() {
  let images = await getCatImages();
  if (images.length === 0) {
    images = await getRedditTopCats(100);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-4 font-playfair">
          ✨{' '}
          <Link href="/" className="hover:text-gray-700 transition-colors duration-200">
            LF32
          </Link>{' '}
          Cat Gallery ✨
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A curated collection of adorable cats from r/cats
        </p>
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>
      {images.length === 0 ? (
        <p className="text-gray-500">No images found.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 [column-fill:balance]">
          {images.map((img) => (
            <div key={img.src} className="mb-6 break-inside-avoid overflow-hidden border border-gray-100 bg-white">
              <Image
                src={img.src}
                alt="Cat photo"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="w-full h-auto object-cover"
                priority={false}
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}


