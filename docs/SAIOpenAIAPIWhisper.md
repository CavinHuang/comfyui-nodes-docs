
# Documentation
- Class name: SAIOpenAIAPIWhisper
- Category: SALT/Whisper
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

SAIOpenAIAPIWhisper节点使用OpenAI的Whisper API提供音频内容的转录或翻译功能。它支持各种配置选项，包括模型选择、响应格式和温度设置，以根据特定需求定制转录或翻译过程。

# Input types
## Required
- file_path
    - 要转录或翻译的音频文件路径。这个参数对于定位和处理音频内容至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- openai_key
    - OpenAI的API密钥，用于验证对Whisper API的请求。
    - Comfy dtype: STRING
    - Python dtype: str
## Optional
- model
    - 指定用于转录或翻译的Whisper模型，允许根据模型能力定制处理过程。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- mode
    - 指定操作是转录还是翻译音频内容，提供处理灵活性。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- language
    - 音频内容的语言，可以影响转录或翻译的准确性。
    - Comfy dtype: STRING
    - Python dtype: str
- response_format
    - 确定转录或翻译输出的格式，支持文本或JSON格式以实现灵活集成。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- temperature
    - 调整转录或翻译输出的创造性或可变性，能够微调结果。
    - Comfy dtype: FLOAT
    - Python dtype: float
- timestamp_granularities
    - 定义转录中时间戳的详细程度，允许段落或单词级别的粒度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- max_frames
    - 要处理的最大帧数，能够控制转录或翻译的范围。
    - Comfy dtype: INT
    - Python dtype: int
- seek_seconds
    - 开始转录或翻译前在音频中寻找的秒数，允许精确设置起始点。
    - Comfy dtype: FLOAT
    - Python dtype: float
- prompt
    - 可选的提示，可以引导转录或翻译过程，为模型提供上下文或指令。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- transcription_result
    - 最终的转录或翻译文本输出。
    - Comfy dtype: STRING
    - Python dtype: str
- audio_path
    - 处理后的音频文件路径，对后续操作或验证有用。
    - Comfy dtype: STRING
    - Python dtype: str
- frames_count
    - 转录或翻译过程中处理的帧数，提供操作范围的洞察。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SAIOpenAIAPIWhisper:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_path": ("STRING", {}),
                "openai_key": ("STRING", {}),
            },
            "optional": {
                "model": (["whisper-1"],),
                "mode": (["transcribe", "translate_to_english"],),
                "language": ("STRING", {}),
                "response_format": (["text", "json", "verbose_json", "prompt_schedule"],),
                "temperature": ("FLOAT", {"min": 0.0, "max": 1.0, "default": 0.7}),
                "timestamp_granularities": (["segment", "word"],),
                "max_frames": ("INT", {"default": 0, "min": 0}),
                "seek_seconds": ("FLOAT", {"default": 0.0}),
                "prompt": ("STRING", {"multiline": True, "placeholder": "Optional prompt..."})
            }
        }
    
    RETURN_TYPES = ("STRING", "STRING", "INT")
    RETURN_NAMES = ("transcription_result", "audio_path", "frames_count")

    FUNCTION = "whisper_v2"
    CATEGORY = "SALT/Whisper"

    def whisper_v2(self, file_path, openai_key, model="whisper-1", mode="transcribe", language="", response_format="text", temperature=0.7, timestamp_granularities="segment", max_frames=0, seek_seconds=0.0, prompt=""):
        language = language if language else None
        prompt = prompt if prompt else None
        file_path = os.path.join(INPUT, file_path)

        if not os.path.exists(file_path):
            raise ValueError(f"The specified file `{file_path}` does not exist!")
        
        if model not in ("whisper-1"):
            raise ValueError(f"The specified model `{model}` does not exist!")

        if mode not in ("transcribe", "translate_to_english"):
            print(f'The `mode` selected "{mode}" is not valid. Please use either "transcribe", or "translate_to_english"')
            mode = "transcribe"

        openai.api_key = openai_key

        audio_path, fps, total_frames = self.extract_audio(file_path)

        max_frames = max_frames if max_frames != 0 else total_frames

        match mode:
            case "transcribe":
                if response_format == "prompt_schedule":
                    transcription = self.transcribe_audio(file_path, model, prompt, language, "verbose_json", temperature, timestamp_granularities, json_string=False)
                    out = self.prompt_schedule(transcription, fps, max_frames, seek_seconds)
                else:
                    out = self.transcribe_audio(file_path, model, prompt, language, response_format, temperature, timestamp_granularities)
            case "translate_to_english":
                out = self.translate_audio(file_path, model, prompt, response_format, temperature)

        return (out, audio_path, total_frames)

    def transcribe_audio(self, file_path, model="whisper-1", prompt=None, language=None, response_format="json", temperature=0.7, timestamp_granularities="segment", json_string=True):
        with open(file_path, "rb") as audio_file:
            response = openai.audio.transcriptions.create(
                model=model,
                file=audio_file,
                prompt=prompt,
                response_format=response_format,
                language=language,
                temperature=temperature,
                timestamp_granularities=timestamp_granularities
            )
            from pprint import pprint
            pprint(response, indent=4)
            if response_format in ("json", "verbose_json"):
                segments = getattr(response, 'segments', [])
                if json_string:
                    out = json.dumps(segments, ensure_ascii=True, indent=4)
                else:
                    out = segments
            else:
                out = response
            
            return out

    def translate_audio(self, file_path, model="whisper-1", prompt=None, response_format="json", temperature=0.7):
        with open(file_path, "rb") as audio_file:
            response = openai.audio.translations.create(
                model=model,
                file=audio_file,
                prompt=prompt,
                response_format=response_format,
                temperature=temperature,
            )
            from pprint import pprint
            pprint(response, indent=4)
            if response_format in ("json", "verbose_json"):
                segments = getattr(response, 'segments', [])
                out = json.dumps(segments, ensure_ascii=True, indent=4)
            else:
                out = response
            
            return out

    def extract_audio(self, file_path):
        clip = VideoFileClip(file_path)
        fps = clip.fps
        total_frames = int(clip.duration * fps)
        audio_path = os.path.join(OUTPUT, f"{os.path.splitext(os.path.basename(file_path))[0]}.mp3")
        clip.audio.write_audiofile(audio_path)
        clip.close()
        return audio_path, fps, total_frames
    
    def prompt_schedule(self, transcription, fps, max_frames, seek_seconds):
        prompt_schedule = ""
        max_seconds = max_frames / fps if max_frames > 0 else float('inf')
        start_frame = int(seek_seconds * fps)

        if isinstance(transcription, list):
            for idx, segment in enumerate(transcription):
                segment_start = segment.get("start", 0.0)
                if segment_start < seek_seconds or segment_start > max_seconds:
                    continue

                frame_number = int(segment_start * fps) - start_frame
                text = segment.get("text", "")
                if frame_number >= 0:
                    prompt_schedule += f'"{frame_number}": "{text.strip()}"' + (",\n" if idx != len(transcription) else "\n")

        return prompt_schedule

```
