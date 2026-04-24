import { Article, Author, Tag } from "@/types";

export const authors: Author[] = [
  {
    id: "1",
    name: "Mara Holloway",
    avatar: "https://i.pravatar.cc/150?img=47",
    bio: "Engineering lead at Vercel. Writes about distributed systems, developer experience, and the philosophy of software.",
    followers: 12400,
    following: 230,
    articles: 34,
  },
  {
    id: "2",
    name: "Jin Nakamura",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Designer turned engineer. Obsessed with the intersection of aesthetics and code.",
    followers: 8900,
    following: 180,
    articles: 21,
  },
  {
    id: "3",
    name: "Sofía Reyes",
    avatar: "https://i.pravatar.cc/150?img=23",
    bio: "ML researcher at DeepMind. Writing about AI safety, interpretability, and what it means to build responsibly.",
    followers: 31200,
    following: 95,
    articles: 18,
  },
  {
    id: "4",
    name: "Elliot Voss",
    avatar: "https://i.pravatar.cc/150?img=60",
    bio: "Indie hacker. Built 12 products, 3 of them survived. Essays on product thinking and small-scale software businesses.",
    followers: 5600,
    following: 410,
    articles: 47,
  },
];

export const tags: Tag[] = [
  { id: "1", name: "Programming", slug: "programming", count: 8204, description: "Thoughts, tutorials, and opinions on software engineering." },
  { id: "2", name: "Design", slug: "design", count: 4102, description: "Visual design, UX, and the craft of building beautiful things." },
  { id: "3", name: "AI", slug: "ai", count: 15820, description: "Artificial intelligence, machine learning, and the future of intelligence." },
  { id: "4", name: "Startup", slug: "startup", count: 9341, description: "Building companies, products, and surviving the journey." },
  { id: "5", name: "Philosophy", slug: "philosophy", count: 2210, description: "Ideas about ideas. The examined life, technology, and meaning." },
  { id: "6", name: "Writing", slug: "writing", count: 3305, description: "The craft, discipline, and joy of putting words together." },
];

export const articles: Article[] = [
  {
    id: "1",
    slug: "the-quiet-art-of-doing-less-in-software",
    title: "The Quiet Art of Doing Less in Software",
    subtitle: "Every line of code is a liability. The best engineers I know write less, delete more, and ship faster because of it.",
    content: `
      <p>There's a particular kind of engineer I've come to respect above all others. They don't have the most commits. They're not always in the meeting. But when they touch a codebase, it gets smaller — and somehow better.</p>

      <p>We celebrate addition in software. New features, new frameworks, new abstractions. We write blog posts about building. We rarely write about removing.</p>

      <h2>The cost of code</h2>

      <p>Every line of code you write is a line someone has to read, understand, debug, and eventually delete. The most underrated engineering skill is knowing what <em>not</em> to build.</p>

      <p>I learned this working on a payments infrastructure team at a Series B startup. We had 14 microservices handling what could be done with 3. Each had its own deploy pipeline, its own on-call rotation, its own subtle bugs. The system worked. But it was crushing us.</p>

      <p>Over six months, we deleted four of them. Merged two others. Combined three into one sensible monolith. The system got faster, the on-call load dropped by 60%, and new engineers could understand the whole thing in a week instead of a quarter.</p>

      <h2>Simplicity is a design decision</h2>

      <p>The problem is that simplicity doesn't feel like progress. Deleting code doesn't look like work on a sprint board. Saying "we shouldn't build this" in a planning meeting is uncomfortable. The incentives are all wrong.</p>

      <p>But software has mass. Complexity accumulates. And unlike physical mass, it compounds — complexity generates more complexity, bugs hide in the gaps between systems, and every new hire has to carry the cognitive weight of everything that came before them.</p>

      <blockquote>The question isn't "can we build this?" It's "should we, and if so, what's the simplest version that actually solves the problem?"</blockquote>

      <h2>Practical habits</h2>

      <p>A few things that have helped me build a bias toward less:</p>

      <p><strong>Delete first, add later.</strong> Before writing a new function, look for an existing one that does almost the same thing. Can you generalize what's already there instead of adding something new?</p>

      <p><strong>Question the requirement.</strong> Not to be difficult — but requirements often arrive over-specified. The actual need is often simpler than what was asked for. Get comfortable asking "why" until you hit bedrock.</p>

      <p><strong>Treat dead code like dead weight.</strong> If a feature flag has been "on" for six months, remove the branch. If a module hasn't been touched in two years, it's either perfect or forgotten — find out which.</p>

      <p>The engineers I admire most are ruthless about this. They treat the codebase like a garden, not a landfill. They pull things out. They prune. They make space.</p>

      <p>That's the quiet art. Nobody writes the blog post about the code they didn't write. But I'd argue it's the most valuable work you can do.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    author: authors[0],
    tags: ["Programming", "Philosophy"],
    publishedAt: "2025-01-15T10:00:00Z",
    readingTime: "5 min read",
    claps: 2340,
    comments: 47,
    featured: true,
  },
  {
    id: "2",
    slug: "typography-is-not-decoration",
    title: "Typography Is Not Decoration",
    subtitle: "Type choices are the first signal of a designer's taste — and most products are sending the wrong message.",
    content: `
      <p>The first thing I do when I look at a new product is read it before I use it. Not the copy — the type. The typeface, the size, the leading, the measure. It tells me everything about how the team thinks about craft.</p>

      <p>Most products don't pass this test.</p>

      <h2>Inter is a crutch</h2>

      <p>I want to be careful here. Inter is a genuinely excellent typeface. Rasmus Andersson did remarkable work. The problem isn't Inter — it's that everyone uses Inter for everything, including contexts where Inter is wrong.</p>

      <p>A UI font designed for interface clarity at small sizes is not the right tool for a long-form reading experience. It's not the right tool for a luxury brand. It's probably not the right tool for your startup's marketing site, even if it's perfectly fine for your dashboard.</p>

      <p>Type choice is a statement about who you're for and what you're about. When everything uses the same typeface, nothing is saying anything.</p>

      <h2>What type actually does</h2>

      <p>Typography is architecture for text. It creates hierarchy, guides attention, controls pace. A well-set page tells the reader where to start, where to go next, and when to slow down — all without a single explicit instruction.</p>

      <p>Bad typography inverts this. It makes the reader work. They have to figure out where they are in the hierarchy. Line lengths that are too long tire the eye. Too-tight leading makes the page feel airless. Too-loose leading loses cohesion.</p>

      <blockquote>The best typography is invisible. You don't notice it. You just read, effortlessly, and come away thinking the writing was better than it was.</blockquote>

      <h2>Starting to care</h2>

      <p>If you want to get better at this, the first step is developing taste. Read a lot. Notice what you're reading on. Ask why certain publications feel good to read and others feel like work.</p>

      <p>Then start making choices deliberately. Try a serif for body text. Try pairing a geometric sans with a humanist. Try setting your measure at 65–75 characters and see if reading gets easier. Try 1.6 line-height and see if the page breathes.</p>

      <p>You don't have to go deep on typography history (though it's fascinating). You just have to start caring enough to make choices rather than defaults.</p>

      <p>The products that stay with me are almost always the ones where someone cared about the type.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=1200&q=80",
    author: authors[1],
    tags: ["Design", "Writing"],
    publishedAt: "2025-01-10T08:30:00Z",
    readingTime: "4 min read",
    claps: 1876,
    comments: 89,
    featured: true,
  },
  {
    id: "3",
    slug: "what-we-get-wrong-about-ai-safety",
    title: "What We Get Wrong About AI Safety",
    subtitle: "The public conversation conflates two very different problems. The confusion is costing us time we don't have.",
    content: `
      <p>When people argue about AI safety, they're often arguing about different things. And because they're using the same words, they talk past each other for hours without realizing it.</p>

      <p>The conflation has real costs. It muddies policy debates. It lets people dismiss legitimate concerns by pointing at obviously wrong concerns. It makes it harder to allocate research resources sensibly.</p>

      <h2>Two problems, one label</h2>

      <p><strong>Near-term safety</strong> is about the AI systems we have now and will have in the next few years. Bias in hiring algorithms. Surveillance systems with high false-positive rates. LLMs generating medical misinformation. These are real, present harms affecting real people today.</p>

      <p><strong>Long-term safety</strong> is about the trajectory of AI development as systems become substantially more capable. Alignment — ensuring AI systems do what we actually want as their capabilities scale. Power concentration. Loss of meaningful human oversight.</p>

      <p>Both matter. But they require different expertise, different methods, and different policy responses. Treating them as the same problem makes it harder to make progress on either.</p>

      <h2>The dismissal loop</h2>

      <p>Here's a failure mode I've watched play out many times:</p>

      <p>Someone raises concerns about long-term AI risks. A critic responds by pointing to more immediate harms — the bias problem, the misinformation problem, the exploitation of data labelers. The first person is characterized as distracted by science fiction while real people are being harmed today.</p>

      <p>This is a genuine argument. Near-term harms are real and under-addressed. But it's also a non-sequitur. The existence of near-term problems doesn't tell us whether long-term problems are real or important. We can — we must — work on both.</p>

      <blockquote>The question of whether a technology is risky now and the question of whether it could be dangerous later are separate questions. Answering one doesn't answer the other.</blockquote>

      <h2>What careful thinking looks like</h2>

      <p>The researchers I most respect in this space are precise about what they're worried about and why. They acknowledge uncertainty. They update on evidence. They distinguish between what we know and what we're uncertain about.</p>

      <p>They're also typically working on both. The interpretability work that might help us understand current model failures is the same interpretability work that might matter for much more capable future systems. The alignment techniques being developed now will need to be substantially better by the time they really matter.</p>

      <p>The path forward is clarity, not a choice of sides. Both problems are real. Both require serious work. And the conversation will be more productive when we're precise about which one we're having.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
    author: authors[2],
    tags: ["AI", "Philosophy"],
    publishedAt: "2025-01-08T14:00:00Z",
    readingTime: "6 min read",
    claps: 4210,
    comments: 203,
    featured: false,
  },
  {
    id: "4",
    slug: "the-unsexy-work-that-makes-startups-succeed",
    title: "The Unsexy Work That Makes Startups Succeed",
    subtitle: "Founders love to talk about the vision. Nobody wants to talk about the spreadsheets, the repetitive calls, the unglamorous plumbing that actually works.",
    content: `
      <p>I've built twelve products. Three of them are still alive. I've been thinking about what separated the survivors from the dead, and the answer is boring: the survivors did boring things consistently.</p>

      <p>This is hard to write about. Nobody wants to read it. The exciting version — the pivot story, the viral launch, the genius insight — is much better content. But it's also why most startup advice is useless.</p>

      <h2>What actually works</h2>

      <p><strong>Talking to customers, constantly.</strong> Not a one-time discovery phase. Not a quarterly review. An ongoing practice of being in direct contact with the people you're building for, every single week. Most founders stop doing this when they get "enough" data. The ones who succeed never stop.</p>

      <p><strong>Measuring what matters and only that.</strong> I've worked with founders who had dashboards with 40 metrics. They watched all of them and understood none. The discipline of identifying the one or two numbers that actually tell you whether your business is working — and ruthlessly ignoring everything else — is rare and valuable.</p>

      <p><strong>Doing things that don't scale.</strong> This one gets said a lot. It gets followed a lot less. Manually onboarding your first 50 customers, writing personalized emails, doing the thing that's obviously not the long-term solution — this is where you learn what the long-term solution should be.</p>

      <h2>The romance problem</h2>

      <p>The startup ecosystem rewards stories over systems. We celebrate founders who had a vision and pursued it against all odds. We don't celebrate founders who built a really solid customer feedback loop and executed on it for three years.</p>

      <p>But the second kind of founder wins more often.</p>

      <blockquote>The vision gets you started. The systems keep you going. Most failures happen in the gap between the two.</blockquote>

      <h2>Earning the right to be interesting</h2>

      <p>The businesses I've seen succeed were boring first. They built something that worked, repeatedly, for a specific group of people. They got the processes right. They understood their numbers.</p>

      <p>Then — only then — did they have the leverage to do something interesting. The exciting pivot, the bold bet, the swing for a bigger market. All of those things are only possible because the boring foundation was solid.</p>

      <p>Build boring first. Earn the right to be interesting later.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1664575599730-0814817939de?w=1200&q=80",
    author: authors[3],
    tags: ["Startup"],
    publishedAt: "2025-01-05T09:00:00Z",
    readingTime: "5 min read",
    claps: 3102,
    comments: 128,
    featured: false,
  },
  {
    id: "5",
    slug: "context-is-the-invisible-architecture",
    title: "Context Is the Invisible Architecture",
    subtitle: "The best interfaces don't ask users to remember things. They remember things for them.",
    content: `
      <p>There's a category of interface failure that rarely gets named, but you've experienced it hundreds of times. You're three steps into a process and you have to go back to step one to find a piece of information you needed for step three. You finish a task and immediately can't remember what you just did. You return to an app after two weeks and have no idea where you left off.</p>

      <p>These aren't just friction points. They're failures of contextual architecture.</p>

      <h2>What context means in interface design</h2>

      <p>Context is everything the user needs to know to make a good decision at any given moment. It's the history of what they've done, the state of the system, the options available, the implications of each option.</p>

      <p>Most interfaces treat context as the user's problem. We show states, not histories. We display current values, not how they changed. We present options without helping users understand the tradeoffs.</p>

      <p>The best interfaces invert this. They surface context proactively, at the moment it's needed, in the form most useful for the decision at hand.</p>

      <h2>Concrete patterns</h2>

      <p><strong>Progressive disclosure with history.</strong> Don't just show the current state — show how you got there. Breadcrumbs. Revision history. "You changed this yesterday" annotations. The history of decisions is often more useful than the current state alone.</p>

      <p><strong>Anticipate the next question.</strong> After a user completes an action, what are they likely to want to do next? Surface it. After someone publishes an article, they probably want to share it. After someone adds a team member, they probably want to set permissions.</p>

      <p><strong>Make the invisible visible.</strong> Background processes, pending changes, asynchronous operations — these all have state that users need to know about at certain moments. Surface them when they're relevant, not buried in a notification drawer.</p>

      <blockquote>Every time a user has to remember something, your interface has failed them. Memory is cognitive overhead. The best interfaces reduce it to zero.</blockquote>

      <h2>The cost of getting this wrong</h2>

      <p>Context failures are particularly insidious because users rarely complain about them directly. They just feel vaguely confused, or frustrated, or like the app "doesn't quite work." They churn without being able to articulate why.</p>

      <p>Getting it right is also hard to spec. "Show relevant context" is not a user story. It requires understanding how users think, what they're trying to accomplish, and what information they need at each stage of a workflow.</p>

      <p>That's design work. It doesn't fit neatly into a sprint. But it's what separates tools people use from tools people love.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=1200&q=80",
    author: authors[1],
    tags: ["Design", "Programming"],
    publishedAt: "2025-01-02T11:00:00Z",
    readingTime: "4 min read",
    claps: 1540,
    comments: 62,
    featured: false,
  },
  {
    id: "6",
    slug: "notes-on-writing-clearly",
    title: "Notes on Writing Clearly",
    subtitle: "Writing is thinking made visible. Most writing is opaque because most thinking is.",
    content: `
      <p>I've edited a lot of writing over the years — blog posts, documentation, internal memos, investor updates. The same problems appear with remarkable consistency, regardless of the writer's intelligence or subject matter expertise.</p>

      <p>None of these are about grammar or style. They're about thinking.</p>

      <h2>The buried thesis</h2>

      <p>Most pieces I read bury the main point somewhere in the middle, or at the end, or — worst of all — never state it explicitly at all. The writer knows what they're arguing. They assume the reader will figure it out.</p>

      <p>The reader won't figure it out, or they'll figure out the wrong thing, or they'll stop reading before they get there.</p>

      <p>State your thesis at the top. Not "in this essay I will argue" — that construction is weak — but the actual claim, stated directly and specifically. If you can't state it in one or two sentences, you don't know what you're arguing yet.</p>

      <h2>Vague nouns</h2>

      <p>Systems. Solutions. Initiatives. Learnings. Stakeholders. These words do a lot of heavy lifting in corporate writing, and most of what they do is obscure meaning.</p>

      <p>Replace every vague noun with the specific thing you mean. "Systems" → what systems, exactly? "Learnings" → what did you learn, stated directly? "Stakeholders" → which people, in which roles?</p>

      <p>This is uncomfortable because vague nouns let you avoid commitment. Replacing them forces you to say something specific, which can be wrong. But specific wrongness is more useful than vague correctness.</p>

      <blockquote>If your writing could mean anything, it means nothing. Specificity is the price of clarity.</blockquote>

      <h2>The passive voice problem</h2>

      <p>The passive voice isn't always wrong, but it's almost always a symptom. When writers use "mistakes were made" instead of "I made a mistake," they're usually avoiding something.</p>

      <p>The passive voice removes the actor. Often that's the most important part of the sentence. Who decided this? Who did that? Put them back in. Your writing will be clearer and your thinking will be more honest.</p>

      <h2>One more thing</h2>

      <p>The single most useful thing I've found: read your writing out loud before you publish it. You'll immediately hear the sentences that are too long, the phrases that don't land, the logic that skips steps.</p>

      <p>Writing that sounds natural when spoken usually reads well. Writing that sounds stilted when spoken almost always reads badly, even if the grammar is correct.</p>

      <p>Say it out loud. Fix what sounds wrong. Ship it.</p>
    `,
    coverImage: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
    author: authors[0],
    tags: ["Writing"],
    publishedAt: "2024-12-28T07:00:00Z",
    readingTime: "4 min read",
    claps: 2890,
    comments: 74,
    featured: false,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByTag(tag: string): Article[] {
  return articles.filter((a) =>
    a.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured);
}

export function getRecentArticles(limit = 10): Article[] {
  return [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getTagBySlug(slug: string): Tag | undefined {
  return tags.find((t) => t.slug === slug);
}

export function searchArticles(query: string): Article[] {
  const q = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.subtitle.toLowerCase().includes(q) ||
      a.content.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getAuthorById(id: string) {
  return authors.find((a) => a.id === id);
}

export function getArticlesByAuthor(authorId: string): Article[] {
  return articles.filter((a) => a.author.id === authorId);
}

export function getAllTags(): Tag[] {
  return tags;
}

export function getTrendingArticles(limit = 4): Article[] {
  return [...articles].sort((a, b) => b.claps - a.claps).slice(0, limit);
}
