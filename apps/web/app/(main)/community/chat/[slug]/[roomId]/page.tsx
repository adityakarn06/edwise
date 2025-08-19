import CommunityWrapper from "@/components/community/ChatWrapper";

export default async function ChatPage({
  params,
}: {
  params: { slug: string; roomId: string };
}) {
  const { slug, roomId } = await params;
  return <CommunityWrapper slug={slug} roomId={roomId} />;
}
