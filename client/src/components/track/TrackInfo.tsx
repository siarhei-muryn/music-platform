import React, { useEffect, useState } from "react";
import { IGenre, ITag, ITrack } from "../../types/track";
import { IUser } from "../../types/user";
import { useActions } from "../../hooks/useActions";
import { useNavigate, useParams } from "react-router-dom";
import "./Track.css";
import {
  getTrackAsync,
  getTrackGenresAsync,
  getTrackTagsAsync,
} from "../../helpers/requests/tracksRequests";
import { getUserAsync } from "../../helpers/requests/userRequests";
import { ClientConfig } from "../../clientConfig";
import { ButtonManager, ButtonManagerType } from "../button/ButtonManager";

export const TrackInfo: React.FC = () => {
  const [track, setTrack] = useState<ITrack | null>(null);
  const [author, setAuthor] = useState<IUser>();
  const [genres, setGenres] = useState<IGenre[]>();
  const [tags, setTags] = useState<ITag[]>();
  const [showLyrics, setShowLyrics] = useState(false);

  const { setTracks } = useActions();
  const { id } = useParams<string>();
  const navigate = useNavigate();

  const trackEffect = () => {
    if (!id) return;

    const trackEffectAsync = async () => {
      const response = await getTrackAsync(id);
      setTrack(response.data);
      setTracks([response.data]);
    };
    trackEffectAsync().catch((error) => console.error(error));
  };

  const trackInfoEffect = () => {
    if (!track) return;
    const trackInfoEffectAsync = async () => {
      const userResponse = await getUserAsync(track.user_id);
      setAuthor(userResponse.data);

      const genresResponse = await getTrackGenresAsync(track.id);
      setGenres(genresResponse.data);

      const tagsResponse = await getTrackTagsAsync(track.id);
      setTags(tagsResponse.data);
    };
    trackInfoEffectAsync().catch((error) => console.error(error));
  };

  useEffect(trackEffect, [id]);
  useEffect(trackInfoEffect, [track]);

  const lyricsHandler = () => {
    setShowLyrics(!showLyrics);
  };

  const authorClickHandler = () => {
    navigate(`/${ClientConfig.client_routes.profile.index}/${author?.id}`);
  };

  return (
    <div className={"track_page"}>
      {!track && <div className={"track_card"}></div>}
      {track && author && (
        <>
          <div className={"track_card"}>
            <div className={"track_card_img"}>
              <img src={track.picture_url} alt={"track picture"} />
            </div>
            <div
              className={"card_info"}
              style={{
                backgroundImage: `url(${track.picture_url})`,
                objectFit: "cover",
              }}
            >
              <div className={"card_info_container"}>
                <h1>{track.title}</h1>
                <h2 className={"fake-link"} onClick={authorClickHandler}>
                  {author.username}
                </h2>

                {genres && (
                  <div id={"genres"}>
                    {genres.map((g: IGenre) => {
                      return <small key={g.id}>{g.title + " "}</small>;
                    })}
                  </div>
                )}

                {tags && (
                  <div id={"tags"}>
                    {tags.map((t: ITag) => {
                      return <small key={t.id}>{"#" + t.title + " "}</small>;
                    })}
                  </div>
                )}
              </div>
              <div className={"card_buttons"}>
                <div>Likes: {track.likes}</div>

                <ButtonManager type={ButtonManagerType.PLAY} track={track} />

                <div className={"like-download"}>
                  <ButtonManager type={ButtonManagerType.LIKE} track={track} />
                  <ButtonManager
                    type={ButtonManagerType.DOWNLOAD}
                    trackId={track.id}
                    fileName={track.title}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={"after-card"}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {track.lyrics && !showLyrics && (
                <>
                  {" "}
                  <h2>Lyrics:</h2>
                  <button onClick={lyricsHandler}>Show</button>
                </>
              )}
              {track.lyrics && showLyrics && (
                <>
                  {" "}
                  <h2>Lyrics:</h2>
                  <button onClick={lyricsHandler}>Hide</button>
                </>
              )}
            </div>

            {track.lyrics && showLyrics && (
              <>
                <div className={"fade-in-fwd"}>
                  <p> {track.lyrics}</p>
                  <hr />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
