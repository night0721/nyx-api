import { AutoRouter, cors, html } from "itty-router";
import { router as v1 } from "./v1";

const { preflight, corsify } = cors();

const router = AutoRouter();

const index_html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>API Endpoints</title>
    <style>
        :root{
            --bg: #0f141a;
            --panel: #141a21;
            --panel-2: #11161c;
            --text: #e6edf3;
            --muted: #9aa7b2;
            --accent: #5865F2;
            --border: #22303c;
            --chip: #19232d;
            --shadow: 0 8px 24px rgba(0,0,0,0.3);
            --radius: 14px;
        }
        * { box-sizing: border-box; }
        body{
            margin:0;
            font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
            background: radial-gradient(1200px 700px at 85% -10%, rgba(88,101,242,.15), transparent 60%),
            radial-gradient(1000px 600px at -10% 10%, rgba(20,26,33,.6), transparent 60%),
            var(--bg);
            color: var(--text);
            line-height: 1.6;
        }
        header{
            padding: 48px 20px 20px;
            text-align: center;
        }
        header h1{
            margin: 0;
            font-size: 2.2rem;
            letter-spacing: 0.3px;
        }
        header p{
            margin: 8px 0 0;
            color: var(--muted);
        }

        .container{
            max-width: 1100px;
            margin: 24px auto 64px;
            padding: 0 20px;
        }

        .grid{
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 18px;
        }

        .card{
            grid-column: span 12;
            background: linear-gradient(180deg, var(--panel), var(--panel-2));
            border: 1px solid var(--border);
            border-radius: var(--radius);
            box-shadow: var(--shadow);
            overflow: hidden;
        }
        @media (min-width: 760px){
            .card{ grid-column: span 6; }
        }
        @media (min-width: 1100px){
            .card{ grid-column: span 6; }
        }

        .card-header{
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 16px 18px;
            background: linear-gradient(180deg, rgba(88,101,242,.08), transparent);
            border-bottom: 1px solid var(--border);
        }
        .card-title{
            font-weight: 700;
            letter-spacing: .3px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .chip{
            background: var(--chip);
            border: 1px solid var(--border);
            color: var(--muted);
            padding: 2px 10px;
            font-size: .8rem;
            border-radius: 999px;
        }

        .endpoints{
            padding: 10px 10px 4px;
        }
        .endpoint{
            display: grid;
            grid-template-columns: 1fr;
            gap: 6px;
            padding: 12px 10px;
            border-radius: 10px;
            border: 1px solid transparent;
            transition: border-color .2s, background .2s;
        }
        .endpoint:hover{
            border-color: var(--border);
            background: rgba(255,255,255,.02);
        }
        .path{
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: .95rem;
            background: #0b1116;
            border: 1px solid var(--border);
            padding: 6px 10px;
            border-radius: 8px;
            width: fit-content;
            max-width: 100%;
            overflow-x: auto;
            white-space: nowrap;
        }
        .desc{
            color: var(--muted);
            font-size: .95rem;
        }

        .tag{
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 2px 8px;
            border-radius: 999px;
            font-size: .78rem;
            border: 1px solid var(--border);
            background: var(--chip);
            color: var(--muted);
            margin-left: 8px;
        }

        .footer-note{
            margin-top: 26px;
            color: var(--muted);
            font-size: .92rem;
            text-align: center;
        }
        a.path-link{
            color: var(--text);
            text-decoration: none;
        }
        a.path-link:hover{
            color: var(--accent);
        }
    </style>
</head>
<body>
<header>
    <h1>API Endpoints</h1>
    <p>Grouped by category for quick discovery</p>
</header>

<main class="container">
    <section class="grid">

        <!-- CODM -->
        <article class="card">
            <div class="card-header">
                <div class="card-title">CODM <span class="chip">/api/v1/codm</span></div>
            </div>
            <div class="endpoints">
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/codm/build">/api/v1/codm/build</a></code>
                    <div class="desc">Get details about a build</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/codm/melee">/api/v1/codm/melee</a></code>
                    <div class="desc">Get details about a melee</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/codm/perk">/api/v1/codm/perk</a></code>
                    <div class="desc">Get details about a perk</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/codm/scorestreak">/api/v1/codm/scorestreak</a></code>
                    <div class="desc">Get details about a scorestreak</div>
                </div>
            </div>
        </article>

        <!-- Fun -->
        <article class="card">
            <div class="card-header">
                <div class="card-title">Fun <span class="chip">/api/v1/fun</span></div>
            </div>
            <div class="endpoints">
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/fun/8ball">/api/v1/fun/8ball</a></code>
                    <div class="desc">8ball a question</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/fun/doublestruck">/api/v1/fun/doublestruck</a></code>
                    <div class="desc">Doublestruck a text</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/fun/fractur">/api/v1/fun/fractur</a></code>
                    <div class="desc">Fractur a text</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/fun/reverse">/api/v1/fun/reverse</a></code>
                    <div class="desc">Reverse a text</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/fun/superscript">/api/v1/fun/superscript</a></code>
                    <div class="desc">Superscript a text</div>
                </div>
            </div>
        </article>

        <!-- Image -->
        <article class="card">
            <div class="card-header">
                <div class="card-title">Image <span class="chip">/api/v1/image</span></div>
            </div>
            <div class="endpoints">
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/alone">/api/v1/image/alone</a></code><div class="desc">Create an "alone" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/awesome">/api/v1/image/awesome</a></code><div class="desc">Create an "awesome" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/bestmeme">/api/v1/image/bestmeme</a></code><div class="desc">Create a "bestmeme" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/busted">/api/v1/image/busted</a></code><div class="desc">Create a "busted" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/communism">/api/v1/image/communism</a></code><div class="desc">Create a "communism" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/gun">/api/v1/image/gun</a></code><div class="desc">Create a "gun" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/mask">/api/v1/image/mask</a></code><div class="desc">Create a "mask" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/moment">/api/v1/image/moment</a></code><div class="desc">Create a "moment" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/pray">/api/v1/image/pray</a></code><div class="desc">Create a "pray" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/pressplay">/api/v1/image/pressplay</a></code><div class="desc">Create a "pressplay" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/rifleshoot">/api/v1/image/rifleshoot</a></code><div class="desc">Create a "rifleshoot" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/robert">/api/v1/image/robert</a></code><div class="desc">Create a "robert" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/saveonlyone">/api/v1/image/saveonlyone</a></code><div class="desc">Create a "saveonlyone" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/toilet">/api/v1/image/toilet</a></code><div class="desc">Create a "toilet" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/vr">/api/v1/image/vr</a></code><div class="desc">Create a "vr" meme</div></div>
                <div class="endpoint"><code class="path"><a class="path-link" href="/api/v1/image/whodidthis">/api/v1/image/whodidthis</a></code><div class="desc">Create a "whodidthis" meme</div></div>
            </div>
        </article>

        <!-- Discord -->
        <article class="card">
            <div class="card-header">
                <div class="card-title">Discord <span class="chip">/api/v1/discord</span></div>
            </div>
            <div class="endpoints">
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/discord/user/json/123456789">/api/v1/discord/user/json/[id]</a></code>
                    <div class="desc">Get rich presence of user (JSON)</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/discord/user/123456789">/api/v1/discord/user/[id]</a></code>
                    <div class="desc">Get rich presence of user (image)</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/discord/server/yourInviteCode">/api/v1/discord/server/[invite]</a></code>
                    <div class="desc">Get server information based on invite code</div>
                </div>
                <div class="endpoint">
                    <code class="path"><a class="path-link" href="/api/v1/discord/shield/123456789">/api/v1/discord/shield/[id]</a></code>
                    <div class="desc">Get user shield using shields.io</div>
                </div>
            </div>
        </article>

    </section>

    <p class="footer-note">
        Tip: Click a path to try it in your browser (where applicable).
    </p>
</main>
</body>
</html>
`;

router
	.get("/", () => html(index_html))
	.get("/api/v1/*", v1.fetch);

export default { ...router };
