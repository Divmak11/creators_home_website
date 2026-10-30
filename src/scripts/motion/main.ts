// Motion entry point. Mounted ONCE, at the end of <body> in Base.astro.
import './core';
import './countup';
import { initMarquees } from './marquee';
import { bindPauseToggles } from './pause';
import { watchLoops } from './core';

initMarquees();
bindPauseToggles();
watchLoops();
