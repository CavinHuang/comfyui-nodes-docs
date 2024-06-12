# Documentation
- Class name: LoadAudio
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

LoadAudio节点旨在高效地加载和处理音频文件。它能够处理各种音频文件格式，并提供跳转到音频流中特定秒数的功能。此节点对于需要将音频操作或分析作为更大多媒体处理工作流程一部分的应用程序至关重要。

# Input types
## Required
- audio_file
    - audio_file参数指定要加载的音频文件的路径。这是一个基本参数，因为节点的操作围绕提供的音频文件进行。节点将验证路径并确保文件可访问且在支持的格式中。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- seek_seconds
    - seek_seconds参数允许节点从指定的时间偏移（秒）开始处理音频。这在只有音频文件的一部分是相关的情况下非常有用，因此可以提高效率并减少不必要的处理。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - LoadAudio节点的audio输出代表了已加载并可选处理的音频数据。它是一个关键的输出，因为它输入到多媒体工作流中随后的音频分析或操作阶段。
    - Comfy dtype: VHS_AUDIO
    - Python dtype: bytes

# Usage tips
- Infra type: CPU

# Source code
```
class LoadAudio:

    @classmethod
    def INPUT_TYPES(s):
        return {'required': {'audio_file': ('STRING', {'default': 'input/', 'vhs_path_extensions': ['wav', 'mp3', 'ogg', 'm4a', 'flac']})}, 'optional': {'seek_seconds': ('FLOAT', {'default': 0, 'min': 0})}}
    RETURN_TYPES = ('VHS_AUDIO',)
    RETURN_NAMES = ('audio',)
    CATEGORY = 'Video Helper Suite 🎥🅥🅗🅢'
    FUNCTION = 'load_audio'

    def load_audio(self, audio_file, seek_seconds):
        if audio_file is None or validate_path(audio_file) != True:
            raise Exception('audio_file is not a valid path: ' + audio_file)
        audio = get_audio(audio_file, start_time=seek_seconds)
        return (lambda : audio,)

    @classmethod
    def IS_CHANGED(s, audio_file, seek_seconds):
        return hash_path(audio_file)

    @classmethod
    def VALIDATE_INPUTS(s, audio_file, **kwargs):
        return validate_path(audio_file, allow_none=True)
```