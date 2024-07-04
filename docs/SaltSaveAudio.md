
# Documentation
- Class name: SaltSaveAudio
- Category: SALT/Audio
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SaltSaveAudio节点专门用于将音频内容保存为多种格式的文件，包括WAV、MP3和FLAC。它能自动处理文件命名，并确保在保存文件时不会覆盖已存在的文件，这使得它成为需要输出音频文件的音频处理工作流中的关键组件。

# Input types
## Required
- audio
    - 这是要保存的原始音频数据。该参数至关重要，因为它直接代表了将被处理并保存到文件中的音频内容。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- filename_prefix
    - 生成文件名的前缀，便于对保存的音频文件进行识别和组织。默认值为'audio_sfx'，提供了一个可以自定义的基本命名约定。
    - Comfy dtype: STRING
    - Python dtype: str
- format
    - 指定保存的音频文件格式。支持的格式包括'wav'、'mp3'和'flac'，这为音频的存储和使用提供了灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
该节点没有输出类型


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
