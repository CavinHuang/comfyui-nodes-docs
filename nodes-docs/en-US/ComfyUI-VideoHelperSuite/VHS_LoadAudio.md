---
tags:
- Multimedia
- VideoHelperSuite
---

# Load Audio (Path)🎥🅥🅗🅢
## Documentation
- Class name: `VHS_LoadAudio`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `False`

The VHS_LoadAudio node is designed for loading audio files into the Video Helper Suite environment. It supports a variety of audio formats and allows for seeking a specific start time within the audio file, making it a versatile tool for audio processing and manipulation within video projects.
## Input types
### Required
- **`audio_file`**
    - Specifies the path to the audio file to be loaded. The node supports a range of audio formats, making it flexible for use with various audio sources.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`seek_seconds`**
    - Determines the start time in seconds from which the audio should begin playing. This allows for precise control over the playback start time within the audio file.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `VHS_AUDIO`
    - The loaded audio data, ready for use within the Video Helper Suite for further processing or integration into video projects.
    - Python dtype: `VHS_AUDIO`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadAudio:
    @classmethod
    def INPUT_TYPES(s):
        #Hide ffmpeg formats if ffmpeg isn't available
        return {
            "required": {
                "audio_file": ("STRING", {"default": "input/", "vhs_path_extensions": ['wav','mp3','ogg','m4a','flac']}),
                },
            "optional" : {"seek_seconds": ("FLOAT", {"default": 0, "min": 0})}
        }

    RETURN_TYPES = ("VHS_AUDIO",)
    RETURN_NAMES = ("audio",)
    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢"
    FUNCTION = "load_audio"
    def load_audio(self, audio_file, seek_seconds):
        if audio_file is None or validate_path(audio_file) != True:
            raise Exception("audio_file is not a valid path: " + audio_file)
        #Eagerly fetch the audio since the user must be using it if the
        #node executes, unlike Load Video
        audio = get_audio(audio_file, start_time=seek_seconds)
        return (lambda : audio,)

    @classmethod
    def IS_CHANGED(s, audio_file, seek_seconds):
        return hash_path(audio_file)

    @classmethod
    def VALIDATE_INPUTS(s, audio_file, **kwargs):
        return validate_path(audio_file, allow_none=True)

```
