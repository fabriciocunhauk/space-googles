function VideoPlayer({
  videoId,
  classes,
}: {
  videoId: string;
  classes?: { container?: string };
}) {
  return (
    <div className={classes?.container}>
      <iframe
        className="rounded-lg"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default VideoPlayer;
