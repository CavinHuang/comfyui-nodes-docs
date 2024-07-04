
# Documentation
- Class name: SaltLoadAudio
- Category: SALT/Audio
- Output node: False

本节点旨在将音频文件加载到系统中，为后续处理或分析做准备。它是音频处理流程的初始步骤，使后续节点能够操作或分析加载的音频数据。

# Input types
## Required
- file_path
    - 指定要加载的音频文件的路径。对于定位和访问待处理的音频数据至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- start_seconds
    - 定义音频加载的起始时间点（以秒为单位）。这允许部分加载音频文件，便于进行针对性分析或操作。
    - Comfy dtype: FLOAT
    - Python dtype: float
- manual_bpm
    - 允许手动指定每分钟节拍数（BPM），可用于覆盖自动BPM检测。这对于依赖精确节奏信息的音频处理很有用。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_rate
    - 设置音频处理的帧率。该参数影响音频分析和操作的时间分辨率。
    - Comfy dtype: INT
    - Python dtype: int
## Optional
- duration_seconds
    - 确定从起始点开始加载音频的持续时间（以秒为单位）。这使得可以选择性地处理音频片段。
    - Comfy dtype: FLOAT
    - Python dtype: float

# Output types
- audio
    - 加载完毕的音频数据，可供进一步处理或分析。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- bpm
    - 加载音频的检测到的或手动指定的每分钟节拍数（BPM）。
    - Comfy dtype: FLOAT
    - Python dtype: float
- frame_rate
    - 音频加载过程中使用的帧率。
    - Comfy dtype: INT
    - Python dtype: int
- frame_count
    - 加载的音频片段中的总帧数，基于持续时间和帧率计算得出。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltLoadAudio:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "file_path": ("STRING", {}),
                "start_seconds": ("FLOAT", {"min": 0.0, "default": 0.0}),
                "manual_bpm": ("FLOAT", {"default": 0.0, "min": 0.0, "max": 300.0}),
                "frame_rate": ("INT", {"default": 8, "min": 1, "max": 244}),
            },
            "optional": {
                "duration_seconds": ("FLOAT", {"min": 0.0, "default": 0.0, "optional": True}),
            },
        }

    RETURN_TYPES = ("AUDIO", "FLOAT", "INT", "INT")
    RETURN_NAMES = ("audio", "bpm", "frame_rate", "frame_count")
    FUNCTION = "load_audio"
    CATEGORY = "SALT/Audio"

    def load_audio(self, file_path, start_seconds, duration_seconds=0.0, manual_bpm=0.0, frame_rate=24.0):
        INPUT = folder_paths.get_input_directory()
        file_path = os.path.join(INPUT, file_path)

        # Load the audio segment (by start/duration)
        audio = self.get_audio(file_path, start_seconds, duration_seconds)
        audio_segment = AudioSegment.from_file(io.BytesIO(audio), format="wav")
        audio_segment = audio_segment.set_frame_rate(frame_rate)
        duration_ms = int(duration_seconds * 1000) if duration_seconds else len(audio_segment) - int(start_seconds * 1000)

        bpm = self.analyze_bpm(audio, manual_bpm)
        frame_count = int((duration_ms / 1000.0) * frame_rate)

        return (audio, bpm, frame_rate, frame_count)

    def get_audio(self, file, start_time=0, duration=0):
        TEMP = folder_paths.get_temp_directory()
        os.makedirs(TEMP, exist_ok=True)
        
        temp_file_path = None
        try:
            # Create a temporary file in the specified directory
            with tempfile.NamedTemporaryFile(suffix='.wav', delete=False, dir=TEMP) as temp_file:
                temp_file_path = temp_file.name
            
            args = [ffmpeg_path, "-y", "-v", "error", "-i", file, "-acodec", "pcm_s16le", "-ar", "44100"]
            if start_time > 0:
                args += ["-ss", str(start_time)]
            if duration > 0:
                args += ["-t", str(duration)]
            args += [temp_file_path]

            subprocess.run(args, check=True)

            with open(temp_file_path, "rb") as f:
                audio_data = f.read()

            return audio_data
        finally:
            if temp_file_path and os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
    
    def analyze_bpm(self, audio_bytes, manual_bpm=0.0):
        with io.BytesIO(audio_bytes) as audio_file:
            y, sr = librosa.load(audio_file, sr=None)

        if manual_bpm <= 0:
            tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
            bpm = tempo
        else:
            bpm = manual_bpm

        return round(bpm, ndigits=2)

    @staticmethod
    def calculate_file_hash(filename: str):
        try:
            h = hashlib.sha256()
            h.update(filename.encode())
            h.update(str(os.path.getmtime(filename)).encode())
            return h.hexdigest()
        except Exception as e:
            print(e)
            return float("NaN")

    @classmethod
    def IS_CHANGED(cls, file_path, *args, **kwargs):
        INPUT = folder_paths.get_input_directory()
        file_path = os.path.join(INPUT, file_path)
        hash = cls.calculate_file_hash(file_path)
        return hash

```
