import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>API</title>
      </Head>
      <p>Endpoints</p>
      <p>/api/v1/codm/build Get details about a build</p>
      <p>/api/v1/codm/melee Get details about a melee</p>
      <p>api/v1/codm/perk Get details about a perk</p>
      <p>/api/v1/codm/scorestreak Get details about a scorestreak</p>
      <p>/api/v1/fun/8ball 8ball a question</p>
      <p>/api/v1/fun/doublestruck Doublestruck a text</p>
      <p>/api/v1/fun/fractur Fractur a text</p>
      <p>/api/v1/fun/reverse Reverse a text</p>
      <p>/api/v1/fun/superscript Superscript a text</p>
      <p>/api/v1/image/alone Create a alone meme</p>
      <p>/api/v1/image/awesome Create a awesome meme</p>
      <p>/api/v1/image/bestmeme Create a bestmeme meme</p>
      <p>/api/v1/image/busted Create a busted meme</p>
      <p>/api/v1/image/communism Create a communism meme</p>
      <p>/api/v1/image/gun Create a gun meme</p>
      <p>/api/v1/image/mask Create a mask meme</p>
      <p>/api/v1/image/moment Create a moment meme</p>
      <p>/api/v1/image/pray Create a pray meme</p>
      <p>/api/v1/image/pressplay Create a pressplay meme</p>
      <p>/api/v1/image/rifleshoot Create a rifleshoot meme</p>
      <p>/api/v1/image/robert Create a robert meme</p>
      <p>/api/v1/image/saveonlyone Create a saveonlyone meme</p>
      <p>/api/v1/image/toilet Create a toilet meme</p>
      <p>/api/v1/image/vr Create a vr meme</p>
      <p>/api/v1/image/whodidthis Create a whodidthis meme</p>
      <p>/api/v1/rpc/json/[id] Get rich presence of user with json</p>
      <p>/api/v1/rpc/[id] Get rich presence of user with image</p>
      <p>/api/v1/server/[invite] Get server information based on invite code</p>
      <p>/api/v1/shield/[user] Get user shield using shield.io</p>
    </>
  );
}
