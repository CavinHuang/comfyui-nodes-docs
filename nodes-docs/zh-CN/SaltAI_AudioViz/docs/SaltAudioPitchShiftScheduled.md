
# Documentation
- Class name: SaltAudioPitchShiftScheduled
- Category: SALT/Audio/Effect
- Output node: False

此节点用于对音频数据应用计划性音高偏移，允许随时间动态调整音高。通过引入音高变化的时间表和插值选项，它能够实现比静态音高偏移更复杂和微妙的音频效果。

# Input types
## Required
- audio
    - 将要应用音高偏移的音频数据。它是音高偏移处理的主要输入。
    - Comfy dtype: AUDIO
    - Python dtype: bytes
- schedule
    - 一个半音值列表，指定音频不同时间点的音高偏移量。它定义了音高偏移随时间变化的动态特性。
    - Comfy dtype: LIST
    - Python dtype: List[float]
## Optional
- interpolate
    - 一个布尔标志，指示是否在时间表中指定的点之间进行插值，以实现音高偏移的更平滑过渡。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- audio
    - 应用计划性音高偏移后的结果音频数据，反映了输入时间表指定的动态音高变化。
    - Comfy dtype: AUDIO
    - Python dtype: bytes


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaltAudioPitchShiftScheduled:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "audio": ("AUDIO", {}),
                "schedule": ("LIST", {"element_type": "FLOAT"}),
            },
            "optional": {
                "interpolate": ("BOOLEAN", {"default": False}),
            }
        }

    RETURN_TYPES = ("AUDIO",)
    RETURN_NAMES = ("audio",)
    FUNCTION = "shift_pitch_advanced"
    CATEGORY = "SALT/Audio/Effect"

    @staticmethod
    def shift_pitch_advanced(audio_bytes, schedule, interpolate=False):
        TEMP = tempfile.gettempdir()
        os.makedirs(TEMP, exist_ok=True)

        temp_input_path = tempfile.mktemp(suffix='.wav', dir=TEMP)
        temp_output_path = tempfile.mktemp(suffix='.wav', dir=TEMP)

        with open(temp_input_path, 'wb') as f:
            f.write(audio_bytes)

        audio = AudioSegment.from_file(temp_input_path)
        frame_rate = audio.frame_rate
        total_frames = len(audio.get_array_of_samples())

        # Schedule processing: interpolate or repeat to match audio length
        if interpolate:
            x = np.linspace(0, total_frames, num=len(schedule), endpoint=True)
            f = interp1d(x, schedule, kind='linear', fill_value="extrapolate")
            pitch_schedule = f(np.arange(total_frames))
        else:
            pitch_schedule = np.tile(schedule, int(np.ceil(total_frames / len(schedule))))[:total_frames]

        # Process audio in chunks and apply pitch shift
        processed_audio = AudioSegment.empty()
        chunk_duration_ms = 100  # Duration of each chunk in milliseconds
        for i in range(0, len(audio), chunk_duration_ms):
            chunk = audio[i:i+chunk_duration_ms]
            semitones = pitch_schedule[int(i / chunk_duration_ms * frame_rate)]
            processed_chunk = chunk._spawn(chunk.raw_data, overrides={
                "frame_rate": int(chunk.frame_rate * 2**(semitones/12.0))
            }).set_frame_rate(frame_rate)
            processed_audio += processed_chunk

        # Export processed audio
        processed_audio.export(temp_output_path, format="wav")

        with open(temp_output_path, 'rb') as f:
            pitch_shifted_audio = f.read()

        os.remove(temp_input_path)
        os.remove(temp_output_path)

        return (pitch_shifted_audio,)

```
