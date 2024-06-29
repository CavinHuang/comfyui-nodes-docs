---
tags:
- Audio
---

# Save Audio
## Documentation
- Class name: `SaltSaveAudio`
- Category: `SALT/Audio`
- Output node: `True`

The SaltSaveAudio node is designed for saving audio content to a file in various formats, including WAV, MP3, and FLAC. It automatically handles file naming and ensures that files are saved without overwriting existing files, making it a crucial component for audio processing workflows that require outputting audio files.
## Input types
### Required
- **`audio`**
    - The raw audio data to be saved. This parameter is crucial as it directly represents the audio content that will be processed and saved to a file.
    - Comfy dtype: `AUDIO`
    - Python dtype: `bytes`
- **`filename_prefix`**
    - A prefix for the generated filename, allowing for easy identification and organization of saved audio files. It defaults to 'audio_sfx', providing a base naming convention that can be customized.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`format`**
    - Specifies the format of the saved audio file. Supported formats include 'wav', 'mp3', and 'flac', enabling flexibility in how audio is stored and used.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltSaveAudio:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO",),
                "filename_prefix": ("STRING", {"default": "audio_sfx"}),
                "format": (["wav", "mp3", "flac"], ),
            },
        }

    RETURN_TYPES = ()
    RETURN_NAMES = ()
    OUTPUT_NODE = True
    FUNCTION = "save_audio"
    CATEGORY = "SALT/Audio"

    def save_audio(self, audio, filename_prefix="audio_sfx", format="wav"):
        OUTPUT = folder_paths.get_output_directory()
        index = 0

        file_extension = format.lower()
        if format not in ['wav', 'mp3', 'flac']:
            print(f"Unsupported format: {format}. Defaulting to WAV.")
            file_extension = "wav"
            format = "wav"

        while True:
            filename = f"{filename_prefix}_%04d.{file_extension}" % index
            full_path = os.path.realpath(os.path.join(OUTPUT, filename))
            if not os.path.exists(full_path):
                break
            index += 1

        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        audio_segment.export(full_path, format=format)

        print(f"Audio saved to {filename} in {format.upper()} format")
        return ()

```
