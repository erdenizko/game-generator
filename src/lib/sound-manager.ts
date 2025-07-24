/**
 * Sound Manager for handling game audio effects and background music
 */

export interface SoundConfig {
  spin?: string;
  click?: string;
  win?: string;
  lose?: string;
  backgroundMusic?: string;
}

export class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private masterVolume: number = 1.0;
  private musicVolume: number = 0.3;
  private effectsVolume: number = 0.7;

  constructor(soundConfig: SoundConfig) {
    this.loadSounds(soundConfig);
  }

  /**
   * Load audio files from configuration
   */
  private loadSounds(config: SoundConfig): void {
    Object.entries(config).forEach(([key, url]) => {
      if (url) {
        try {
          const audio = new Audio(url);
          audio.preload = 'auto';
          
          // Set volume based on sound type
          if (key === 'backgroundMusic') {
            audio.loop = true;
            audio.volume = this.musicVolume * this.masterVolume;
          } else {
            audio.volume = this.effectsVolume * this.masterVolume;
          }

          // Handle loading errors gracefully
          audio.addEventListener('error', (e) => {
            console.warn(`Failed to load sound: ${key}`, e);
          });

          this.sounds[key] = audio;
        } catch (error) {
          console.warn(`Failed to create audio for ${key}:`, error);
        }
      }
    });
  }

  /**
   * Play a sound effect
   */
  public playSound(soundType: string): Promise<void> {
    return new Promise((resolve) => {
      if (!this.soundEnabled || !this.sounds[soundType]) {
        resolve();
        return;
      }

      try {
        const audio = this.sounds[soundType];
        
        // Reset audio to beginning
        audio.currentTime = 0;
        
        // Play the sound
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => resolve())
            .catch((error) => {
              console.warn(`Failed to play sound ${soundType}:`, error);
              resolve();
            });
        } else {
          resolve();
        }
      } catch (error) {
        console.warn(`Error playing sound ${soundType}:`, error);
        resolve();
      }
    });
  }

  /**
   * Start background music
   */
  public startBackgroundMusic(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.musicEnabled || !this.sounds.backgroundMusic) {
        resolve();
        return;
      }

      try {
        const music = this.sounds.backgroundMusic;
        const playPromise = music.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => resolve())
            .catch((error) => {
              console.warn('Failed to start background music:', error);
              resolve();
            });
        } else {
          resolve();
        }
      } catch (error) {
        console.warn('Error starting background music:', error);
        resolve();
      }
    });
  }

  /**
   * Stop background music
   */
  public stopBackgroundMusic(): void {
    if (this.sounds.backgroundMusic) {
      this.sounds.backgroundMusic.pause();
      this.sounds.backgroundMusic.currentTime = 0;
    }
  }

  /**
   * Pause background music
   */
  public pauseBackgroundMusic(): void {
    if (this.sounds.backgroundMusic) {
      this.sounds.backgroundMusic.pause();
    }
  }

  /**
   * Resume background music
   */
  public resumeBackgroundMusic(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.musicEnabled || !this.sounds.backgroundMusic) {
        resolve();
        return;
      }

      try {
        const playPromise = this.sounds.backgroundMusic.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => resolve())
            .catch((error) => {
              console.warn('Failed to resume background music:', error);
              resolve();
            });
        } else {
          resolve();
        }
      } catch (error) {
        console.warn('Error resuming background music:', error);
        resolve();
      }
    });
  }

  /**
   * Toggle sound effects on/off
   */
  public toggleSoundEffects(): boolean {
    this.soundEnabled = !this.soundEnabled;
    return this.soundEnabled;
  }

  /**
   * Toggle background music on/off
   */
  public toggleBackgroundMusic(): boolean {
    this.musicEnabled = !this.musicEnabled;
    
    if (this.musicEnabled) {
      this.resumeBackgroundMusic();
    } else {
      this.pauseBackgroundMusic();
    }
    
    return this.musicEnabled;
  }

  /**
   * Set master volume (0.0 to 1.0)
   */
  public setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.updateAllVolumes();
  }

  /**
   * Set music volume (0.0 to 1.0)
   */
  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (this.sounds.backgroundMusic) {
      this.sounds.backgroundMusic.volume = this.musicVolume * this.masterVolume;
    }
  }

  /**
   * Set effects volume (0.0 to 1.0)
   */
  public setEffectsVolume(volume: number): void {
    this.effectsVolume = Math.max(0, Math.min(1, volume));
    this.updateEffectsVolumes();
  }

  /**
   * Update all audio volumes
   */
  private updateAllVolumes(): void {
    Object.entries(this.sounds).forEach(([key, audio]) => {
      if (key === 'backgroundMusic') {
        audio.volume = this.musicVolume * this.masterVolume;
      } else {
        audio.volume = this.effectsVolume * this.masterVolume;
      }
    });
  }

  /**
   * Update effects volumes only
   */
  private updateEffectsVolumes(): void {
    Object.entries(this.sounds).forEach(([key, audio]) => {
      if (key !== 'backgroundMusic') {
        audio.volume = this.effectsVolume * this.masterVolume;
      }
    });
  }

  /**
   * Get current sound settings
   */
  public getSettings(): {
    soundEnabled: boolean;
    musicEnabled: boolean;
    masterVolume: number;
    musicVolume: number;
    effectsVolume: number;
  } {
    return {
      soundEnabled: this.soundEnabled,
      musicEnabled: this.musicEnabled,
      masterVolume: this.masterVolume,
      musicVolume: this.musicVolume,
      effectsVolume: this.effectsVolume
    };
  }

  /**
   * Check if a sound is loaded and ready
   */
  public isSoundLoaded(soundType: string): boolean {
    return !!this.sounds[soundType] && this.sounds[soundType].readyState >= 2;
  }

  /**
   * Get all loaded sound types
   */
  public getLoadedSounds(): string[] {
    return Object.keys(this.sounds).filter(key => this.isSoundLoaded(key));
  }

  /**
   * Cleanup - stop all sounds and remove references
   */
  public cleanup(): void {
    Object.values(this.sounds).forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute('src');
      audio.load();
    });
    
    this.sounds = {};
  }

  /**
   * Preload all sounds (useful for mobile devices)
   */
  public async preloadAll(): Promise<void> {
    const loadPromises = Object.entries(this.sounds).map(([key, audio]) => {
      return new Promise<void>((resolve) => {
        if (audio.readyState >= 2) {
          resolve();
          return;
        }

        const onLoad = () => {
          audio.removeEventListener('canplaythrough', onLoad);
          audio.removeEventListener('error', onError);
          resolve();
        };

        const onError = () => {
          audio.removeEventListener('canplaythrough', onLoad);
          audio.removeEventListener('error', onError);
          console.warn(`Failed to preload sound: ${key}`);
          resolve();
        };

        audio.addEventListener('canplaythrough', onLoad);
        audio.addEventListener('error', onError);
        
        // Trigger loading
        audio.load();
      });
    });

    await Promise.all(loadPromises);
  }
}