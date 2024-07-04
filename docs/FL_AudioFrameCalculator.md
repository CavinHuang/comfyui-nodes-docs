
# Documentation
- Class name: `FL_AudioFrameCalculator`
- Category: `🏵️Fill Nodes`
- Output node: `False`

FL_AudioFrameCalculator节点专门用于处理音频文件，通过计算音频中指定小节内的帧数来实现这一目的。该节点基于每分钟节拍数（BPM）、帧率以及其他参数进行计算。它利用音频处理库来提取和操作音频数据，从而为后续处理或分析提供关于音频结构和时间的深入洞察。

# Input types
## Required
- audio_file_path
    - 指定要处理的音频文件的绝对路径。这对于定位和加载音频数据以进行分析至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- start_bar
    - 确定音频分析的起始小节，允许在音频文件内进行有针对性的处理。
    - Comfy dtype: INT
    - Python dtype: int
- bar_count
    - 定义要分析的小节数，使得可以计算音频特定部分的帧数。
    - Comfy dtype: INT
    - Python dtype: int
- fps
    - 每秒帧数设置，这影响了指定音频段内总帧数的计算。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- AUDIO
    - 经处理的音频片段，适用于进一步的音频操作或分析。
    - Comfy dtype: AUDIO
    - Python dtype: tuple
- Frame Count
    - 在指定音频段内计算得出的总帧数。
    - Comfy dtype: INT
    - Python dtype: int
- BPM
    - 在处理过程中确定的音频每分钟节拍数。
    - Comfy dtype: INT
    - Python dtype: int
- FPS
    - 输入中指定的每秒帧数参数，返回作为参考。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_AudioFrameCalculator:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio_file_path": ("STRING", {
                    "default": "/path/to/audio/file/example.wav",
                    "description": "Absolute path to the audio file"
                }),
                "start_bar": ("INT", {
                    "default": 0,
                    "description": "Start bar"
                }),
                "bar_count": ("INT", {
                    "default": 8,
                    "description": "Number of bars"
                }),
                "fps": ("INT", {
                    "default": 10,
                    "description": "Frames per second"
                }),
            }
        }

    RETURN_TYPES = ("AUDIO", "INT", "INT", "INT")
    RETURN_NAMES = ("AUDIO", "Frame Count", "BPM", "FPS")
    FUNCTION = "process_audio"
    CATEGORY = "🏵️Fill Nodes"

    def process_audio(self, audio_file_path, start_bar, bar_count, fps):
        if not os.path.isfile(audio_file_path):
            raise FileNotFoundError(f"Audio file does not exist: {audio_file_path}")

        waveform, sample_rate = torchaudio.load(audio_file_path)

        y_full = waveform.numpy()[0]  # Assuming mono audio for simplicity
        tempo, _ = librosa.beat.beat_track(y=y_full, sr=sample_rate)
        bpm = int(tempo)

        # Calculate the duration of a single bar in seconds (4 beats per bar)
        bar_duration = 60 / bpm * 4

        # Calculate start and end times in seconds based on bars
        start_time = start_bar * bar_duration
        end_time = start_time + (bar_count * bar_duration)

        # Convert times to sample indices
        start_sample = int(start_time * sample_rate)
        end_sample = int(end_time * sample_rate)

        # Extract the selected audio segment
        audio_segment = waveform[:, start_sample:end_sample]

        # Calculate the number of frames based on FPS and segment duration
        duration_seconds = end_time - start_time
        frames_count = int(duration_seconds * fps)

        audio_output = (audio_segment.cpu().numpy(), sample_rate)

        print("-_-_-_-_-_-_-_-_-_-")
        print(f"BPM: {bpm}")
        print(f"Start Time: {start_time}")
        print(f"End Time: {end_time}")
        print(f"Frame Count: {frames_count}")
        print("-_-_-_-_-_-_-_-_-_-")

        return (audio_output, frames_count, bpm, fps)

```
