# Load Audio (Upload)🎥🅥🅗🅢
## Documentation
- Class name: VHS_LoadAudioUpload
- Category: Video Helper Suite 🎥🅥🅗🅢
- Output node: False
- Repo Ref: https://github.com/Kosinkadink/ComfyUI-VideoHelperSuite.git

VHS_LoadAudioUpload节点用于在视频助手套件中上传和处理音频文件。它允许用户上传音频文件，并指定音频处理的开始时间和持续时间。此节点对于需要音频操作或分析的应用至关重要，为套件中的进一步音频相关操作提供基础。

## Input types
### Required
- audio
    - 指定要上传和处理的音频文件。此参数对于确定将进行处理的音频内容至关重要。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- start_time
    - 定义应处理音频文件的起始点（以秒为单位）。此参数允许选择性地处理音频内容，增强灵活性。
    - Comfy dtype: FLOAT
    - Python dtype: float
- duration
    - 指定应从开始时间处理音频的持续时间（以秒为单位）。这允许精确控制要分析或操作的音频文件片段。
    - Comfy dtype: FLOAT
    - Python dtype: float

## Output types
- audio
    - Comfy dtype: VHS_AUDIO
    - 表示处理后的音频数据，准备在套件中的后续操作中使用。
    - Python dtype: torch.Tensor

## Usage tips
- Infra type: CPU
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