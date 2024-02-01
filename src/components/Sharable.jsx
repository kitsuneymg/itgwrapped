import Popup from 'reactjs-popup';
import React from 'react';

import quadIcon from '../assets/quad.svg';
import triIcon from '../assets/tri.svg';
import dubIcon from '../assets/dub.svg';
import starIcon from '../assets/star.svg';
import { getSongName } from './wrapCalc.jsx';
import Heatmap from './Heatmap';

const dateFormat = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
});

const Sharable = (props) => {

    let profile = props.profile;

    let biggestDay = props.biggestDay;
    let mostPlayedPack = props.mostPlayedPack;
    let mostPlayedSong = props.mostPlayedSong;

    return (
            <div className="stats-modal">
                <div className="stats-modal-logo">
                    <img src="./itgwrapped.png" />
                </div>
                <div className="stats-modal-grid">
                    <div className="stats-modal-item">Ended 2023 with <p className="value">{profile.numScores.toLocaleString()}</p> scores</div>
                    <div className="stats-modal-item">Stepped on <p className="value">{profile.notesHit.toLocaleString()}</p> notes</div>
                    <div className="stats-modal-item">Blew up <p className="value">{profile.minesHit.toLocaleString()}</p> mines</div>

                    {profile.grades && ("1" in profile.grades) &&
                    <div className="stats-modal-item">{profile.grades["1"].length || 0} Quad{profile.grades["1"].length>1 ? 's': ''}
                            <a>
                                {
                                    profile.grades["1"].map((score, index) =>
                                        index < 5 &&
                                        <div>
                                            <img className="stars" src={quadIcon} />
                                            <b>  {getSongName(score)}</b>
                                        </div>
                                    )}

                                {profile.grades["1"].length >= 5 &&
                                    <p>...and more!</p>
                                }
                            </a>
                        </div>
                    }

                    <div className="stats-modal-item">Made Disco Pop<p className="value">{profile.discoPop} times</p></div>
                <div className="stats-modal-item">Longest Session<p className="value">{dateFormat.format(Date.parse(biggestDay))}</p>{profile.daysPlayed[biggestDay]} scores</div>
                    <div className="stats-modal-item">Favorite Pack<p className="value">{mostPlayedPack}</p>{profile.packPlays[mostPlayedPack]} scores</div>
                    <div className="stats-modal-item">Favorite Song<p className="value">{mostPlayedSong}</p>{profile.songPlays[mostPlayedSong]} scores</div>
                    <div className="stats-modal-grades">
                        <div className="value">
                            <img className="stats-modal-stars" src={quadIcon} />
                            <p>{("1" in profile.grades) && profile.grades["1"].length || 0}</p>
                        </div>
                        <div className="value">
                            <img className="stats-modal-stars" src={triIcon} />
                            <p>{("2" in profile.grades) && profile.grades["2"].length || 0}</p>
                        </div>
                        <div className="value">
                            <img className="stats-modal-stars" src={dubIcon} />
                            <p>{("3" in profile.grades) && profile.grades["3"].length || 0}</p>
                        </div>
                        <div className="value">
                            <img className="stats-modal-stars" src={starIcon} />
                            <p>{("4" in profile.grades) && profile.grades["4"].length || 0}</p>
                        </div>
                    </div>
                </div>
                <Heatmap dates={profile.daysPlayed} maxDay={profile.daysPlayed[biggestDay]} />
            </div>
    );
}

export default Sharable;