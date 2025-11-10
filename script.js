    let player = null;
    let ui = null;
    const o = {
      PlayerContainer: document.getElementById('playerContainer'),
      AvPlayer: document.getElementById('avplayer'),
      Nav: document.getElementById('nav'),
      GroupList: document.getElementById('GroupList'),
      DynamicGroupsList: document.getElementById('DynamicGroupsList'),
      ListContainer: document.getElementById('list_container'),
      ChannelList: document.getElementById('ChannelList'),
      ChannelLoader: document.getElementById('ChannelLoader'),
      IdleAnimation: document.getElementById('IdleAnimation'),
      PlayButton: document.getElementById('PlayButton'),
      BlurOverlay: document.getElementById('BlurOverlay'),
      ChannelInfo: document.getElementById('ChannelInfo'),
      SettingsMainMenu: document.getElementById('SettingsMainMenu'),
      SettingsVideoFormatMenu: document.getElementById('SettingsVideoFormatMenu'),
      SettingsContainer: document.getElementById('settings_container'),
      ChannelSettings: document.getElementById('ChannelSettings'),
      CodecInfo: document.getElementById('CodecInfo'),
      Guide: document.getElementById('Guide'),
      GuideContent: document.getElementById('GuideContent'),
      EpgOverlay: document.getElementById('EpgOverlay'),
      EpgChannels: document.getElementById('EpgChannels'),
      EpgTimeline: document.getElementById('EpgTimeline'),
      SettingsModal: document.getElementById('SettingsModal'),
      SettingsModalContent: document.getElementById('SettingsModalContent'),
      SearchField: document.getElementById('SearchField'),
      ChannelInfoName: document.getElementById('channel_name'),
      ChannelInfoEpg: document.getElementById('channel_epg'),
      ChannelInfoLogo: document.getElementById('ch_logo')
    };

    // --- FIX: Updated broken stream URLs with working test streams ---
    let channels = {
SonictheHedgehog: { name: "Sonic the Hedgehog", type: "hls", manifestUrl: "https://d1si3n1st4nkgb.cloudfront.net/10000/88258004/hls/master.m3u8?ads.xumo_channelId=88258004", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Sonic_The_Hedgehog.svg/1200px-Sonic_The_Hedgehog.svg.png", group: ["cartoons & animations"], },
SuperMario: { name: "Super Mario", type: "hls", manifestUrl: "https://d1si3n1st4nkgb.cloudfront.net/10000/88258005/hls/master.m3u8?ads.xumo_channelId=88258005", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFkMkkUmZBGslGWGZMN2er5emlnqGCCU49wg&s", group: ["cartoons & animations"], },
Teletubbies: { name: "Teletubbies", type: "hls", manifestUrl: "https://d1si3n1st4nkgb.cloudfront.net/10000/88258003/hls/master.m3u8?ads.xumo_channelId=88258003", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/Teletubbies_Logo.png/330px-Teletubbies_Logo.png", group: ["cartoons & animations"], },
anione: { name: "Ani One", type: "hls", manifestUrl: "https://amg19223-amg19223c9-amgplt0019.playout.now3.amagi.tv/playlist/amg19223-amg19223c9-amgplt0019/playlist.m3u8", logo: "https://www.medialink.com.hk/img/ani-one-logo.jpg", group: ["cartoons & animations"], },
aniplus: { name: "Aniplus", type: "hls", manifestUrl: "https://amg18481-amg18481c1-amgplt0352.playout.now3.amagi.tv/playlist/amg18481-amg18481c1-amgplt0352/playlist.m3u8", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJj494OpI0bKrTrvcHqEkzMYzqtfLNdWjQrg&s", group: ["cartoons & animations"], },
sinemanila: { name: "SineManila", type: "hls", manifestUrl: "https://live20.bozztv.com/giatv/giatv-sinemanila/sinemanila/chunks.m3u8", logo: "", group:["movies", "entertainment"], },
mrbeanlive: { name: "MR Bean Live Action", type: "hls", manifestUrl: "https://amg00627-amg00627c40-rakuten-uk-5725.playouts.now.amagi.tv/ts-eu-w1-n2/playlist/amg00627-banijayfast-mrbeanpopupcc-rakutenuk/cb573d1d7d6c648b92d43b66cef24582847b3dcb0e6c886470af4a9765d96300dbf9b9c8fd3ab13c1ec0468a710b6d5a4d1cd209af3c419b8b1dfd034f25536b9f9bb565da9f0211c9a06b5756af6a4208a55b05a7700079d6a05a2b8d2fba74005cb95a3c1862c3ed47ad662f9ad253d72a39e8fc8b307b24455a9c5a43e6a64cb7abe95810893aa5b00140c12e14fa83439fd401b388d50f8315d775a514c893a182da1187e4205293728aecdb5f581fa9a83bf8f955bfd6937929957f2d556c3a8cc1b2cd3ef702da21269cded8b6648560a63ebb89125a980194408b338b65ea2aaef557e2dad320aaea5ad6a60b315dccc8a59ee93a739067f5abe5dc391af392452c179b3f994a5f491a999f65d2ff58b6cf8d6d06d79d67feb10ff0bca18aeeffa04b922cc6c6ce7a5c28414e0b188f51ae9b228e678d38e0e21a2f49551fedbb5bc094d65734221ed6db1eff5a5b98cb9b8fda393ec84b124ea7358a0c4b3f9a742457cd19d4b6702c852f0180751afe5b3e8f0bbc9b24e7a8d6e0496ae68c8912b13fa1e54afff900a061391931b2f42d4d4c032883b9285e660bae2f83f2c4e5650609e885afaf9029580d5a460a586b835790052ba668aed8b933cf2257196f9860690e20e9/184/1280x720_3329040/index.m3u8", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdSj6OHTQv9_53OX9ZwSjCqOTkYj5dDUZUW0irJhXranWx7zI1YhEIwg&s=10", group:["cartoons & animations", "entertainment"], },
        
    };
    
    let aFilteredChannelKeys = [];
    let sSelectedGroup = '__all';
    let iCurrentChannel = 0; 
    let iGroupListIndex = 1; // Default to 'EPG' (index 1)
    let iPlayingChannelIndex = -1; // --- FIX: Added to track playing channel ---
    let channelNameTimeout = null;
    let isSessionActive = false;
    let bNavOpened = false;
    let bGroupsOpened = false;
    let bChannelSettingsOpened = false;
    let bSettingsModalOpened = false;
    let bGuideOpened = false;
    let bEpgOpened = false;
    let iChannelSettingsIndex = 0;
    let iVideoSettingsIndex = 0;
    let iEpgChannelIndex = 0;
    let iSettingsModalIndex = 0; // Index for modal navigation
    let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;
    let lastTapTime = 0;
    let loaderFadeTimeout = null; 
    let tempMessageTimeout = null; 

    /* -------------------------
        Utilities
        ------------------------- */
    function getEl(id) { return document.getElementById(id); }
    function scrollToListItem(oListItem) {
        const oParentBox = oListItem.closest('.custom-scrollbar');
        if (oParentBox) {
            oParentBox.scrollTop = oListItem.offsetTop - oParentBox.offsetHeight * 0.4;
        }
    }

    /* -------------------------
        Core Player Functions
        ------------------------- */
    async function initPlayer() {
      Object.keys(channels).forEach((key, i) => {
        channels[key].number = i + 1;
        channels[key].key = key;
      });

      loadFavoritesFromStorage();
      setupMainMenuControls();
      buildDynamicGroupNav();
      sSelectedGroup = '__all';

      // Default to EPG (index 1) or 'ALL CHANNELS' (index 3) if EPG isn't found
      if (o.GroupList) {
          const allGroupLiItems = o.GroupList.querySelectorAll('li');
          let epgLi = getEl('epg_button');
          if (epgLi && allGroupLiItems.length > 1) {
              iGroupListIndex = Array.from(allGroupLiItems).indexOf(epgLi);
          } else {
              const allLi = Array.from(allGroupLiItems).find(li => li.dataset.group === '__all');
              if (allLi) {
                  iGroupListIndex = Array.from(allGroupLiItems).indexOf(allLi);
              } else {
                  iGroupListIndex = 1; // Fallback
              }
          }
      } else {
          iGroupListIndex = 1;
      }

      buildNav();
      updateSelectedGroupInNav();

      await shaka.polyfill.installAll();
      if (!shaka.Player.isBrowserSupported()) {
        console.error("Browser not supported");
        return;
      }

      player = new shaka.Player();
      // SHAKA UI CUSTOMIZATION (PIP ONLY)
      ui = new shaka.ui.Overlay(player, o.PlayerContainer, o.AvPlayer);
     
      // --- FINAL FIX: Added enableControlsFade: false ---
      ui.configure({
        // controlPanelElements: ['pip'], // User script hides this
        overflowMenuButtons: [], // Hide all overflow buttons
        addSeekBar: false,
        addBigPlayButton: false,
        showBuffering: true,
        clickToPlay: false,
        enableControlsFade: false // --- THIS IS THE FIX ---
      });
      // --- END FIX ---
     
      player.attach(o.AvPlayer);

      player.configure({
        abr: { defaultBandwidthEstimate: 3000000 }, 
        streaming: {
          rebufferingGoal: 5, 
          bufferingGoal: 10  
        }
      });

     player.addEventListener('error', e => {
        console.error('Shaka Error:', e.detail);
        const isNetworkOrMediaError =
          e.detail.category === shaka.util.Error.Category.NETWORK ||
          e.detail.category === shaka.util.Error.Category.MEDIA ||
          e.detail.category === shaka.util.Error.Category.STREAMING;

        // --- FIX: Added !isSessionActive check ---
        if (!isNetworkOrMediaError && !isSessionActive) {
          showIdleAnimation(true);
        }
        // --- END FIX ---
        if (o.ChannelLoader) {
          clearTimeout(loaderFadeTimeout);
          o.ChannelLoader.classList.add('HIDDEN');
          o.ChannelLoader.style.opacity = '1';
          o.ChannelLoader.classList.remove('fade-out');
        }
        if (o.AvPlayer) o.AvPlayer.style.opacity = '1';
      });

      player.addEventListener('trackschanged', renderChannelSettings);
      player.addEventListener('buffering', handleBuffering);
      player.addEventListener('playing', handlePlaying);

      player.addEventListener('adaptation', updateStreamInfo);
      player.addEventListener('streaming', updateStreamInfo);

      setupControls();

      // --- FIX: The 4 lines that showed the loader here were a bug and have been removed ---
      
      showIdleAnimation(true);
      loadInitialChannel();
    }

    function handleBuffering(event) {
      clearTimeout(loaderFadeTimeout);
      if (!event.buffering) {
        hideLoaderAndShowVideo();
      }
    }

    function handlePlaying() {
      hideLoaderAndShowVideo();
    }

function hideLoaderAndShowVideo() {
      clearTimeout(loaderFadeTimeout);
      if (o.AvPlayer) o.AvPlayer.style.opacity = '1';

      // --- FIX: Hides the idle background when video starts ---
      hideIdleAnimation(); 
      // --- END FIX ---

      if (o.ChannelLoader && !o.ChannelLoader.classList.contains('HIDDEN')) {
        o.ChannelLoader.classList.add('fade-out');

        loaderFadeTimeout = setTimeout(() => {
          if (o.ChannelLoader) {
            o.ChannelLoader.classList.add('HIDDEN');
            o.ChannelLoader.style.opacity = '1';
            o.ChannelLoader.classList.remove('fade-out');
          }
        }, 500); // Match fade-out duration
      }
    }

    function setupControls() {
      const playerContainer = o.PlayerContainer;

      playerContainer.addEventListener('touchstart', e => {
        if (e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchEndX = touchStartX;
          touchEndY = touchStartY;
        }
      }, { passive: true });

      playerContainer.addEventListener('touchmove', e => {
        if (e.touches.length === 1) {
          touchEndX = e.touches[0].clientX;
          touchEndY = e.touches[0].clientY;
        }
      }, { passive: true });

      playerContainer.addEventListener('touchend', e => {
        if (e.changedTouches.length !== 1) return;

        const targetElement = document.elementFromPoint(touchStartX, touchStartY);
        if (targetElement && (targetElement.closest('#nav') || targetElement.closest('#ChannelSettings') || targetElement.closest('#SettingsModal') || targetElement.closest('#Guide') || targetElement.closest('#EpgOverlay'))) {
          touchStartX = touchStartY = touchEndX = touchEndY = 0;
          return;
        }
       
        if (targetElement && targetElement.closest('#PlayButton')) {
          touchStartX = touchStartY = touchEndX = touchEndY = 0;
          return;
        }

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);
        const SWIPE_THRESHOLD = 50;
        const TAP_THRESHOLD = 15;

        // 1. Check for SWIPE
        if (absDeltaX > SWIPE_THRESHOLD || absDeltaY > SWIPE_THRESHOLD) {
          handleSwipeGesture(deltaX, deltaY, absDeltaX, absDeltaY);
          lastTapTime = 0;
          touchStartX = touchStartY = touchEndX = touchEndY = 0;
          return;
        }

        // 2. Check for TAP (Double-Tap Fullscreen Fix)
        if (absDeltaX < TAP_THRESHOLD && absDeltaY < TAP_THRESHOLD) {
          const currentTime = new Date().getTime();
          if (currentTime - lastTapTime < 300) { // Double-tap
            e.preventDefault();
            handleDoubleTapAction();
            lastTapTime = 0;
          } else {
            lastTapTime = currentTime;
          }
        }
       
        touchStartX = touchStartY = touchEndX = touchEndY = 0;
      }, { passive: false });

      playerContainer.addEventListener('click', e => {
        if (e.target && e.target.closest('#PlayButton')) return;
       
        if (e.target && (e.target.closest('#nav') || e.target.closest('#ChannelSettings') || e.target.closest('#SettingsModal') || e.target.closest('#Guide') || e.target.closest('#EpgOverlay'))) {
          return;
        }

        const currentTime = new Date().getTime();
        const isFromTap = (currentTime - lastTapTime) < 350;

        if (isFromTap) {
          handleSingleTapAction();
        } else {
          if (currentTime - lastTapTime < 300) {
            // Handled by dblclick
          } else {
            handleSingleTapAction();
            lastTapTime = currentTime;
          }
        }
      });

      playerContainer.addEventListener('dblclick', e => {
        e.preventDefault();
        handleDoubleTapAction(); // DOUBLE-TAP/CLICK Fullscreen
      });
    }

// --- START: NEW SWIPE LOGIC (Replaces old handleSwipeGesture) ---
    function handleSwipeGesture(deltaX, deltaY, absDeltaX, absDeltaY) {
      const isHorizontal = absDeltaX > absDeltaY;
     
      if (bGuideOpened || bEpgOpened || bSettingsModalOpened) return;

      if (isHorizontal) {
        if (deltaX > 0) { // --- Swipe Left-to-Right ---
          
          if (bChannelSettingsOpened) {
            // 1. If Right panel is open, L-R closes it.
            hideChannelSettings();
          } else if (bNavOpened && !bGroupsOpened) {
            // 2. If Channel List is open, L-R drills IN to Groups. (This is the fix)
            showGroups(); 
          } else if (!bNavOpened) {
            // 3. If all panels are closed, L-R opens the Channel List.
            showNav();
          }
          // 4. (Implicit) If Group List is open, L-R does nothing (at deepest level).

        } else if (deltaX < 0) { // --- Swipe Right-to-Left ---
          
          if (bNavOpened && bGroupsOpened) {
            // 1. If Group List is open, R-L goes BACK to Channel List.
            hideGroups();
          } else if (bNavOpened && !bGroupsOpened) {
            // 2. If Channel List is open, R-L CLOSES it.
            hideNav();
          } else if (!bNavOpened && !bChannelSettingsOpened) {
            // 3. If all panels are closed, R-L opens the Right (Settings) panel.
            showChannelSettings();
          }
          // 4. (Implicit) If Right (Settings) panel is open, R-L does nothing (at deepest level).
        }
      
      } else { // Vertical Swipe (Unchanged)
        if (!bNavOpened && !bChannelSettingsOpened) {
         if (deltaY > 0) {
            loadChannel(iCurrentChannel + 1);
          } else {
            loadChannel(iCurrentChannel - 1);
          }
        }
      }
    }
    // --- END: NEW SWIPE LOGIC ---

    function handleSingleTapAction() {
      if (!isSessionActive) return;

      if (bNavOpened || bChannelSettingsOpened || bGuideOpened || bEpgOpened || bSettingsModalOpened) {
        clearUi();
      } else {
        showChannelName();
      }
    }

    function handleDoubleTapAction() {
      toggleFullScreen();
    }


    function loadInitialChannel() {
      const storedLast = localStorage.getItem('iptvLastWatched');
      // --- FIX: Changed default channel to a more stable one ---
      let initialChannelKey = 'KidoodleTV'; 
      if (!channels[initialChannelKey]) {
        initialChannelKey = Object.keys(channels)[0];
        if (!initialChannelKey) {
          console.error("No channels defined.");
          return;
        }
      }

      if (aFilteredChannelKeys.length === 0) {
        sSelectedGroup = '__all';
        buildNav();
        if (aFilteredChannelKeys.length === 0) {
            console.error("No channels available even in the '__all' group.");
            return;
        }
      }

      if (storedLast && channels[storedLast] && aFilteredChannelKeys.includes(storedLast)) {
          initialChannelKey = storedLast;
      }
      else if (!aFilteredChannelKeys.includes(initialChannelKey)) {
          initialChannelKey = aFilteredChannelKeys[0];
      }

      if (!initialChannelKey || !aFilteredChannelKeys.includes(initialChannelKey)) {
          console.error("Could not determine a valid initial channel from filtered list.");
          return;
      }

      const initialIndex = aFilteredChannelKeys.indexOf(initialChannelKey);
      iCurrentChannel = (initialIndex >= 0 ? initialIndex : 0); 
      // --- FIX: Set playing index on initial load ---
      iPlayingChannelIndex = iCurrentChannel;
     
      loadChannel(iCurrentChannel, { isInitialLoad: true });
    }


    async function loadChannel(index, options = {}) {
      clearTimeout(loaderFadeTimeout);

      if (!aFilteredChannelKeys || aFilteredChannelKeys.length === 0) {
        console.warn("loadChannel called with no filtered channels available.");
        try { await player?.unload(); } catch {}
        showIdleAnimation(true);
        return;
      }

      iCurrentChannel = (index < 0) ? aFilteredChannelKeys.length - 1 : index % aFilteredChannelKeys.length; 
     
      // --- FIX: Set playing index ONLY if it's not an initial (pre)load ---
      if (!options.isInitialLoad || isSessionActive) {
          iPlayingChannelIndex = iCurrentChannel;
      }

      const newChannelKey = aFilteredChannelKeys[iCurrentChannel]; 
      const newChannel = channels[newChannelKey];
      if (!newChannel) {
          console.error(`Invalid channel key or data for index ${iCurrentChannel}: ${newChannelKey}`); 
          showIdleAnimation(true);
          return;
      }

      // --- NEW: Load-on-Click Logic ---
      // If this is the initial load, AND the user hasn't clicked "Play" yet,
      // just set the UI and show the play button, but DO NOT load the stream.
      if (options.isInitialLoad && !isSessionActive) {
          console.log("Initial load: Setting channel but not loading stream.");
          localStorage.setItem('iptvLastWatched', newChannelKey);
         
          if (o.AvPlayer) o.AvPlayer.style.opacity = '0';
         
          // --- FIX: This is the correct logic ---
          if (o.ChannelLoader) { // Ensure loader is hidden
              clearTimeout(loaderFadeTimeout);
              o.ChannelLoader.classList.add('HIDDEN');
              o.ChannelLoader.style.opacity = '1';
              o.ChannelLoader.classList.remove('fade-out');
          }
         
          hideChannelName();
          updateSelectedChannelInNav(); // Update nav selection
          showIdleAnimation(true); // Show play button
          return; // Exit before loading
      }
      // --- End: Load-on-Click Logic ---

      // --- FIX: Hide idle animation when a channel load starts ---
      if (isSessionActive) {
          hideIdleAnimation();
      }

      if (!player) {
          console.error("Player not initialized before loading channel.");
          return;
      }

      localStorage.setItem('iptvLastWatched', newChannelKey);

      showTempChannelSwitchMessage(newChannel.logo, newChannel.name, newChannel.number);

      if (o.AvPlayer) o.AvPlayer.style.opacity = '0';

      if (o.ChannelLoader) {
        // --- FIX: Update loading text ---
        const loaderText = document.getElementById('loading-channel-name');
        if (loaderText) {
          loaderText.textContent = `Loading ${newChannel.name}...`;
        }
        // --- END FIX ---
        o.ChannelLoader.classList.remove('fade-out');
        o.ChannelLoader.style.opacity = '1';
        o.ChannelLoader.classList.remove('HIDDEN');
      }

      hideChannelName();
      updateSelectedChannelInNav();

      try {
        player.configure('drm.clearKeys', {});
        if (newChannel.type === 'clearkey' && newChannel.keyId && newChannel.key) {
          player.configure({ drm: { clearKeys: { [newChannel.keyId]: newChannel.key } } });
        }

        player.getNetworkingEngine()?.clearAllRequestFilters();
        if (newChannel.userAgent) {
          player.getNetworkingEngine()?.registerRequestFilter((type, request) => {
            request.headers['User-Agent'] = newChannel.userAgent;
          });
        }

        await player.load(newChannel.manifestUrl);

        if (isSessionActive) {
          if (o.AvPlayer) {
              o.AvPlayer.muted = false;
              o.AvPlayer.play().catch(e => console.warn("Autoplay after load prevented.", e));
          }
          showChannelName();
        }
        // Removed 'else if (options.isInitialLoad)' block as it's now handled by the early return
      } catch (error) {
        console.error(`Error loading channel "${newChannel?.name}":`, error);
        showIdleAnimation(true);
        if (o.ChannelLoader) {
          clearTimeout(loaderFadeTimeout);
          o.ChannelLoader.classList.add('HIDDEN');
          o.ChannelLoader.style.opacity = '1';
          o.ChannelLoader.classList.remove('fade-out');
        }
        if (o.AvPlayer) o.AvPlayer.style.opacity = '1'; 
      }
    }

    /* -------------------------
        UI and Navigation
        ------------------------- */
    function setupMainMenuControls() {
      const guideBtn = getEl('guide_button');
      const epgBtn = getEl('epg_button');
      const listHeadline = document.querySelector('.list_headline'); 

      if (guideBtn) guideBtn.onclick = window.showGuide;
      else console.warn("guide_button not found.");
      if (epgBtn) epgBtn.onclick = showEpg;
      else console.warn("epg_button not found.");
     
      if (listHeadline) {
          listHeadline.onclick = showGroups; 
      }

      if (o.PlayButton) {
          o.PlayButton.removeEventListener('mousedown', handleFirstPlay);
          o.PlayButton.addEventListener('mousedown', handleFirstPlay);
      } else {
          console.error("PlayButton element not found.");
      }
    }

    function buildDynamicGroupNav() {
      if (!o.DynamicGroupsList || !o.GroupList) {
          console.error("Required group list elements not found.");
          return;
      }

      let sortedGroups = [];
      try {
          const allGroups = new Set(Object.values(channels).flatMap(ch => ch?.group || []));
          sortedGroups = [...allGroups].sort();
      } catch (error) { console.error("Error processing channel groups:", error); }

      o.DynamicGroupsList.innerHTML = '';

      const allListItems = [];

      const favLi = document.createElement('li');
      favLi.dataset.group = '__fav';
      favLi.textContent = 'FAVORITES';
      allListItems.push(favLi);

      const allLi = document.createElement('li');
      allLi.dataset.group = '__all';
      allLi.textContent = 'ALL CHANNELS';
      allListItems.push(allLi);

      sortedGroups.forEach(name => {
        const safeName = (name || 'Unnamed Group').replace(/</g, '&lt;');
        const dynamicLi = document.createElement('li');
        dynamicLi.dataset.group = safeName;
        dynamicLi.textContent = safeName.toUpperCase();
        allListItems.push(dynamicLi);
      });

      allListItems.forEach(li => o.DynamicGroupsList.appendChild(li));

      const fullGroupListItems = o.GroupList.querySelectorAll('li');

      fullGroupListItems.forEach((li, index) => {
          li.onclick = null;
          if (li.hasAttribute('data-group')) {
              li.onclick = () => selectGroup(index);
          }
          else if (li.id === 'guide_button') {
              li.onclick = window.showGuide;
          } else if (li.id === 'epg_button') {
              li.onclick = showEpg;
          }
      });
    }

    function selectGroup(index) {
      if (!o.GroupList || !o.ListContainer) {
          console.error("GroupList or ListContainer not found.");
          return;
      }

      const groupItems = o.GroupList.querySelectorAll('li');
      if (index < 0 || index >= groupItems.length) {
          console.warn("Invalid index passed to selectGroup:", index);
          return;
      }
      const item = groupItems[index];
      if (!item || !item.hasAttribute('data-group')) {
          return;
      }

      if (item.dataset.group === '__fav') {
          const hasFavorites = Object.values(channels).some(ch => ch.favorite === true);
          if (!hasFavorites) {
              showTempMessage("No favorite channels added yet.");
              hideNav();
              return; 
          }
      }

      sSelectedGroup = item.dataset.group;
      iGroupListIndex = index;
      updateSelectedGroupInNav();

      // Define the function to run after transition
      const afterTransition = () => {
        o.ListContainer.removeEventListener('transitionend', afterTransition);
        buildNav(); // Rebuild the channel list based on the new group

        if (aFilteredChannelKeys.length > 0) {
          iCurrentChannel = 0; 
          updateSelectedChannelInNav();
          if (isSessionActive) { hideIdleAnimation(); }
        } else {
          try { player?.unload(); } catch {}
          showIdleAnimation(true);
        }
      };

      o.ListContainer.addEventListener('transitionend', afterTransition, { once: true });
      hideGroups(); // Slide back to channel list
    }

    function buildNav() {
      if (!o.ChannelList || !o.SearchField) {
          console.error("ChannelList or SearchField element not found.");
          return;
      }

      const searchTerm = o.SearchField.value.toLowerCase();

      try {
          aFilteredChannelKeys = Object.keys(channels)
            .filter(key => {
              const ch = channels[key];
              if (!ch || typeof ch.name !== 'string') return false;
              const inGroup = sSelectedGroup === '__all' ||
                                (sSelectedGroup === '__fav' && ch.favorite === true) ||
                                (Array.isArray(ch.group) && ch.group.includes(sSelectedGroup));
              const inSearch = !searchTerm || ch.name.toLowerCase().includes(searchTerm);
              return inGroup && inSearch;
            })
            .sort((a, b) => (channels[a]?.number ?? Infinity) - (channels[b]?.number ?? Infinity));
      } catch (error) {
          console.error("Error filtering/sorting channels:", error);
          aFilteredChannelKeys = [];
      }

      o.ChannelList.innerHTML = '';
      o.ChannelList.scrollTop = 0;

      if (aFilteredChannelKeys.length === 0) {
        const msg = sSelectedGroup === '__fav'
            ? 'No favorite channels found. Add channels using the settings menu (→).'
            : 'No channels found in this category.';
        o.ChannelList.innerHTML = `<li style="justify-content:center; color:#888; padding:12px; height: auto; line-height: normal; white-space: normal; text-align: center;">${msg}</li>`;
        return;
      }

      const frag = document.createDocumentFragment();
      aFilteredChannelKeys.forEach((key, index) => {
        const ch = channels[key];
        if (!ch) return;

        const item = document.createElement('li');
        item.className = 'channel-item';
        item.setAttribute('tabindex', '0');
        item.onclick = () => {
          if (isSessionActive) {
            loadChannel(index);
          } else {
            iCurrentChannel = index; 
            updateSelectedChannelInNav();
          }
          setTimeout(hideNav, 50);
        };

        const fav = ch.favorite ? `<span class="fav-star">⭐</span>` : '';
       
        // Logo Fix
        const logoHtml = ch.logo
            ? `<div class="nav_logo"><img src="${ch.logo}" alt="" onerror="this.style.display='none'; this.onerror=null;"></div>`
            : '<div class="nav_logo" style="width: 50px;"></div>';

        const safeName = (ch.name || 'Unknown Channel').replace(/</g, '&lt;');

        item.innerHTML = `${fav}<span class="list-ch">${ch.number || '?'}</span><span class="list-title">${safeName}</span>${logoHtml}`;
        frag.appendChild(item);
      });

      o.ChannelList.appendChild(frag);
      updateSelectedChannelInNav();
    }


    function updateSelectedChannelInNav() {
      if (!o.ChannelList) return;
      try {
          // --- FIX: Clear both selected and playing classes ---
          const currentSelected = o.ChannelList.querySelector('.selected');
          if (currentSelected) currentSelected.classList.remove('selected');
          const currentPlaying = o.ChannelList.querySelector('.playing');
          if (currentPlaying) currentPlaying.classList.remove('playing');
          // --- END FIX ---

          const channelItems = o.ChannelList.querySelectorAll('li.channel-item');

          // --- ADD THIS BLOCK: Add .playing class ---
          if (iPlayingChannelIndex >= 0 && iPlayingChannelIndex < channelItems.length) {
              const playingItem = channelItems[iPlayingChannelIndex];
              if (playingItem) {
                  playingItem.classList.add('playing');
              }
          }
          // --- END ADD ---

          if (iCurrentChannel >= 0 && iCurrentChannel < channelItems.length) { 
              const newItem = channelItems[iCurrentChannel]; 
              if (newItem) {
                newItem.classList.add('selected');
                if (bNavOpened && typeof newItem.scrollIntoView === 'function') {
                    newItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }
          } else if (aFilteredChannelKeys.length > 0 && channelItems.length > 0) {
              iCurrentChannel = 0; 
              const firstItem = channelItems[0];
              if (firstItem) firstItem.classList.add('selected');
          } else {
            iCurrentChannel = 0; 
          }

      } catch (error) { console.error("Error updating selected channel in nav:", error); }
    }


    function updateSelectedGroupInNav() {
        if (!o.GroupList) return;
        try {
            const currentSelected = o.GroupList.querySelector('.selected');
            if (currentSelected) currentSelected.classList.remove('selected');

            const allLis = o.GroupList.querySelectorAll('li');
            if (iGroupListIndex >= 0 && iGroupListIndex < allLis.length) {
                const newItem = allLis[iGroupListIndex];
                if (newItem) {
                    newItem.classList.add('selected');
                    if (bGroupsOpened && typeof newItem.scrollIntoView === 'function') {
                        newItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            } else {
                console.warn("Cannot update selected group, invalid iGroupListIndex:", iGroupListIndex);
            }
        } catch (error) { console.error("Error updating selected group in nav:", error); }
    }

    /* -------------------------
        Settings & Modals
        ------------------------- */
    function renderChannelSettings() {
      // --- FIX: Show settings for PLAYING channel ---
      if (!aFilteredChannelKeys || iPlayingChannelIndex >= aFilteredChannelKeys.length || iPlayingChannelIndex < 0) return; 
      const currentChannelKey = aFilteredChannelKeys[iPlayingChannelIndex]; 
      const currentChannel = channels[currentChannelKey];
      if (!currentChannel) return;

      if (o.SettingsMainMenu) {
          // --- FIX: Restored onclick to showVideoFormatMenu() ---
          o.SettingsMainMenu.innerHTML = `
            <div class="settings-item" onclick="showSettingsModal('subtitles')">Subtitle / Audio</div>
            <div class="settings-item" onclick="showVideoFormatMenu()">Video / Format</div>
            <div class="settings-item" onclick="toggleFavourite()">${currentChannel.favorite ? 'Remove from Favorites' : 'Add to Favorites'}</div>
            <div class="settings-item" onclick="showSettingsModal('edit')">Edit Channel Info</div>
          `;
          updateSettingsSelection(o.SettingsMainMenu, iChannelSettingsIndex);
      } else { console.error("SettingsMainMenu element not found"); }
    }

    // --- FIX: Restored showVideoFormatMenu() ---
    function showVideoFormatMenu() {
      if (o.SettingsContainer) {
        o.SettingsContainer.classList.add('submenu-visible');
        iVideoSettingsIndex = 0;
        renderVideoFormatMenu();
      } else { console.error("SettingsContainer element not found."); }
    }

    // --- FIX: Restored hideVideoFormatMenu() ---
    function hideVideoFormatMenu() {
      if (o.SettingsContainer) {
          o.SettingsContainer.classList.remove('submenu-visible');
          iChannelSettingsIndex = 1; // Focus 'Video / Format' (index 1)
          if (o.SettingsMainMenu) {
              updateSettingsSelection(o.SettingsMainMenu, iChannelSettingsIndex);
          } else { console.error("SettingsMainMenu element not found for focus update."); }
      } else { console.error("SettingsContainer element not found."); }
    }

    // --- FIX: Restored renderVideoFormatMenu() ---
    function renderVideoFormatMenu() {
      if (o.SettingsVideoFormatMenu) {
          // --- FIX: Changed <select> to a button div ---
          const currentFormat = getAspectRatio();
          o.SettingsVideoFormatMenu.innerHTML = `
            <div class="settings-item" onclick="hideVideoFormatMenu()">&#8592; Back</div>
            <div class="settings-item-header">Video Format</div>
            <div class="settings-item" onclick="showSettingsModal('aspect_ratio')">
              <span>Aspect Ratio</span>
              <span style="color: var(--text-secondary);">${currentFormat}</span>
            </div>
            <div class="settings-item" onclick="showSettingsModal('quality')">Video Quality</div>
          `;
          updateSettingsSelection(o.SettingsVideoFormatMenu, iVideoSettingsIndex);
      } else { console.error("SettingsVideoFormatMenu element not found."); }
    }

    function getAspectRatio() {
        if (!o.AvPlayer) return 'Original';
        const style = o.AvPlayer.style;
        if (style.objectFit === 'fill') return 'Stretch';
        if (style.objectFit === 'cover' && style.transform === 'scale(1.15)') return 'Zoom';
        if (style.objectFit === 'cover') return 'Fill';
        return localStorage.getItem('iptvAspectRatio') || 'Original';
    }

    function setAspectRatio(format) {
      if (!o.AvPlayer) return;
      o.AvPlayer.style.transform = 'scale(1)';
      let formatName = 'Original';
      switch(format) {
        case 'stretch':
          o.AvPlayer.style.objectFit = 'fill';
          formatName = 'Stretch';
          break;
        case '16:9':
          o.AvPlayer.style.objectFit = 'contain';
          formatName = '16:9';
          break;
        case 'fill':
          o.AvPlayer.style.objectFit = 'cover';
          formatName = 'Fill';
          break;
        case 'zoom':
          o.AvPlayer.style.objectFit = 'cover';
          o.AvPlayer.style.transform = 'scale(1.15)';
          formatName = 'Zoom';
          break;
        default:
          o.AvPlayer.style.objectFit = 'contain';
          formatName = 'Original';
      }
      localStorage.setItem('iptvAspectRatio', formatName);
      
      // --- FIX: Close modal and re-render submenu ---
      hideSettingsModal();
      renderVideoFormatMenu(); // Re-render submenu to show new value
    }

    function togglePlaybackControls() {
        hideChannelSettings();
    }

    function showSettingsModal(type) {
      if (!o.SettingsModal || !o.SettingsModalContent || !o.BlurOverlay) {
          console.error("Required modal elements not found.");
          return;
      }
      clearUi('settingsModal');
      o.BlurOverlay.classList.add('visible');
      bSettingsModalOpened = true;
      iSettingsModalIndex = 0;
      try {
          o.SettingsModalContent.innerHTML = renderModalContent(type);
      } catch (error) {
          console.error("Error rendering modal content:", error);
          o.SettingsModalContent.innerHTML = '<p>Error loading content.</p>';
      }
      o.SettingsModal.classList.remove('HIDDEN');
     
      // Force focus and select the first item for keyboard control
      setTimeout(() => updateSettingsModalSelection(), 50); 
    }

    window.hideSettingsModal = () => {
      bSettingsModalOpened = false;
      iSettingsModalIndex = 0;
      if (o.SettingsModal) o.SettingsModal.classList.add('HIDDEN');
      if (o.BlurOverlay) o.BlurOverlay.classList.remove('visible');
    };

    // --- PATCH: NEW function to apply quality and close modal ---
    function setQuality(selected) {
      if (!player) return hideSettingsModal();
      
      try {
        if (selected === 'auto') {
          player.configure({ abr: { enabled: true } });
        } else {
          player.configure({ abr: { enabled: false } });
          const trackToSelect = (player.getVariantTracks() || []).find(t => t.id == selected);
          if (trackToSelect) { player.selectVariantTrack(trackToSelect, true); }
          else { console.warn("Selected quality track not found:", selected); player.configure({ abr: { enabled: true } }); }
        }
      } catch(error) { console.error("Error applying quality setting:", error); try { player.configure({ abr: { enabled: true } }); } catch {} }
      
      hideSettingsModal(); // Close modal immediately
    }
    // --- END PATCH ---

    function renderModalContent(type) {
      let contentHtml = '';
      try {
          if (!player) return '<p>Player not initialized.</p>';

          // --- ADD THIS NEW BLOCK ---
          if (type === 'aspect_ratio') {
              const currentFormat = getAspectRatio();
              let itemsHtml = `
                <li class="modal-selectable" data-action="aspect" onclick="setAspectRatio('original')">
                    Original ${currentFormat === 'Original' ? '<span style="color: var(--bg-focus)">✓</span>' : ''}
                </li>
                <li class="modal-selectable" data-action="aspect" onclick="setAspectRatio('16:9')">
                    16:9 ${currentFormat === '16:9' ? '<span style="color: var(--bg-focus)">✓</span>' : ''}
                </li>
                <li class="modal-selectable" data-action="aspect" onclick="setAspectRatio('fill')">
                    Fill ${currentFormat === 'Fill' ? '<span style="color: var(--bg-focus)">✓</span>' : ''}
                </li>
                <li class="modal-selectable" data-action="aspect" onclick="setAspectRatio('stretch')">
                    Stretch ${currentFormat === 'Stretch' ? '<span style="color: var(--bg-focus)">✓</span>' : ''}
                </li>
                <li class="modal-selectable" data-action="aspect" onclick="setAspectRatio('zoom')">
                    Zoom ${currentFormat === 'Zoom' ? '<span style="color: var(--bg-focus)">✓</span>' : ''}
                </li>
              `;
              
              contentHtml = `<h2>Aspect Ratio</h2>
                           <ul class="popup-content-list">${itemsHtml}</ul>
                           <div class="popup-buttons">
                             <button class="modal-selectable" data-action="close" onclick="hideSettingsModal()">CLOSE</button>
                           </div>`;
          
          } else 
          // --- END OF NEW BLOCK ---
          
          if (type === 'quality') {
            const tracks = [...new Map((player.getVariantTracks() || []).filter(t => t.height).map(t => [t.height, t])).values()].sort((a,b)=>b.height-a.height);
            
            let itemsHtml = `<li class="modal-selectable" data-action="quality" data-value="auto" onclick="setQuality('auto')">Auto <input type="radio" name="quality" value="auto" ${player.getConfiguration()?.abr?.enabled ? 'checked' : ''}></li>`;
            tracks.forEach(track => {
              const bps = track.bandwidth > 1000000 ? `${(track.bandwidth/1e6).toFixed(2)} Mbps` : `${Math.round(track.bandwidth/1e3)} Kbps`;
              const isChecked = track.active && !player.getConfiguration()?.abr?.enabled;
              itemsHtml += `<li class="modal-selectable" data-action="quality" data-value='${track.id}' onclick="setQuality('${track.id}')">${track.height}p, ${bps} <input type="radio" name="quality" value='${track.id}' ${isChecked ? 'checked' : ''}></li>`;
            });
            
            contentHtml = `<h2>Video Quality</h2><ul class="popup-content-list">${itemsHtml}</ul><div class="popup-buttons"><button class="modal-selectable" data-action="close" onclick="hideSettingsModal()">CLOSE</button></div>`;

          } else if (type === 'subtitles') {
            const textTracks = player.getTextTracks() || [];
            const audioTracks = player.getAudioLanguagesAndRoles() || [];
            let subItemsHtml = `<li class="modal-selectable" data-action="subtitle_off">Off</li>`;
            textTracks.forEach(track => {
              const safeTrackData = { id: track.id, label: track.label, language: track.language };
              const safeTrack = JSON.stringify(safeTrackData).replace(/</g, '\\u003c');
              subItemsHtml += `<li class="modal-selectable" data-action="subtitle_on" data-track='${safeTrack}'>${track.label || track.language}</li>`;
            });
            let audioItemsHtml = audioTracks.map(track => `<li class="modal-selectable" data-action="audio" data-lang="${track.language}">${track.language} (Audio)</li>`).join('');
            contentHtml = `<h2>Subtitles & Audio</h2><ul class="popup-content-list">${subItemsHtml}${audioItemsHtml}</ul><div class="popup-buttons"><button class="modal-selectable" data-action="close" onclick="hideSettingsModal()">CLOSE</button></div>`;

          } else if (type === 'edit') {
            // --- FIX: Show info for PLAYING channel ---
            if (!aFilteredChannelKeys || iPlayingChannelIndex >= aFilteredChannelKeys.length || iPlayingChannelIndex < 0) return '<p>No channel selected.</p>'; 
            const currentChannel = channels[aFilteredChannelKeys[iPlayingChannelIndex]]; 
            if (!currentChannel) return '<p>Channel data missing.</p>';
            const safeName = (currentChannel.name || '').replace(/"/g, '&quot;');
            const safeLogo = (currentChannel.logo || '').replace(/"/g, '&quot;');
            
            contentHtml = `<h2>Edit Channel</h2><div style="padding: 15px 25px;">
              <label>Name</label><br><input type="text" id="edit_ch_name" class="edit-modal-field modal-selectable" value="${safeName}"><br>
              <label>Logo URL</label><br><input type="text" id="edit_ch_logo" class="edit-modal-field modal-selectable" value="${safeLogo}">
            </div><div class="popup-buttons"><button class="modal-selectable" data-action="cancel" onclick="hideSettingsModal()">CANCEL</button><button class="modal-selectable" data-action="save" onclick="applyChannelEdit()">SAVE</button></div>`;
          }
      } catch (error) {
          console.error("Error generating modal content:", error);
          contentHtml = "<p>Error displaying options.</p>";
      }
      return contentHtml;
    }

    window.applyChannelEdit = () => {
      const nameInput = getEl('edit_ch_name');
      const logoInput = getEl('edit_ch_logo');
      if (!nameInput || !logoInput) {
          console.error("Edit modal inputs not found.");
          return hideSettingsModal();
      }
      // --- FIX: Edit info for PLAYING channel ---
      if (!aFilteredChannelKeys || iPlayingChannelIndex >= aFilteredChannelKeys.length || iPlayingChannelIndex < 0) return hideSettingsModal(); 
      const key = aFilteredChannelKeys[iPlayingChannelIndex]; 
      if (!channels[key]) return hideSettingsModal();

      channels[key].name = nameInput.value;
      channels[key].logo = logoInput.value;
      buildNav();
      hideSettingsModal();
    };

    window.setSubtitles = (track, isVisible) => {
        if (!player) return hideSettingsModal();
        try {
            player.setTextTrackVisibility(isVisible);
            if (isVisible && track && typeof track.id !== 'undefined') {
                const trackToSelect = (player.getTextTracks() || []).find(t => t.id === track.id);
                if (trackToSelect) { player.selectTextTrack(trackToSelect); }
                else { console.warn("Subtitle track not found:", track.id); }
            }
        } catch(error) { console.error("Error setting subtitles:", error); }
        hideSettingsModal();
    };

    window.setAudio = lang => {
        if (!player) return hideSettingsModal();
        if (typeof lang === 'string' && lang) {
            try { player.selectAudioLanguage(lang); }
            catch(error) { console.error("Error setting audio language:", error); }
        } else { console.warn("Invalid audio language provided:", lang); }
        hideSettingsModal();
    };

    function toggleFavourite() {
      // --- FIX: Toggle fav for PLAYING channel ---
      if (!aFilteredChannelKeys || iPlayingChannelIndex >= aFilteredChannelKeys.length || iPlayingChannelIndex < 0) return; 
      const key = aFilteredChannelKeys[iPlayingChannelIndex]; 
      if (!channels[key]) return;

      channels[key].favorite = !channels[key].favorite;
      saveFavoritesToStorage();

      if (bChannelSettingsOpened) {
          renderChannelSettings();
      }

      if (bNavOpened || sSelectedGroup === '__fav') {
          buildNav();
          updateSelectedChannelInNav();
      }
    }


    /* -------------------------
        UI State & Helpers
        ------------------------- */
    function showTempChannelSwitchMessage(logoUrl, name, number) {
        if (!o.TempMessageOverlay) return;
        clearTimeout(tempMessageTimeout);

        const safeLogoUrl = (logoUrl || 'https://via.placeholder.com/80x80?text=No+Logo').replace(/"/g, '&quot;');
        const safeName = (name || 'Unknown Channel').replace(/</g, '&lt;');
        const safeNumber = number || '?';
       
        o.TempMessageOverlay.innerHTML = `
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="width: 80px; height: 80px; flex-shrink: 0;">
                    <img src="${safeLogoUrl}" alt="${safeName} logo" style="width: 100%; height: 100%; object-fit: contain;">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <span style="font-size: 1.5em; font-weight: bold;">${safeName} <span style="font-weight: normal; font-size: 0.8em; color: var(--text-secondary);">${safeNumber}</span></span>
                    <span style="font-size: 1em; opacity: 0.8; color: var(--text-secondary);">Loading...</span>
                </div>
            </div>
        `;
       
        o.TempMessageOverlay.classList.remove('HIDDEN');
        o.TempMessageOverlay.classList.add('visible');

        tempMessageTimeout = setTimeout(() => {
            o.TempMessageOverlay.classList.remove('visible');
            setTimeout(() => o.TempMessageOverlay.classList.add('HIDDEN'), 300);
        }, 3000);
    }


    function showTempMessage(message) {
        if (!o.TempMessageOverlay) return;
        clearTimeout(tempMessageTimeout);
        o.TempMessageOverlay.innerHTML = `<p>${message}</p>`; 
        o.TempMessageOverlay.classList.remove('HIDDEN');
        o.TempMessageOverlay.classList.add('visible');

        tempMessageTimeout = setTimeout(() => {
            o.TempMessageOverlay.classList.remove('visible');
            setTimeout(() => o.TempMessageOverlay.classList.add('HIDDEN'), 300);
        }, 3000);
    }

    function showIdleAnimation(showPlayButton = false) {
      if (o.IdleAnimation) o.IdleAnimation.classList.remove('HIDDEN');
      if (o.PlayButton) {
          if (showPlayButton && !isSessionActive) {
              o.PlayButton.classList.remove('HIDDEN');
          } else {
              o.PlayButton.classList.add('HIDDEN');
          }
      }
    }

    function hideIdleAnimation() {
        if (o.IdleAnimation) o.IdleAnimation.classList.add('HIDDEN');
    }


    function clearUi(exclude) {
      if (exclude !== 'nav' && exclude !== 'epg' && exclude !== 'guide') hideNav();
      if (exclude !== 'channelSettings' && exclude !== 'settingsModal') hideChannelSettings();
      if (exclude !== 'guide') window.hideGuide();
      if (exclude !== 'channelName') hideChannelName();
      if (exclude !== 'settingsModal') window.hideSettingsModal();
      if (exclude !== 'epg') hideEpg();
     
      if (o.TempMessageOverlay && !o.TempMessageOverlay.classList.contains('HIDDEN')) {
          clearTimeout(tempMessageTimeout);
          o.TempMessageOverlay.classList.remove('visible');
          o.TempMessageOverlay.classList.add('HIDDEN');
      }
    }

    // Left Panel - Main Channel List
    function showNav() {
      if (!o.Nav) return;
      bNavOpened = true;
      o.Nav.classList.add('visible');
     
      // Assuming HTML order: [ChannelList] [GroupList]
      if (o.ListContainer) {
          o.ListContainer.classList.remove('groups-opened');
          bGroupsOpened = false;
      }
      updateSelectedChannelInNav();
    }

    function hideNav() {
      if (!o.Nav) return;
      bNavOpened = false;
      bGroupsOpened = false;
      o.Nav.classList.remove('visible');
    }

    // Left Panel - Drill Down to Groups
    function showGroups() {
      if (bNavOpened && o.ListContainer) {
        bGroupsOpened = true;
        // Assuming HTML order: [ChannelList] [GroupList]
        // To show GroupList (Element 2), we shift the container LEFT by 50%
        o.ListContainer.classList.add('groups-opened'); 
        updateSelectedGroupInNav();
      }
    }

    function hideGroups() {
      bGroupsOpened = false;
      if (o.ListContainer) {
          // Assuming HTML order: [ChannelList] [GroupList]
          // To show ChannelList (Element 1), we shift the container RIGHT back to 0%
          o.ListContainer.classList.remove('groups-opened'); 
      }
    }


    function showChannelSettings() {
      if (!o.ChannelSettings) return;

      clearUi('channelSettings');
      // --- FIX: Restored call to hideVideoFormatMenu ---
      hideVideoFormatMenu(); 
      iChannelSettingsIndex = 0;
      renderChannelSettings();
      bChannelSettingsOpened = true;
      o.ChannelSettings.classList.add('visible');
    }

    function hideChannelSettings() {
      if (!o.ChannelSettings) return;

      bChannelSettingsOpened = false;
      o.ChannelSettings.classList.remove('visible');
    }

    window.showGuide = () => {
      if (!o.Guide || !o.GuideContent || !o.BlurOverlay) return;
      clearUi('guide');
      o.BlurOverlay.classList.add('visible');
      renderGuideContent();
      bGuideOpened = true;
      o.Guide.classList.remove('HIDDEN');
    };
    window.hideGuide = () => {
      bGuideOpened = false;
      if (o.Guide) o.Guide.classList.add('HIDDEN');
      if (o.BlurOverlay) o.BlurOverlay.classList.remove('visible');
    };

    function renderGuideContent() {
      if (!o.GuideContent) return;
      o.GuideContent.innerHTML = `
        <h2>Controls</h2>
        <ul style="list-style: none; padding: 0; font-size: clamp(16px, 2.5vw, 22px); line-height: 1.8;">
          <li><kbd>M</kbd> - Settings</li>
          <li><kbd>E</kbd> - EPG</li>
          <li><kbd>H</kbd> - User Manual (Guide)</li>
          <li><kbd>↑</kbd>/<kbd>↓</kbd> - Change channel</li>
          <li><kbd>←</kbd> - Drill Down (Open Panel/Groups)</li>
          <li><kbd>→</kbd> - Go Back / Close Panel</li>
          <li><kbd>OK</kbd>/<kbd>Enter</kbd> - Show Channel Info / Select Item</li>
          <li><kbd>ESC</kbd> - Close All</li>
          <li><kbd>Double Tap/Click</kbd> - Toggle Fullscreen</li>
        </ul>
      `;
    }


    /* -------------------------
        EPG
        ------------------------- */
    function showEpg() {
      if (!o.EpgOverlay || !o.EpgChannels || !o.EpgTimeline) return;
      clearUi('epg');

      aEpgFilteredChannelKeys = Object.keys(channels)
          .sort((a, b) => (channels[a]?.number ?? Infinity) - (channels[b]?.number ?? Infinity));

      const currentKey = aEpgFilteredChannelKeys[iCurrentChannel]; 
      iEpgChannelIndex = aEpgFilteredChannelKeys.indexOf(currentKey);
      if (iEpgChannelIndex === -1) {
          const currentChannelData = channels[aEpgFilteredChannelKeys[iCurrentChannel]]; 
          if (currentChannelData) {
              iEpgChannelIndex = aEpgFilteredChannelKeys.findIndex(key => channels[key]?.number === currentChannelData.number);
          }
          if (iEpgChannelIndex === -1) iEpgChannelIndex = 0;
      }

      renderEpg();
      bEpgOpened = true;
      o.EpgOverlay.classList.remove('HIDDEN');
    }
    function hideEpg() {
        bEpgOpened = false;
        if (o.EpgOverlay) o.EpgOverlay.classList.add('HIDDEN');
    }

    function renderEpg() {
      if (!o.EpgChannels || !o.EpgTimeline) return;

      let channelsHtml = '';
      aEpgFilteredChannelKeys.forEach((key, index) => {
        const ch = channels[key];
        if (!ch) return;
        const selectedClass = index === iEpgChannelIndex ? 'selected' : '';
        const safeName = (ch.name || 'Unknown').replace(/</g, '&lt;');
        channelsHtml += `<div class="epg-ch-item ${selectedClass}">${ch.number || '?'}. ${safeName}</div>`;
      });
      o.EpgChannels.innerHTML = channelsHtml;

      o.EpgTimeline.innerHTML = generateDummyEpg();

      try {
          const selectedItem = o.EpgChannels.querySelector('.selected');
          if (selectedItem && typeof selectedItem.scrollIntoView === 'function') {
              selectedItem.scrollIntoView({ behavior:'smooth', block:'center' });
          }
      } catch (error) { console.error("Error scrolling EPG channel:", error); }
    }

    function generateDummyEpg() {
      return `
        <div class="epg-pr-item"><div class="epg-pr-time">Now Playing</div><div class="epg-pr-title">Current Program Title (Placeholder)</div></div>
        <div class="epg-pr-item"><div class="epg-pr-time">Up Next</div><div class="epg-pr-title">Next Program Title (Placeholder)</div></div>
        <div class="epg-pr-item"><div class="epg-pr-time">Later</div><div class="epg-pr-title">Future Program Title (Placeholder)</div></div>
      `;
    }


    /* -------------------------
        Channel name display
        ------------------------- */
    function showChannelName() {
      clearTimeout(channelNameTimeout);
      if (!o.ChannelInfo || !o.ChannelInfoName || !o.ChannelInfoEpg || !o.ChannelInfoLogo) return;
      
      // --- FIX: Use iPlayingChannelIndex ---
      if (!aFilteredChannelKeys || iPlayingChannelIndex >= aFilteredChannelKeys.length || iPlayingChannelIndex < 0) return; 
      const chKey = aFilteredChannelKeys[iPlayingChannelIndex]; 
      // --- END FIX ---
      
      const ch = channels[chKey];
      if (!ch) return;

      o.ChannelInfoName.textContent = ch.name || 'Unknown Channel';
      o.ChannelInfoEpg.textContent = 'EPG not available';
      o.ChannelInfoLogo.innerHTML = ch.logo ? `<img src="${ch.logo}" alt="${ch.name || 'logo'}" onerror="this.style.display='none'">` : '';

      o.ChannelInfo.classList.add('visible');
      channelNameTimeout = setTimeout(hideChannelName, 5000);
    }

    function hideChannelName() {
        if (o.ChannelInfo) o.ChannelInfo.classList.remove('visible');
    }


    /* -------------------------
        Favorites storage
        ------------------------- */
    function loadFavoritesFromStorage() {
      try {
        const favs = JSON.parse(localStorage.getItem("iptvFavoriteChannels") || "[]");
        if (Array.isArray(favs)) {
            Object.keys(channels).forEach(key => {
                if (channels[key]) { channels[key].favorite = favs.includes(key); }
            });
        } else { console.warn("Favorites data from localStorage is not an array."); }
      } catch(e) { console.error("Error loading favorites:", e); }
    }

    function saveFavoritesToStorage() {
      try {
        const favs = Object.entries(channels)
                             .filter(([,ch]) => ch && ch.favorite)
                             .map(([key]) => key);
        localStorage.setItem("iptvFavoriteChannels", JSON.stringify(favs));
      } catch(e) { console.error("Error saving favorites:", e); }
    }


    /* -------------------------
        First Play handling
        ------------------------- */
    function handleFirstPlay() {
      if (isSessionActive) return;
      isSessionActive = true;

      hideIdleAnimation();

      // --- FIX: Set playing index on first play ---
      iPlayingChannelIndex = iCurrentChannel;

      if(aFilteredChannelKeys.length > 0 && iCurrentChannel >= 0 && iCurrentChannel < aFilteredChannelKeys.length){ 
          loadChannel(iCurrentChannel); 
      } else {
          console.error("No valid channel selected on first play.");
          showIdleAnimation(true);
          isSessionActive = false;
          return;
      }
    }


    /* -------------------------
        Settings selection helper
        ------------------------- */
    function updateSettingsSelection(container, index) {
      if (!container || typeof container.querySelector !== 'function') return;
      try {
          const currentSelected = container.querySelector('.selected');
          if (currentSelected) currentSelected.classList.remove('selected');

          const items = container.querySelectorAll('.settings-item');
          if (items && index >= 0 && index < items.length) {
            const item = items[index];
            if (item) {
                item.classList.add('selected');
                if (typeof item.scrollIntoView === 'function') {
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
          } else { console.warn("Invalid index or no items for settings selection:", index); }
      } catch (error) { console.error("Error updating settings selection:", error); }
    }

    function updateSettingsModalSelection() {
        if (!o.SettingsModalContent) return;
        try {
            const currentSelected = o.SettingsModalContent.querySelector('.selected');
            if (currentSelected) currentSelected.classList.remove('selected');

            // Use a broader selector to include <li>, <input>, and <button>
            const items = o.SettingsModalContent.querySelectorAll('.modal-selectable');
            const itemsCount = items.length;
           
            if (items && iSettingsModalIndex >= 0 && iSettingsModalIndex < itemsCount) {
                const item = items[iSettingsModalIndex];
                if (item) {
                    item.classList.add('selected');
                    // Auto-check the radio button when selecting the list item
                    const radio = item.querySelector('input[type="radio"]');
                    if (radio) radio.checked = true;

                    if (typeof item.scrollIntoView === 'function') {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            } else {
                 // Handle wrapping around 
                 if (iSettingsModalIndex < 0) iSettingsModalIndex = 0;
                 else if (iSettingsModalIndex >= itemsCount) iSettingsModalIndex = itemsCount - 1;
                 
                 // Re-call selection if index was corrected
                 if (itemsCount > 0) updateSettingsModalSelection();
                 else console.warn("Invalid index or no items for modal selection:", iSettingsModalIndex);
            }
        } catch (error) {
            console.error("Error updating settings modal selection:", error);
        }
    }

    function toggleFullScreen() {
        const elem = document.documentElement;

        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(err => console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`));
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else {
                console.warn("Fullscreen API is not supported by this browser.");
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(err => console.error(`Error attempting to disable full-screen mode: ${err.message} (${err.name})`));
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }


    /* -------------------------
        Event Listeners
        ------------------------- */
    if (o.PlayButton) {
        o.PlayButton.addEventListener('mousedown', handleFirstPlay);
    } else { console.error("PlayButton element not found."); }

    if (o.SearchField) {
        o.SearchField.addEventListener('input', () => {
          buildNav();
          if (aFilteredChannelKeys.length > 0) {
            iCurrentChannel = 0; 
            if (isSessionActive) { loadChannel(0); }
            updateSelectedChannelInNav();
          } else {
            try { player?.unload(); } catch {}
            showIdleAnimation(true);
          }
        });
    } else { console.error("SearchField element not found."); }

    // --- START: TV REMOTE KEYDOWN LOGIC (FINAL STABLE VERSION WITH CORRECTED NAV/GROUP ARROW LOGIC) ---
    document.addEventListener('keydown', (e) => {

      // --- PATCH: Added edit_ch_name and edit_ch_logo to the activeElement check ---
      if (document.activeElement === o.SearchField ||
          document.activeElement === getEl('edit_ch_name') ||
          document.activeElement === getEl('edit_ch_logo') ||
          document.activeElement.tagName === 'SELECT' // Ignore keys if dropdown is open
          ) { 
          
          if (e.key === 'Escape') {
              e.preventDefault();
              if (document.activeElement) document.activeElement.blur();
          } else if (e.key === 'Enter') {
              e.preventDefault();
              if (document.activeElement) document.activeElement.blur();
          }
          // Allow all other keys (like typing)
          return;
      }

      // Check for Modals/Overlays FIRST
      if (bGuideOpened || bEpgOpened) {
          e.preventDefault();
          if (e.key === 'Escape') clearUi();
          return;
      }

      // --- MODAL NAVIGATION FIX ---
      if (bSettingsModalOpened) {
          e.preventDefault();
          const items = o.SettingsModalContent.querySelectorAll('.modal-selectable');
          const itemsCount = items.length;

          if (itemsCount === 0) {
              if (e.key === 'Escape') window.hideSettingsModal();
              return;
          }

          if (e.key === 'ArrowUp') {
              iSettingsModalIndex = Math.max(0, iSettingsModalIndex - 1);
              updateSettingsModalSelection();
          } else if (e.key === 'ArrowDown') {
              iSettingsModalIndex = Math.min(itemsCount - 1, iSettingsModalIndex + 1);
              updateSettingsModalSelection();
          } else if (e.key === 'Enter') { 
              const selectedItem = items[iSettingsModalIndex];
              if (!selectedItem) return;
             
              if (selectedItem.tagName === 'INPUT') {
                  selectedItem.focus(); // Focus the input field
              }
              // --- FIX: Handle clicks on LI elements (for subtitles, etc.) ---
              else if (selectedItem.tagName === 'LI') {
                  selectedItem.click(); // Trigger the onclick
              } else if (selectedItem.tagName === 'BUTTON') {
                  selectedItem.click(); // Trigger button action
              }
          } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
              window.hideSettingsModal();
          }
          // --- FIX: Left/Right arrows do nothing else in modals ---
          return;
      }
      // --- END MODAL NAVIGATION FIX ---
     
      // Logic inside NAV PANEL (Left)
      if (bNavOpened) {
        e.preventDefault();
        if (bGroupsOpened) {
          // --- PATCH START: Updated Group List keyboard logic ---
          const groupItems = o.GroupList?.querySelectorAll('li') ?? [];
          const selectedItem = groupItems[iGroupListIndex];

          if (e.key === 'ArrowUp') {
              iGroupListIndex = Math.max(0, iGroupListIndex - 1);
          } else if (e.key === 'ArrowDown') {
              iGroupListIndex = Math.min(groupItems.length - 1, iGroupListIndex + 1);
          } else if (e.key === 'Enter') { 
              // --- FIX: 'Enter' is the only key that selects ---
              selectedItem?.click(); 
          } else if (e.key === 'ArrowRight' || e.key === 'Escape') { // 'Right' is GO BACK
              hideGroups(); // Groups -> Channels
          } else if (e.key === 'ArrowLeft') { // 'Left' is DRILL DOWN
              // --- FIX: Does nothing, as requested ---
          }
          updateSelectedGroupInNav();
          // --- PATCH END ---

        } else { 
          // CHANNEL LIST (Currently visible)
          const channelItems = o.ChannelList.querySelectorAll('li.channel-item');
          const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'Enter', 'ArrowRight', 'Escape', 'ArrowLeft'];
          if (!ARROW_KEYS.includes(e.key)) return;
         
          if (e.key === 'ArrowUp') {
              if (iCurrentChannel === 0 && o.SearchField) { 
                  o.SearchField.focus();
                  if (channelItems[iCurrentChannel]) { // Add check
                    channelItems[iCurrentChannel].classList.remove('selected');
                  }
              } else if (iCurrentChannel > 0) { 
                  iCurrentChannel = (iCurrentChannel - 1 + aFilteredChannelKeys.length) % aFilteredChannelKeys.length; 
              }
          } else if (e.key === 'ArrowDown') {
              if (document.activeElement === o.SearchField) {
                  o.SearchField.blur();
                  iCurrentChannel = 0;
              } else if (aFilteredChannelKeys.length > 0) { 
                  iCurrentChannel = (iCurrentChannel + 1) % aFilteredChannelKeys.length; 
              }
          } else if (e.key === 'Enter') {
              if (iCurrentChannel !== -1 && aFilteredChannelKeys.length > 0) { 
                  loadChannel(iCurrentChannel); 
                  hideNav();
              }
          } else if (e.key === 'ArrowLeft') { // 'Left' is DRILL DOWN
              showGroups(); // Channel List -> Groups
          } else if (e.key === 'ArrowRight' || e.key === 'Escape') { // 'Right' is GO BACK
              hideNav(); // Close the entire panel
          }
          updateSelectedChannelInNav();
        }
        return;
      }
     
      // Logic inside CHANNEL SETTINGS PANEL (Right)
      if (bChannelSettingsOpened) {
        e.preventDefault();
        // --- FIX: Restored isSubmenu logic ---
        const isSubmenu = o.SettingsContainer?.classList.contains('submenu-visible');
        const ARROW_KEYS = ['Escape', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Enter', 'ArrowRight'];
        
        if (!ARROW_KEYS.includes(e.key)) return;

        if (isSubmenu) {
            // --- PATCH START: Submenu logic fixed ---
            const submenuItems = o.SettingsVideoFormatMenu?.querySelectorAll('.settings-item') ?? [];
            if (e.key === 'ArrowUp') {
                iVideoSettingsIndex = Math.max(0, iVideoSettingsIndex - 1);
            } else if (e.key === 'ArrowDown') {
                iVideoSettingsIndex = Math.min(submenuItems.length - 1, iVideoSettingsIndex + 1);
            } else if (e.key === 'Enter') { // 'Enter' is for selection
                submenuItems[iVideoSettingsIndex]?.click();
            } else if (e.key === 'ArrowLeft' || e.key === 'Escape') { // 'Left' is GO BACK
                hideVideoFormatMenu(); // Slide back to Main Settings Menu
            }
            // 'ArrowRight' does nothing here
            updateSettingsSelection(o.SettingsVideoFormatMenu, iVideoSettingsIndex);
            // --- PATCH END ---
        } else { 
            // --- PATCH START: Main Settings Menu logic fixed ---
            const mainItems = o.SettingsMainMenu?.querySelectorAll('.settings-item') ?? [];
            if (e.key === 'ArrowUp') {
                iChannelSettingsIndex = Math.max(0, iChannelSettingsIndex - 1);
            } else if (e.key === 'ArrowDown') {
                iChannelSettingsIndex = Math.min(mainItems.length - 1, iChannelSettingsIndex + 1);
            } else if (e.key === 'Enter') { // 'Enter' is for selection
                mainItems[iChannelSettingsIndex]?.click();
            } else if (e.key === 'ArrowRight') { // 'Right' is DRILL DOWN
                // Only drill down if it's the 'Video / Format' button (index 1)
                if (iChannelSettingsIndex === 1) {
                    mainItems[iChannelSettingsIndex]?.click(); // Clicks 'Video / Format'
                }
                // Otherwise, 'ArrowRight' does nothing
            }
            else if (e.key === 'ArrowLeft' || e.key === 'Escape') { // 'Left' is GO BACK
                 hideChannelSettings(); // Close the entire Settings panel
            }
            updateSettingsSelection(o.SettingsMainMenu, iChannelSettingsIndex);
            // --- PATCH END ---
        }
        return;
      }


      // DEFAULT PLAYER KEYS (Panels are closed)
      const PLAYER_KEYS = ['ArrowLeft', 'ArrowRight', 'Enter', 'ArrowUp', 'ArrowDown', 'h', 'e', 'Escape', 'm'];
      if (!PLAYER_KEYS.includes(e.key)) return;

      e.preventDefault();
      switch (e.key) {
        case 'ArrowLeft':
            showNav(); // Open Channel List (Drill Down to Panel)
            break;
        case 'ArrowRight': 
            showChannelSettings(); // Open Settings (Drill Down to Panel)
            break;
        case 'Enter': showChannelName(); break;
        case 'ArrowUp': loadChannel(iCurrentChannel - 1); break;
        case 'ArrowDown': loadChannel(iCurrentChannel + 1); break;
        case 'h': window.showGuide(); break;
        case 'e': showEpg(); break;
        case 'm': showChannelSettings(); break;
        case 'Escape': clearUi(); break;
      }
    });
    // --- END: TV REMOTE KEYDOWN LOGIC (FINAL STABLE VERSION WITH CORRECTED NAV/GROUP ARROW LOGIC) ---


    /**
     * Gets stats from Shaka Player and updates the Stream Info overlay.
     */
    function updateStreamInfo() {
      const infoOverlay = o.CodecInfo; 
      if (!infoOverlay) return; 
     
      if (!player) {
        infoOverlay.textContent = 'Player Info: N/A';
        return;
      }

      try {
        const variant = player.getVariantTracks().find(t => t.active);
        const stats = player.getStats();

        if (!variant || !stats) {
          infoOverlay.textContent = 'Player Info: N/A';
          return;
        }

        const codecs = variant.codecs || 'N/A';
        const resolution = `${variant.width}x${variant.height}`;
        const bandwidth = (stats.estimatedBandwidth / 1000000).toFixed(2); 

        infoOverlay.textContent = `Video: ${resolution} (${codecs}) | Bandwidth: ${bandwidth} Mbit/s`;
     
      } catch (error) {
        console.warn("Could not get stream info:", error);
        infoOverlay.textContent = 'Player Info: Error';
      }
    }

    document.addEventListener('DOMContentLoaded', initPlayer);

    // --- USER'S NEW SCRIPT BLOCK ---
    document.addEventListener('shaka-ui-loaded', () => {
      const video = document.getElementById('avplayer');
      // Check if ui is available on video object, otherwise use the global ui
      const uiInstance = video['ui'] || ui;
      if (!uiInstance) {
          console.error("Shaka UI not found on video element.");
          return;
      }
      const controls = uiInstance.getControls();
      if (!controls) {
          console.error("Shaka UI Controls not found.");
          return;
      }

      /* --- 1. REMOVE ALL SHAKA CONTROLS --- */
      const controlsContainer = document.querySelector('.shaka-controls-container');
      if (controlsContainer) {
        controlsContainer.style.display = 'none'; // hide all controls
        controlsContainer.style.pointerEvents = 'none';
      }

      // disable Shaka auto-hide (even though hidden)
      controls.setAutoHide(false);

      /* --- 2. DISABLE ALL FADE ANIMATIONS --- */
      const allUIElements = document.querySelectorAll('.shaka-controls-container *');
      allUIElements.forEach(el => {
        el.style.transition = 'none';
        el.style.animation = 'none';
        el.style.opacity = '1';
      });

      /* --- 3. DISABLE PAUSE FUNCTION COMPLETELY --- */
      // force play if any pause event happens
      video.addEventListener('pause', (e) => {
        if (!video.ended) video.play();
      });

      // block all clicks and spacebar that might toggle pause
      video.addEventListener('click', (e) => e.preventDefault());
      window.addEventListener('keydown', (e) => {
        // --- FIX: Added check for SearchField focus ---
        if ((e.code === 'Space' || e.key === ' ') && document.activeElement !== o.SearchField) {
           e.preventDefault();
        }
      });

      // extra protection — remove play/pause button from DOM
      const pauseButton = document.querySelector('.shaka-play-button-container');
      if (pauseButton) pauseButton.remove();
    });
