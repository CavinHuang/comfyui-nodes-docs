# Whisper Transcribe
## Documentation
- Class name: `SAIWhisperTranscribe`
- Category: `SALT/Whisper`
- Output node: `False`

The SAIWhisperTranscribe node is designed to transcribe audio and video files using a Whisper model. It processes media files to extract audio, applies the Whisper model for transcription, and returns detailed transcription data including raw text, structured transcription frames, and additional metadata such as frame rates and counts.
## Input types
### Required
- **`whisper_model`**
    - The Whisper model, processor, and device configuration used for transcription. This parameter is crucial for determining how the audio will be processed and transcribed, affecting the accuracy and quality of the transcription output.
    - Comfy dtype: `WHISPER_MODEL`
    - Python dtype: `Tuple[torch.nn.Module, Any, torch.device]`
- **`file_path`**
    - The path to the media file to be transcribed. This parameter is essential for locating the file and determining its media type, which influences the transcription process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
### Optional
- **`frame_rate`**
    - Specifies the frame rate to be used during audio extraction from video files. It affects the granularity of the transcription timestamps and frames.
    - Comfy dtype: `FLOAT`
    - Python dtype: `float`
- **`chunk_type`**
    - Determines the segmentation type of the transcription, either by sentence or word, influencing the structure of the transcription output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`max_new_tokens`**
    - The maximum number of new tokens to generate for the transcription. This parameter controls the length and detail level of the transcription output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`transcription_text`**
    - Comfy dtype: `STRING`
    - The raw text of the transcription.
    - Python dtype: `str`
- **`transcription_timestamp_dict`**
    - Comfy dtype: `DICT`
    - A dictionary mapping timestamps to transcribed text, providing a structured view of the transcription.
    - Python dtype: `Dict[int, str]`
- **`transcription_frame_dict`**
    - Comfy dtype: `DICT`
    - A dictionary mapping frame numbers to transcribed text, useful for syncing transcription with video frames.
    - Python dtype: `Dict[int, str]`
- **`prompt_schedule`**
    - Comfy dtype: `STRING`
    - A structured representation of transcription text mapped to specific frame numbers, formatted as a schedule.
    - Python dtype: `str`
- **`images`**
    - Comfy dtype: `IMAGE`
    - A tensor of images extracted or generated during the transcription process, corresponding to video frames or placeholders for audio files.
    - Python dtype: `torch.Tensor`
- **`transcription_count`**
    - Comfy dtype: `INT`
    - The total number of transcription segments produced.
    - Python dtype: `int`
- **`frame_rate`**
    - Comfy dtype: `INT`
    - The frame rate used for audio extraction from video files, affecting the timing of transcription frames.
    - Python dtype: `float`
- **`frame_count`**
    - Comfy dtype: `INT`
    - The total number of frames in the video file, relevant for video file transcriptions.
    - Python dtype: `int`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class SAIWhisperTranscribe:
    def __init__(self):
        self.video_extensions = [
            ".3g2", ".3gp", ".3gp2", ".3gpp", ".amv", ".asf", ".avi", ".divx",
            ".drc", ".dv", ".f4v", ".flv", ".m2v", ".m4p", ".m4v", ".mkv",
            ".mov", ".mp4", ".mpe", ".mpeg", ".mpeg2", ".mpeg4", ".mpg",
            ".mpv", ".mxf", ".nsv", ".ogg", ".ogv", ".qt", ".rm", ".rmvb",
            ".roq", ".svi", ".vob", ".webm", ".wmv", ".yuv"
        ]
        self.audio_extensions = [
            ".mp3", ".wav", ".aac", ".flac", ".ogg", ".m4a", ".wma"
        ]   
                    
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "whisper_model": ("WHISPER_MODEL",),
                "file_path": ("STRING", {})
            },
            "optional": {
                "frame_rate": ("FLOAT", {"default": 8, "min": 1, "max": 244}),
                "chunk_type": (["sentence", "word"],),
                "max_new_tokens": ("INT", {"min": 1, "max": 4096, "default": 128}),
            },
        }

    RETURN_TYPES = ("STRING", "DICT", "DICT", "STRING", "IMAGE", "INT", "INT", "INT")
    RETURN_NAMES = ("transcription_text", "transcription_timestamp_dict", "transcription_frame_dict", "prompt_schedule", "images", "transcription_count", "frame_rate", "frame_count")

    FUNCTION = "transcribe"
    CATEGORY = "SALT/Whisper"

    def transcribe(self, whisper_model, file_path, **kwargs):
        model, processor, device = whisper_model

        media_type = self.validate(file_path)
        if not media_type:
            supported_formats = ', '.join(self.video_extensions + self.audio_extensions)
            raise ValueError(f"Unsupported media file format. Please provide a valid video or audio file: {supported_formats}")
        
        path = os.path.join(INPUT, file_path)
        audio_path, derived_fps, frame_count, duration = self.extract_audio(path, kwargs.get('frame_rate', 8))

        raw_text, transcription, transcription_frame, prompt_schedule, images = self.transcribe_audio(
            audio_path, 
            path, 
            derived_fps,
            duration,
            model, 
            processor, 
            kwargs.get("max_new_tokens", 128),
            media_type,
            kwargs.get("chunk_type", "sentence")
        )

        transcription_count = len(transcription_frame)

        return raw_text, transcription, transcription_frame, prompt_schedule, images, transcription_count, derived_fps, frame_count

    def transcribe_audio(self, audio_path, file_path, fps, duration, model, processor, max_new_tokens, media_type="audio", chunk_type="sentence"):
        audio = AudioSegment.from_file(audio_path).set_frame_rate(16000).set_channels(1)
        samples = np.array(audio.get_array_of_samples())
        if audio.sample_width == 2:
            samples = samples.astype(np.float32) / 2**15
        elif audio.sample_width == 4:
            samples = samples.astype(np.float32) / 2**31

        pipe = pipeline(
            "automatic-speech-recognition",
            model=model,
            feature_extractor=processor.feature_extractor,
            tokenizer=processor.tokenizer,
            return_timestamps=chunk_type,
            max_new_tokens=max_new_tokens,
        )
        result = pipe(samples)
        
        raw_text = result['text'].strip()
        transcription = {}
        transcription_frame = {}
        images = []
        prompt_schedule = ""

        last_end_time = 0
        segment_offset = 0

        for chunk in result['chunks']:
            text = chunk['text']
            start_time, end_time = chunk['timestamp']

            if start_time < last_end_time:
                segment_offset += last_end_time

            adjusted_start_time = start_time + segment_offset
            frame_number = int(adjusted_start_time * fps)

            transcription[round(adjusted_start_time, ndigits=2)] = text.strip()
            transcription_frame[frame_number] = text.strip()
            prompt_schedule += f'"{frame_number}": "{text.strip()}"' + (",\n" if chunk != result['chunks'][-1] else "\n")
            
            if media_type == "video":
                img = self.extract_frame(file_path, adjusted_start_time, duration)
                images.append(pil2tensor(img))
            else:
                img = Image.new('RGB', (512, 512), color='black')
                images.append(pil2tensor(img))

            last_end_time = end_time

        images = torch.cat(images, dim=0)

        return raw_text, transcription, transcription_frame, prompt_schedule, images

    def extract_audio(self, file_path, fps):
        os.makedirs(TEMP, exist_ok=True)
        clip = VideoFileClip(file_path)
        fps = fps or clip.fps
        duration = clip.duration
        frame_count = int(duration * fps)
        tmp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.mp3', dir=TEMP)
        clip.audio.write_audiofile(tmp_file.name)
        clip.close()
        return tmp_file.name, fps, frame_count, duration

    def extract_frame(self, file_path, timestamp, video_duration):
        if timestamp > video_duration:
            return Image.new('RGB', (512, 512), color='black')
        with VideoFileClip(file_path) as clip:
            frame = clip.get_frame(timestamp)
        return Image.fromarray(frame)

    def validate(self, file_path):
        if any(file_path.lower().endswith(ext) for ext in self.video_extensions):
            return "video"
        elif any(file_path.lower().endswith(ext) for ext in self.audio_extensions):
            return "audio"
        else:
            return False

```
