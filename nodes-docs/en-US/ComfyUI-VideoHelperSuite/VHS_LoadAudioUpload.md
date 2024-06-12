---
tags:
- Multimedia
- VideoHelperSuite
---

# Load Audio (Upload)🎥🅥🅗🅢
## Documentation
- Class name: `VHS_LoadAudioUpload`
- Category: `Video Helper Suite 🎥🅥🅗🅢`
- Output node: `False`

The VHS_LoadAudioUpload node is designed for uploading and processing audio files within the Video Helper Suite. It allows users to upload audio files, specifying parameters such as the start time and duration for the audio to be processed. This node is essential for applications requiring audio manipulation or analysis, providing a foundation for further audio-related operations in the suite.
## Input types
### Required
- **`audio`**
    - Specifies the audio file selected for upload and processing. This parameter is crucial for determining the audio content that will undergo processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`start_time`**
    - Defines the starting point (in seconds) from which the audio file should be processed. This parameter allows for selective processing of audio content, enhancing flexibility.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`duration`**
    - Specifies the duration (in seconds) for which the audio should be processed from the start time. This allows for precise control over the segment of the audio file to be analyzed or manipulated.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
## Output types
- **`audio`**
    - Comfy dtype: `VHS_AUDIO`
    - Represents the processed audio data, ready for use in subsequent operations within the suite.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadAudioUpload:
    @classmethod
    def INPUT_TYPES(s):
        input_dir = folder_paths.get_input_directory()
        files = []
        for f in os.listdir(input_dir):
            if os.path.isfile(os.path.join(input_dir, f)):
                file_parts = f.split('.')
                if len(file_parts) > 1 and (file_parts[-1] in audio_extensions):
                    files.append(f)
        return {"required": {
                    "audio": (sorted(files),),
                    "start_time": ("FLOAT" , {"default": 0, "min": 0, "max": 10000000, "step": 0.01}),
                    "duration": ("FLOAT" , {"default": 0, "min": 0, "max": 10000000, "step": 0.01}),
                     },
                }

    CATEGORY = "Video Helper Suite 🎥🅥🅗🅢"

    RETURN_TYPES = ("VHS_AUDIO", )
    RETURN_NAMES = ("audio",)
    FUNCTION = "load_audio"

    def load_audio(self, start_time, duration, **kwargs):
        audio_file = folder_paths.get_annotated_filepath(kwargs['audio'].strip("\""))
        if audio_file is None or validate_path(audio_file) != True:
            raise Exception("audio_file is not a valid path: " + audio_file)
        
        audio = get_audio(audio_file, start_time, duration)

        return (lambda : audio,)

    @classmethod
    def IS_CHANGED(s, audio, start_time, duration):
        audio_file = folder_paths.get_annotated_filepath(audio.strip("\""))
        return hash_path(audio_file)

    @classmethod
    def VALIDATE_INPUTS(s, audio, **kwargs):
        audio_file = folder_paths.get_annotated_filepath(audio.strip("\""))
        return validate_path(audio_file, allow_none=True)

```
