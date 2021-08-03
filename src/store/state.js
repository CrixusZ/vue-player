import { PLAY_MODE, SEARCH_KEY } from "../assets/js/constant";
import { load } from "../assets/js/array-store";

const state = {
  sequenceList: [],
  playList: [],
  playing: false,
  playMode: PLAY_MODE.sequence,
  currentIndex: 0,
  fullScreen: false,
  favoriteList: [], // mainjs那边处理初始值更新url
  searchHistory: load(SEARCH_KEY) || [],
  playHistory: [], // mainjs那边处理初始值更新url
};

export default state;
